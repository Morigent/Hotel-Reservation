// db.js
// Tempat khusus untuk konfigurasi koneksi ke PostgreSQL.
// Kita pisahkan dari index.js biar rapi & gak hardcode password di banyak tempat.

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hotel-basis',
    password: process.env.DB_PASSWORD || 'password123',
    port: process.env.DB_PORT || 5432,
});

// Tes koneksi sekali waktu server start, biar ketahuan dari awal kalau salah setting
pool.connect()
    .then(client => {
        console.log('✅ Berhasil konek ke database PostgreSQL');
        client.release();
    })
    .catch(err => {
        console.error('❌ Gagal konek ke database:', err.message);
    });

module.exports = pool;
