const express = require('express');
const { Pool } = require('pg');
const app = express();

// Konfigurasi koneksi ke Database PostgreSQL
const db = new Pool({
    user: "postgres",       
    host: "localhost",
    database: "hotel-basis", 
    password: "password123",      
    port: 5432,
});

// Fungsi pembantu untuk membuat template halaman web agar rapi
const renderPage = (title, tableHeader, tableRows) => `
    <div style="font-family: sans-serif; padding: 20px; background-color: #f8f9fa; min-height: 100vh;">
        <a href="/" style="text-decoration: none; color: #3498db; font-weight: bold;">← Kembali ke Dashboard Admin</a>
        <h2 style="color: #2c3e50; margin-top: 20px;">📊 Data ${title}</h2>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 15px;">
            <table style="border-collapse: collapse; width: 100%; text-align: left;">
                <thead>
                    <tr style="background-color: #34495e; color: white;">
                        ${tableHeader}
                    </tr>
                </thead>
                <tbody>
                    ${tableRows.length > 0 ? tableRows : `<tr><td colspan="10" style="text-align:center; padding:20px; color:#999;">Tabel masih kosong. Isi datanya di pgAdmin dulu ya!</td></tr>`}
                </tbody>
            </table>
        </div>
    </div>
`;

// ==================== 0. DASHBOARD UTAMA ====================
app.get("/", (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; padding: 40px; background-color: #f4f6f9; min-height: 100vh; text-align: center;">
            <h1 style="color: #2c3e50; margin-bottom: 5px;">🏨 Dashboard Sistem Reservasi Hotel</h1>
            <p style="color: #7f8c8d; margin-bottom: 40px;">Selamat datang, Admin Rani! Pilih tabel di bawah untuk melihat data.</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto;">
                <a href="/hotels" style="padding: 20px; background: #3498db; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🏢 Hotel</a>
                <a href="/addresses" style="padding: 20px; background: #2ecc71; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">📍 Alamat</a>
                <a href="/rooms" style="padding: 20px; background: #e67e22; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🛏️ Kamar</a>
                <a href="/guests" style="padding: 20px; background: #9b59b6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">👨‍💼 Tamu (Guest)</a>
                <a href="/payments" style="padding: 20px; background: #1abc9c; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">💳 Pembayaran</a>
                <a href="/reservations" style="padding: 20px; background: #e74c3c; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">📅 Reservasi</a>
                <a href="/reviews" style="padding: 20px; background: #f1c40f; color: #2c3e50; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">⭐ Ulasan (Review)</a>
                <a href="/facilities" style="padding: 20px; background: #34495e; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🏊 Fasilitas</a>
                <a href="/staffs" style="padding: 20px; background: #7f8c8d; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">👔 Staf</a>
            </div>
        </div>
    `);
});

// ==================== 1. TABEL HOTEL ====================
app.get("/hotels", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM hotel");
        const header = `<th style="padding:12px;">ID Hotel</th><th style="padding:12px;">Nama Hotel</th><th style="padding:12px;">Klasifikasi</th><th style="padding:12px;">Deskripsi</th>`;
        const rows = result.rows.map(h => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${h.hotel_id}</td>
                <td style="padding:10px; font-weight:bold;">${h.hotel_name}</td>
                <td style="padding:10px;">${h.classification}</td>
                <td style="padding:10px;">${h.description || '-'}</td>
            </tr>
        `).join('');
        res.send(renderPage("Hotel", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 2. TABEL ALAMAT ====================
app.get("/addresses", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM address");
        const header = `<th style="padding:12px;">ID Alamat</th><th style="padding:12px;">Provinsi</th><th style="padding:12px;">Kota</th><th style="padding:12px;">Kode Pos</th><th style="padding:12px;">ID Hotel</th>`;
        const rows = result.rows.map(a => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${a.address_id}</td>
                <td style="padding:10px;">${a.province}</td>
                <td style="padding:10px;">${a.city}</td>
                <td style="padding:10px;">${a.postal_code}</td>
                <td style="padding:10px; color:#7f8c8d;">${a.hotel_hotel_id}</td>
            </tr>
        `).join('');
        res.send(renderPage("Alamat (Address)", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 3. TABEL KAMAR ====================
app.get("/rooms", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM room");
        const header = `<th style="padding:12px;">ID Kamar</th><th style="padding:12px;">No Kamar</th><th style="padding:12px;">Tipe</th><th style="padding:12px;">Harga/Malam</th><th style="padding:12px;">Status</th><th style="padding:12px;">ID Hotel</th>`;
        const rows = result.rows.map(r => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${r.room_id}</td>
                <td style="padding:10px;">${r.room_number}</td>
                <td style="padding:10px;">${r.room_type}</td>
                <td style="padding:10px; color:#e74c3c; font-weight:bold;">Rp ${Number(r.price_per_night).toLocaleString('id-ID')}</td>
                <td style="padding:10px;">${r.status === '1' ? '🟢 Tersedia' : '🔴 Penuh'}</td>
                <td style="padding:10px; color:#7f8c8d;">${r.hotel_hotel_id}</td>
            </tr>
        `).join('');
        res.send(renderPage("Kamar (Room)", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 4. TABEL GUEST ====================
app.get("/guests", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM guest");
        const header = `<th style="padding:12px;">ID Tamu</th><th style="padding:12px;">Nama</th><th style="padding:12px;">No HP</th><th style="padding:12px;">Email</th><th style="padding:12px;">Alamat Rumah</th>`;
        const rows = result.rows.map(g => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${g.guest_id}</td>
                <td style="padding:10px; font-weight:bold;">${g.name}</td>
                <td style="padding:10px;">${g.phone}</td>
                <td style="padding:10px;">${g.email}</td>
                <td style="padding:10px;">${g.address}</td>
            </tr>
        `).join('');
        res.send(renderPage("Tamu (Guest)", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 5. TABEL PAYMENT ====================
app.get("/payments", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM payment");
        const header = `<th style="padding:12px;">ID Bayar</th><th style="padding:12px;">Tanggal</th><th style="padding:12px;">Total Jumlah</th><th style="padding:12px;">Metode</th><th style="padding:12px;">Status</th>`;
        const rows = result.rows.map(p => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${p.payment_id}</td>
                <td style="padding:10px;">${new Date(p.payment_date).toLocaleDateString('id-ID')}</td>
                <td style="padding:10px; color:#2ecc71; font-weight:bold;">Rp ${Number(p.amount).toLocaleString('id-ID')}</td>
                <td style="padding:10px;">${p.payment_method}</td>
                <td style="padding:10px;">${p.payment_status === '1' ? '✅ Lunas' : '⏳ Pending'}</td>
            </tr>
        `).join('');
        res.send(renderPage("Pembayaran (Payment)", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 6. TABEL RESERVASI ====================
app.get("/reservations", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM reservation");
        const header = `<th style="padding:12px;">ID Booking</th><th style="padding:12px;">Check In</th><th style="padding:12px;">Check Out</th><th style="padding:12px;">Tgl Reservasi</th><th style="padding:12px;">Total Harga</th><th style="padding:12px;">ID Tamu</th><th style="padding:12px;">ID Kamar</th>`;
        const rows = result.rows.map(resv => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${resv.reservation_id}</td>
                <td style="padding:10px;">${new Date(resv.check_in_date).toLocaleDateString('id-ID')}</td>
                <td style="padding:10px;">${new Date(resv.check_out_date).toLocaleDateString('id-ID')}</td>
                <td style="padding:10px;">${new Date(resv.reservation_date).toLocaleDateString('id-ID')}</td>
                <td style="padding:10px; font-weight:bold;">Rp ${Number(resv.total_price).toLocaleString('id-ID')}</td>
                <td style="padding:10px;">${resv.guest_guest_id}</td>
                <td style="padding:10px;">${resv.room_room_id}</td>
            </tr>
        `).join('');
        res.send(renderPage("Reservasi", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 7. TABEL REVIEW ====================
app.get("/reviews", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM review");
        const header = `<th style="padding:12px;">ID Review</th><th style="padding:12px;">Rating</th><th style="padding:12px;">Komentar</th><th style="padding:12px;">Tanggal</th><th style="padding:12px;">ID Tamu</th>`;
        const rows = result.rows.map(rev => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${rev.review_id}</td>
                <td style="padding:10px; color:#f1c40f; font-weight:bold;">⭐ ${rev.rating}/5</td>
                <td style="padding:10px; font-style:italic;">"${rev.comment || '-'}"</td>
                <td style="padding:10px;">${new Date(rev.review_date).toLocaleDateString('id-ID')}</td>
                <td style="padding:10px;">${rev.guest_guest_id}</td>
            </tr>
        `).join('');
        res.send(renderPage("Ulasan (Review)", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 8. TABEL FASILITAS ====================
app.get("/facilities", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM facility");
        const header = `<th style="padding:12px;">ID Fasilitas</th><th style="padding:12px;">Nama Fasilitas</th><th style="padding:12px;">ID Hotel</th>`;
        const rows = result.rows.map(f => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${f.facility_id}</td>
                <td style="padding:10px; font-weight:bold;">${f.facility_name}</td>
                <td style="padding:10px; color:#7f8c8d;">${f.hotel_hotel_id}</td>
            </tr>
        `).join('');
        res.send(renderPage("Fasilitas (Facility)", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// ==================== 9. TABEL STAFF ====================
app.get("/staffs", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM staff");
        const header = `<th style="padding:12px;">ID Staf</th><th style="padding:12px;">Nama Karyawan</th><th style="padding:12px;">Jabatan</th><th style="padding:12px;">No HP</th><th style="padding:12px;">Email</th><th style="padding:12px;">ID Hotel</th>`;
        const rows = result.rows.map(s => `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding:10px;">${s.staff_id}</td>
                <td style="padding:10px; font-weight:bold;">${s.name}</td>
                <td style="padding:10px; color:#2980b9;">${s.position}</td>
                <td style="padding:10px;">${s.phone}</td>
                <td style="padding:10px;">${s.email}</td>
                <td style="padding:10px; color:#7f8c8d;">${s.hotel_hotel_id}</td>
            </tr>
        `).join('');
        res.send(renderPage("Staf Karyawan (Staff)", header, rows));
    } catch (err) { res.status(500).send(err.message); }
});

// Jalankan server
app.listen(5000, () => {
    console.log("Server Dashboard Admin berjalan lancar di http://localhost:5000");
});