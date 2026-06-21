// validators/rules.js
//
// Kumpulan aturan validasi pakai express-validator, satu per tabel.
// Tiap aturan dipasang sebagai middleware sebelum data masuk ke database.
//
// catatan:
// - .optional() dipakai supaya PUT (update sebagian field) tetap boleh
//   gak ngirim semua kolom, tapi KALAU field itu dikirim, tetap divalidasi.
// - Untuk POST (create), field wajib pakai .notEmpty() / .exists() biasa.

const { body } = require('express-validator');

// ---------- HOTEL ----------
const hotelRules = [
    body('hotel_id').notEmpty().withMessage('hotel_id wajib diisi')
        .isLength({ max: 10 }).withMessage('hotel_id maksimal 10 karakter'),
    body('hotel_name').notEmpty().withMessage('hotel_name wajib diisi')
        .isLength({ max: 50 }).withMessage('hotel_name maksimal 50 karakter'),
    body('classification').notEmpty().withMessage('classification wajib diisi (contoh: 5-Star)'),
    body('description').optional().isLength({ max: 100 }).withMessage('description maksimal 100 karakter'),
];

// ---------- ADDRESS ----------
const addressRules = [
    body('address_id').notEmpty().withMessage('address_id wajib diisi'),
    body('province').notEmpty().withMessage('province wajib diisi'),
    body('city').notEmpty().withMessage('city wajib diisi'),
    body('postal_code').notEmpty().withMessage('postal_code wajib diisi')
        .isPostalCode('any').withMessage('postal_code tidak valid'),
    body('hotel_hotel_id').notEmpty().withMessage('hotel_hotel_id wajib diisi (id hotel terkait)'),
];

// ---------- ROOM ----------
const roomRules = [
    body('room_id').notEmpty().withMessage('room_id wajib diisi'),
    body('room_number').notEmpty().withMessage('room_number wajib diisi')
        .isInt({ min: 1 }).withMessage('room_number harus angka positif'),
    body('room_type').notEmpty().withMessage('room_type wajib diisi (contoh: Standard/Deluxe/Suite)'),
    body('price_per_night').notEmpty().withMessage('price_per_night wajib diisi')
        .isInt({ min: 0 }).withMessage('price_per_night harus angka, tidak boleh negatif'),
    body('status').notEmpty().withMessage('status wajib diisi')
        .isIn(['0', '1']).withMessage("status harus '0' (penuh) atau '1' (tersedia)"),
    body('description').optional().isLength({ max: 100 }),
    body('hotel_hotel_id').notEmpty().withMessage('hotel_hotel_id wajib diisi'),
];

// ---------- GUEST ----------
const guestRules = [
    body('guest_id').notEmpty().withMessage('guest_id wajib diisi'),
    body('name').notEmpty().withMessage('name wajib diisi')
        .isLength({ max: 30 }).withMessage('name maksimal 30 karakter'),
    body('phone').notEmpty().withMessage('phone wajib diisi')
        .isMobilePhone('id-ID').withMessage('format nomor HP tidak valid'),
    body('email').notEmpty().withMessage('email wajib diisi')
        .isEmail().withMessage('format email tidak valid'),
    body('address').notEmpty().withMessage('address wajib diisi'),
];

// ---------- PAYMENT ----------
const paymentRules = [
    body('payment_id').notEmpty().withMessage('payment_id wajib diisi'),
    body('payment_date').notEmpty().withMessage('payment_date wajib diisi')
        .isISO8601().withMessage('payment_date harus format tanggal valid (YYYY-MM-DD)'),
    body('amount').notEmpty().withMessage('amount wajib diisi')
        .isInt({ min: 0 }).withMessage('amount harus angka, tidak boleh negatif'),
    body('payment_method').notEmpty().withMessage('payment_method wajib diisi'),
    body('payment_status').notEmpty().withMessage('payment_status wajib diisi')
        .isIn(['0', '1']).withMessage("payment_status harus '0' (pending) atau '1' (lunas)"),
];

// ---------- REVIEW ----------
const reviewRules = [
    body('review_id').notEmpty().withMessage('review_id wajib diisi'),
    body('rating').notEmpty().withMessage('rating wajib diisi')
        .isInt({ min: 1, max: 5 }).withMessage('rating harus angka 1 sampai 5'),
    body('comment').optional().isLength({ max: 200 }).withMessage('comment maksimal 200 karakter'),
    body('review_date').notEmpty().withMessage('review_date wajib diisi')
        .isISO8601().withMessage('review_date harus format tanggal valid (YYYY-MM-DD)'),
    body('guest_guest_id').notEmpty().withMessage('guest_guest_id wajib diisi'),
];

// ---------- FACILITY ----------
const facilityRules = [
    body('facility_id').notEmpty().withMessage('facility_id wajib diisi'),
    body('facility_name').notEmpty().withMessage('facility_name wajib diisi')
        .isLength({ max: 30 }).withMessage('facility_name maksimal 30 karakter'),
    body('hotel_hotel_id').notEmpty().withMessage('hotel_hotel_id wajib diisi'),
];

// ---------- STAFF ----------
const staffRules = [
    body('staff_id').notEmpty().withMessage('staff_id wajib diisi'),
    body('name').notEmpty().withMessage('name wajib diisi'),
    body('position').notEmpty().withMessage('position wajib diisi'),
    body('phone').notEmpty().withMessage('phone wajib diisi')
        .isMobilePhone('id-ID').withMessage('format nomor HP tidak valid'),
    body('email').notEmpty().withMessage('email wajib diisi')
        .isEmail().withMessage('format email tidak valid'),
    body('hotel_hotel_id').notEmpty().withMessage('hotel_hotel_id wajib diisi'),
];

// ---------- RESERVATION ----------
const reservationRules = [
    body('reservation_id').notEmpty().withMessage('reservation_id wajib diisi'),
    body('check_in_date').notEmpty().withMessage('check_in_date wajib diisi')
        .isISO8601().withMessage('check_in_date harus format tanggal valid (YYYY-MM-DD)'),
    body('check_out_date').notEmpty().withMessage('check_out_date wajib diisi')
        .isISO8601().withMessage('check_out_date harus format tanggal valid (YYYY-MM-DD)')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.check_in_date)) {
                throw new Error('check_out_date harus setelah check_in_date');
            }
            return true;
        }),
    body('reservation_date').notEmpty().withMessage('reservation_date wajib diisi')
        .isISO8601().withMessage('reservation_date harus format tanggal valid (YYYY-MM-DD)'),
    body('total_price').notEmpty().withMessage('total_price wajib diisi')
        .isInt({ min: 0 }).withMessage('total_price harus angka, tidak boleh negatif'),
    body('guest_guest_id').notEmpty().withMessage('guest_guest_id wajib diisi'),
    body('room_room_id').notEmpty().withMessage('room_room_id wajib diisi'),
    body('payment_payment_id').notEmpty().withMessage('payment_payment_id wajib diisi'),
];

// Untuk PUT (update), kita bikin versi "optional" otomatis dari rules di atas,
// supaya request boleh cuma ngirim sebagian field, tapi field yg dikirim tetap divalidasi.
function makeOptional(rules) {
    return rules.map(rule => rule.optional());
}

module.exports = {
    hotelRules,
    addressRules,
    roomRules,
    guestRules,
    paymentRules,
    reviewRules,
    facilityRules,
    staffRules,
    reservationRules,
    makeOptional,
};
