
const pg = require('pg');

let pool;

console.log('Is POSTGRES_URL_NO_SSL defined?', !!process.env.POSTGRES_URL_NO_SSL);

if (process.env.POSTGRES_URL_NO_SSL) {
    console.log('postgres URL', process.env.POSTGRES_URL_NO_SSL);

    pool = new pg.Pool({
        connectionString: process.env.POSTGRES_URL_NO_SSL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'spartan_strength',
    });
}

module.exports = pool;