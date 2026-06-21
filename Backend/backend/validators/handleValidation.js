// validators/handleValidation.js
//
// Middleware ini dipasang SETELAH aturan validasi (misal body('email').isEmail()).
// Tugasnya: cek apakah ada error dari aturan-aturan itu. Kalau ada,
// langsung stop & balas request dengan pesan error yang jelas (400 Bad Request).
// Kalau gak ada error, lanjut ke route handler (controller) yang sebenarnya.

const { validationResult } = require('express-validator');

function handleValidation(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validasi gagal',
            details: errors.array().map(e => ({
                field: e.path,
                message: e.msg
            }))
        });
    }

    next();
}

module.exports = handleValidation;
