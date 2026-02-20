import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pg from 'pg';

dotenv.config();

const {Pool} = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function createAdmin(params) {
    try {
        const email = 'cschandrahr@gmail.com';
        const password = 'Chandra@#2100';
        const name = 'Chandra';

        console.log('🔐 Hashing password...');
        const hash = await bcrypt.hash(password, 12);

        console.log('💾 Creating admin in database...');
        await pool.query(
            'INSERT INTO admins (email, password_hash, name) VALUES ($1, $2, $3)',
            [email, hash, name]
        );

        console.log('\n Admin created successfully!\n');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Login at: http://localhost:3000/admin/login');
        console.log('\n save these credentials!\n');

        process.exit(0);
     
        
    } catch (err) {
        console.error('❌ Error:', err.message);
        if(err.code === '23505') {
            console.error('💡 Admin with this email already exists!');
        }

        process.exit(1);
        
    }
    
}

createAdmin();
