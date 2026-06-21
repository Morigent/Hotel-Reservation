// utils/crudFactory.js
//
// Ini "pabrik" route CRUD generik. Daripada nulis ulang GET/POST/PUT/DELETE
// untuk 9 tabel satu-satu (capek & rawan typo), kita bikin fungsi yang
// otomatis generate ke-4 route itu, tinggal kasih tahu:
//   - nama tabel di database
//   - nama kolom primary key-nya
//
// Tetap pakai parameterized query ($1, $2, dst) supaya AMAN dari SQL Injection.

const express = require('express');
const pool = require('../db');
const handleValidation = require('../validators/handleValidation');

// createRules / updateRules = array aturan express-validator (boleh dikosongkan [])
function createCrudRouter(tableName, primaryKey, createRules = [], updateRules = []) {
    const router = express.Router();

    // GET semua data
    router.get('/', async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY ${primaryKey} ASC`);
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET satu data by id
    router.get('/:id', async (req, res) => {
        try {
            const result = await pool.query(
                `SELECT * FROM ${tableName} WHERE ${primaryKey} = $1`,
                [req.params.id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: `${tableName} dengan id tersebut tidak ditemukan` });
            }
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // POST tambah data baru
    // Body request harus berupa object JSON, contoh: { "hotel_id": "HTL004", "hotel_name": "..." }
    router.post('/', createRules, handleValidation, async (req, res) => {
        try {
            const data = req.body;
            const columns = Object.keys(data);
            const values = Object.values(data);

            if (columns.length === 0) {
                return res.status(400).json({ error: 'Body request kosong, gak ada data yang dikirim' });
            }

            const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
            const columnNames = columns.join(', ');

            const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders}) RETURNING *`;
            const result = await pool.query(query, values);

            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // PUT update data by id
    router.put('/:id', updateRules, handleValidation, async (req, res) => {
        try {
            const data = req.body;
            const columns = Object.keys(data);
            const values = Object.values(data);

            if (columns.length === 0) {
                return res.status(400).json({ error: 'Body request kosong, gak ada data yang diupdate' });
            }

            const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');
            const query = `UPDATE ${tableName} SET ${setClause} WHERE ${primaryKey} = $${columns.length + 1} RETURNING *`;

            const result = await pool.query(query, [...values, req.params.id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: `${tableName} dengan id tersebut tidak ditemukan` });
            }
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // DELETE data by id
    router.delete('/:id', async (req, res) => {
        try {
            const result = await pool.query(
                `DELETE FROM ${tableName} WHERE ${primaryKey} = $1 RETURNING *`,
                [req.params.id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: `${tableName} dengan id tersebut tidak ditemukan` });
            }
            res.json({ message: 'Berhasil dihapus', deleted: result.rows[0] });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = createCrudRouter;
