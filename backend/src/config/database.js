import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'healthcare_appointments',
    password: 'skinnyfella',
    port: 5432,
});

// Test the connection
pool.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Successfully connected to PostgreSQL');
    }
});

export default pool;