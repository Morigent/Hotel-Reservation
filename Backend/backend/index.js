// index.js
// Entry point backend. Sekarang server ini berfungsi sebagai REST API
// (mengembalikan data JSON), bukan lagi HTML mentah. Frontend React
// nantinya tinggal fetch() ke endpoint-endpoint di bawah ini.

const express = require('express');
const cors = require('cors');

const simpleRoutes = require('./routes/simpleRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

app.use(cors());           // biar frontend (beda port) boleh akses API ini
app.use(express.json());   // biar bisa baca body JSON dari req.body

// ==================== ROUTES ====================
app.use('/api/hotels', simpleRoutes.hotel);
app.use('/api/addresses', simpleRoutes.address);
app.use('/api/rooms', simpleRoutes.room);
app.use('/api/guests', simpleRoutes.guest);
app.use('/api/payments', simpleRoutes.payment);
app.use('/api/reviews', simpleRoutes.review);
app.use('/api/facilities', simpleRoutes.facility);
app.use('/api/staffs', simpleRoutes.staff);
app.use('/api/reservations', reservationRoutes);

// Halaman cek server hidup atau gak
app.get('/', (req, res) => {
    res.json({
        message: '🏨 Hotel Reservation API aktif!',
        endpoints: [
            'GET/POST            /api/hotels',
            'GET/PUT/DELETE      /api/hotels/:id',
            'GET/POST            /api/addresses',
            'GET/PUT/DELETE      /api/addresses/:id',
            'GET/POST            /api/rooms',
            'GET/PUT/DELETE      /api/rooms/:id',
            'GET/POST            /api/guests',
            'GET/PUT/DELETE      /api/guests/:id',
            'GET/POST            /api/payments',
            'GET/PUT/DELETE      /api/payments/:id',
            'GET/POST            /api/reservations  (otomatis update status kamar)',
            'GET/PUT/DELETE      /api/reservations/:id',
            'GET/POST            /api/reviews',
            'GET/PUT/DELETE      /api/reviews/:id',
            'GET/POST            /api/facilities',
            'GET/PUT/DELETE      /api/facilities/:id',
            'GET/POST            /api/staffs',
            'GET/PUT/DELETE      /api/staffs/:id',
        ]
    });
});

// Handler kalau route gak ketemu
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server backend jalan di http://localhost:${PORT}`);
});
