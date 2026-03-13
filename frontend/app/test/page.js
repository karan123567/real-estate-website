'use client';
import { useEffect, useState } from 'react';
import { propertyAPI } from '@/lib/api';

export default function TestPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    propertyAPI.getAll()
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="p-8 text-red-600">❌ Error: {error}</div>;
  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Connection Works!
      </h1>
      <p>Found {data.properties.length} properties</p>
      <pre className="mt-4 p-4 bg-gray-600 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}