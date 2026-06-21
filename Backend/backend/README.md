# Backend - Hotel Reservation System

## Struktur folder
```
backend/
├── index.js                  # entry point, daftar semua route
├── db.js                     # koneksi ke PostgreSQL
├── .env.example               # contoh konfigurasi (copy jadi .env)
├── routes/
│   ├── simpleRoutes.js        # route CRUD utk hotel, address, room, guest, payment, review, facility, staff
│   └── reservationRoutes.js   # route khusus reservasi (ada logika cek/update status kamar)
└── utils/
    └── crudFactory.js         # generator CRUD generik (GET, POST, PUT, DELETE)
```

## Cara jalankan

1. **Install dependency**
   ```
   npm install
   ```

2. **Setup database**
   - Pastikan PostgreSQL sudah jalan di komputer kamu.
   - Buat database bernama `hotel-basis`.
   - Import skema + data dari `basisdata.sql` (yang sudah kamu punya), contoh lewat psql:
     ```
     psql -U postgres -d hotel-basis -f basisdata.sql
     ```
     atau lewat pgAdmin: klik kanan database -> Query Tool -> paste isi basisdata.sql -> Run.

3. **Setup file .env**
   - Copy `.env.example` jadi `.env`
   - Sesuaikan `DB_USER`, `DB_PASSWORD`, dll dengan setting PostgreSQL kamu sendiri.

4. **Jalankan server**
   ```
   npm start
   ```
   Kalau berhasil, akan muncul:
   ```
   ✅ Berhasil konek ke database PostgreSQL
   🚀 Server backend jalan di http://localhost:5000
   ```

## Cara test API

Buka browser atau pakai Postman/Thunder Client:

- `GET  http://localhost:5000/api/hotels` → lihat semua hotel
- `GET  http://localhost:5000/api/rooms/RM001` → lihat 1 kamar
- `POST http://localhost:5000/api/guests` dengan body JSON:
  ```json
  {
    "guest_id": "GST006",
    "name": "Andi Wijaya",
    "phone": "081200000000",
    "email": "andi@email.com",
    "address": "Jl. Sudirman No.1, Jakarta"
  }
  ```
- `PUT http://localhost:5000/api/rooms/RM001` dengan body JSON: `{ "price_per_night": 500000 }`
- `DELETE http://localhost:5000/api/reviews/REV001`

### Endpoint khusus: Reservasi
`POST /api/reservations` otomatis:
1. Cek apakah kamar (`room_room_id`) masih tersedia (`status = '1'`)
2. Kalau penuh → ditolak (response 400)
3. Kalau berhasil → status kamar otomatis diubah jadi penuh (`status = '0'`)

`DELETE /api/reservations/:id` otomatis mengembalikan status kamar jadi tersedia lagi.

## Langkah selanjutnya (kalau mau lanjut lebih jauh)
- Tambah autentikasi login (JWT) supaya endpoint admin tidak bisa diakses sembarangan.
- Validasi input lebih ketat (misal pakai library seperti `zod` atau `joi`).
- Hubungkan folder `frontend/` ke API ini (saat ini frontend masih pakai data palsu di localStorage).
