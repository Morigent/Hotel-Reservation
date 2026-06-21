// routes/reservationRoutes.js
//
// Reservasi beda dari tabel lain: dia menyentuh tabel `room` juga.
// Aturan bisnis sederhana yang kita pasang di sini:
//   1. Saat bikin reservasi baru -> cek dulu kamarnya 'status' = '1' (tersedia).
//      Kalau sudah '0' (penuh), tolak booking-nya.
//   2. Kalau berhasil booking -> ubah status kamar itu jadi '0' (penuh).
//   3. Saat reservasi dihapus/dibatalkan -> kembalikan status kamar jadi '1' (tersedia).
//
// Kita pakai TRANSACTION (BEGIN...COMMIT/ROLLBACK) supaya prosesnya aman:
// kalau salah satu langkah gagal, semua dibatalkan, gak ada data nanggung.

const express = require('express');
const pool = require('../db');
const router = express.Router();
const handleValidation = require('../validators/handleValidation');
const { reservationRules, makeOptional } = require('../validators/rules');

// GET semua reservasi (sekalian join biar infonya lebih lengkap & enak dibaca)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, g.name AS guest_name, rm.room_number, rm.room_type
            FROM reservation r
            JOIN guest g ON r.guest_guest_id = g.guest_id
            JOIN room rm ON r.room_room_id = rm.room_id
            ORDER BY r.reservation_id ASC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET satu reservasi by id
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reservation WHERE reservation_id = $1',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Reservasi tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST bikin reservasi baru
// Body contoh:
// {
//   "reservation_id": "RSV006",
//   "check_in_date": "2025-06-01",
//   "check_out_date": "2025-06-03",
//   "reservation_date": "2025-05-20",
//   "total_price": 900000,
//   "guest_guest_id": "GST001",
//   "room_room_id": "RM002",
//   "payment_payment_id": "PAY006"
// }
router.post('/', reservationRules, handleValidation, async (req, res) => {
    const {
        reservation_id, check_in_date, check_out_date,
        reservation_date, total_price,
        guest_guest_id, room_room_id, payment_payment_id
    } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Cek status kamar dulu
        const roomCheck = await client.query(
            'SELECT status FROM room WHERE room_id = $1',
            [room_room_id]
        );

        if (roomCheck.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Kamar tidak ditemukan' });
        }
        if (roomCheck.rows[0].status !== '1') {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Kamar sedang tidak tersedia (penuh)' });
        }

        // 2. Insert reservasi
        const insertResult = await client.query(
            `INSERT INTO reservation
                (reservation_id, check_in_date, check_out_date, reservation_date, total_price, guest_guest_id, room_room_id, payment_payment_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [reservation_id, check_in_date, check_out_date, reservation_date, total_price, guest_guest_id, room_room_id, payment_payment_id]
        );

        // 3. Update status kamar jadi penuh ('0')
        await client.query(
            "UPDATE room SET status = '0' WHERE room_id = $1",
            [room_room_id]
        );

        await client.query('COMMIT');
        res.status(201).json(insertResult.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

// PUT update reservasi (tanpa ubah-ubah status kamar, cuma update data reservasinya)
router.put('/:id', makeOptional(reservationRules), handleValidation, async (req, res) => {
    try {
        const data = req.body;
        const columns = Object.keys(data);
        const values = Object.values(data);

        if (columns.length === 0) {
            return res.status(400).json({ error: 'Body request kosong' });
        }

        const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');
        const query = `UPDATE reservation SET ${setClause} WHERE reservation_id = $${columns.length + 1} RETURNING *`;

        const result = await pool.query(query, [...values, req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Reservasi tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE batalkan reservasi -> kamar otomatis jadi tersedia lagi
router.delete('/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const deleted = await client.query(
            'DELETE FROM reservation WHERE reservation_id = $1 RETURNING *',
            [req.params.id]
        );

        if (deleted.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Reservasi tidak ditemukan' });
        }

        // Kembalikan status kamar jadi tersedia ('1')
        await client.query(
            "UPDATE room SET status = '1' WHERE room_id = $1",
            [deleted.rows[0].room_room_id]
        );

        await client.query('COMMIT');
        res.json({ message: 'Reservasi dibatalkan, kamar tersedia lagi', deleted: deleted.rows[0] });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

module.exports = router;
