import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  statement_timeout: 30000,
  query_timeout: 30000,
});

// Log successful connections
pool.on('connect', () => {
  console.log('Database client connected');
});

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected database error:', err.message);
});

/**
 * Execute a SQL query
 * @param {string} text
 * @param {Array} params
 * @returns {Promise} Query Result
 */
const query = async (text, params) => {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV === 'development' && duration > 1000) {
      console.warn(`Slow query (${duration}ms): ${text.substring(0, 100)}...`);
    }
    return result;
  } catch (err) {
    console.error('Query Error:', err.message);
    console.error('Query:', text);
    console.error('Params:', params);
    throw err;
  }
};

/**
 * Get a client from the pool for transactions
 * @returns {Promise<PoolClient>}
 */
const getClient = async () => {
  try {
    const client = await pool.connect();
    const query = client.query.bind(client);
    const release = client.release.bind(client);

    let released = false;
    client.release = () => {
      if (!released) {
        released = true;
        release();
      }
    };

    return client;
  } catch (err) {
    console.error('Failed to get client from pool:', err.message);
    throw err;
  }
};

/**
 * Execute a transaction
 * @param {Function} callback
 * @returns {Promise}
 */
const transaction = async (callback) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Transaction failed, rolled back:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

// Graceful shutdown function (exported for server.js to call)
export const closePool = async () => {
  console.log('Closing database pool...');
  try {
    await pool.end();
    console.log('Database pool closed');
  } catch (err) {
    console.error('Error closing pool:', err.message);
    throw err;
  }
};

export { query, getClient, transaction, pool };
export default { query, getClient, transaction, pool, closePool };