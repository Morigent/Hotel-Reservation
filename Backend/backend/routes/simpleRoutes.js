// routes/simpleRoutes.js
//
// Tabel-tabel ini gak butuh logika khusus, jadi cukup pakai CRUD generik
// dari crudFactory. Tinggal kasih nama tabel, primary key, dan aturan
// validasinya (untuk create & update).

const createCrudRouter = require('../utils/crudFactory');
const {
    hotelRules, addressRules, roomRules, guestRules,
    paymentRules, reviewRules, facilityRules, staffRules,
    makeOptional,
} = require('../validators/rules');

module.exports = {
    hotel: createCrudRouter('hotel', 'hotel_id', hotelRules, makeOptional(hotelRules)),
    address: createCrudRouter('address', 'address_id', addressRules, makeOptional(addressRules)),
    room: createCrudRouter('room', 'room_id', roomRules, makeOptional(roomRules)),
    guest: createCrudRouter('guest', 'guest_id', guestRules, makeOptional(guestRules)),
    payment: createCrudRouter('payment', 'payment_id', paymentRules, makeOptional(paymentRules)),
    review: createCrudRouter('review', 'review_id', reviewRules, makeOptional(reviewRules)),
    facility: createCrudRouter('facility', 'facility_id', facilityRules, makeOptional(facilityRules)),
    staff: createCrudRouter('staff', 'staff_id', staffRules, makeOptional(staffRules)),
};
