-- ============================================================
--  Stitch Grand Stay Hotel Manager
--  Database DDL — PostgreSQL
--  Database : hotel-basis
-- ============================================================

-- ── Drop tables in safe reverse-dependency order ─────────────
DROP TABLE IF EXISTS staff        CASCADE;
DROP TABLE IF EXISTS facility     CASCADE;
DROP TABLE IF EXISTS review       CASCADE;
DROP TABLE IF EXISTS reservation  CASCADE;
DROP TABLE IF EXISTS payment      CASCADE;
DROP TABLE IF EXISTS guest        CASCADE;
DROP TABLE IF EXISTS room         CASCADE;
DROP TABLE IF EXISTS address      CASCADE;
DROP TABLE IF EXISTS hotel        CASCADE;

-- ============================================================
--  1. HOTEL
-- ============================================================
CREATE TABLE hotel (
    hotel_id       VARCHAR(10)  PRIMARY KEY,
    hotel_name     VARCHAR(50)  NOT NULL,
    classification VARCHAR(10)  NOT NULL,       -- e.g. '5-Star', '3-Star'
    description    VARCHAR(100)
);

-- ============================================================
--  2. ADDRESS  (1 hotel → 1 address)
-- ============================================================
CREATE TABLE address (
    address_id     VARCHAR(10)  PRIMARY KEY,
    province       VARCHAR(20)  NOT NULL,
    city           VARCHAR(20)  NOT NULL,
    postal_code    VARCHAR(10)  NOT NULL,
    hotel_hotel_id VARCHAR(10)  NOT NULL,

    CONSTRAINT address_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel (hotel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================================
--  3. ROOM
-- ============================================================
CREATE TABLE room (
    room_id        VARCHAR(10)  PRIMARY KEY,
    room_number    INTEGER      NOT NULL,
    room_type      VARCHAR(20)  NOT NULL,        -- e.g. 'Standard', 'Deluxe', 'Suite'
    price_per_night BIGINT      NOT NULL,
    status         CHAR(1)      NOT NULL         -- '1' = Available, '0' = Occupied
                   CHECK (status IN ('0', '1')),
    description    VARCHAR(100),
    hotel_hotel_id VARCHAR(10)  NOT NULL,

    CONSTRAINT room_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel (hotel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================================
--  4. GUEST
-- ============================================================
CREATE TABLE guest (
    guest_id VARCHAR(10)  PRIMARY KEY,
    name     VARCHAR(30)  NOT NULL,
    phone    VARCHAR(20)  NOT NULL,              -- stored as VARCHAR to preserve leading zeros
    email    VARCHAR(50)  NOT NULL UNIQUE,
    address  VARCHAR(100) NOT NULL
);

-- ============================================================
--  5. PAYMENT
-- ============================================================
CREATE TABLE payment (
    payment_id     VARCHAR(10)  PRIMARY KEY,
    payment_date   DATE         NOT NULL,
    amount         BIGINT       NOT NULL,
    payment_method VARCHAR(50)  NOT NULL,        -- e.g. 'Transfer Bank', 'Kartu Kredit', 'Cash'
    payment_status CHAR(1)      NOT NULL         -- '1' = Lunas, '0' = Pending
                   CHECK (payment_status IN ('0', '1'))
);

-- ============================================================
--  6. RESERVATION
-- ============================================================
CREATE TABLE reservation (
    reservation_id     VARCHAR(10) PRIMARY KEY,
    check_in_date      DATE        NOT NULL,
    check_out_date     DATE        NOT NULL,
    reservation_date   DATE        NOT NULL,
    total_price        BIGINT      NOT NULL,
    guest_guest_id     VARCHAR(10) NOT NULL,
    room_room_id       VARCHAR(10) NOT NULL,
    payment_payment_id VARCHAR(10) NOT NULL,

    CONSTRAINT reservation_checkin_checkout_chk
        CHECK (check_out_date > check_in_date),

    CONSTRAINT reservation_guest_fk
        FOREIGN KEY (guest_guest_id)
        REFERENCES guest (guest_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT reservation_room_fk
        FOREIGN KEY (room_room_id)
        REFERENCES room (room_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT reservation_payment_fk
        FOREIGN KEY (payment_payment_id)
        REFERENCES payment (payment_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================================
--  7. REVIEW
-- ============================================================
CREATE TABLE review (
    review_id      VARCHAR(10)  PRIMARY KEY,
    rating         SMALLINT     NOT NULL
                   CHECK (rating BETWEEN 1 AND 5),
    comment        VARCHAR(200),
    review_date    DATE         NOT NULL,
    guest_guest_id VARCHAR(10)  NOT NULL,

    CONSTRAINT review_guest_fk
        FOREIGN KEY (guest_guest_id)
        REFERENCES guest (guest_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================================
--  8. FACILITY
-- ============================================================
CREATE TABLE facility (
    facility_id    VARCHAR(10)  PRIMARY KEY,
    facility_name  VARCHAR(30)  NOT NULL,
    hotel_hotel_id VARCHAR(10)  NOT NULL,

    CONSTRAINT facility_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel (hotel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================================
--  9. STAFF
-- ============================================================
CREATE TABLE staff (
    staff_id       VARCHAR(10)  PRIMARY KEY,
    name           VARCHAR(30)  NOT NULL,
    position       VARCHAR(30)  NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    email          VARCHAR(50)  NOT NULL UNIQUE,
    hotel_hotel_id VARCHAR(10)  NOT NULL,

    CONSTRAINT staff_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel (hotel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================================
--  SEED DATA — Sample rows for testing / demo
-- ============================================================

-- Hotels
INSERT INTO hotel (hotel_id, hotel_name, classification, description) VALUES
    ('HTL001', 'Stitch Grand Stay Bali',    '5-Star', 'Hotel mewah tepi pantai di Bali'),
    ('HTL002', 'Stitch Grand Stay Jakarta', '4-Star', 'Hotel bisnis premium di pusat Jakarta'),
    ('HTL003', 'Stitch Grand Stay Yogya',   '3-Star', 'Hotel nyaman dekat kawasan wisata Yogyakarta');

-- Addresses
INSERT INTO address (address_id, province, city, postal_code, hotel_hotel_id) VALUES
    ('ADR001', 'Bali',                   'Badung',    '80361', 'HTL001'),
    ('ADR002', 'DKI Jakarta',            'Jakarta',   '10270', 'HTL002'),
    ('ADR003', 'Daerah Istimewa Yogyakarta', 'Yogyakarta', '55224', 'HTL003');

-- Rooms
INSERT INTO room (room_id, room_number, room_type, price_per_night, status, description, hotel_hotel_id) VALUES
    ('RM001', 101, 'Standard',  450000, '1', 'Kamar standar dengan AC dan TV',          'HTL001'),
    ('RM002', 102, 'Deluxe',    750000, '1', 'Kamar deluxe pemandangan kolam renang',   'HTL001'),
    ('RM003', 201, 'Suite',    1500000, '0', 'Suite mewah dengan balkon laut',           'HTL001'),
    ('RM004', 101, 'Standard',  500000, '1', 'Kamar standar area bisnis',               'HTL002'),
    ('RM005', 201, 'Deluxe',    900000, '1', 'Kamar deluxe pemandangan kota',           'HTL002'),
    ('RM006', 101, 'Standard',  350000, '1', 'Kamar standar dekat malioboro',           'HTL003');

-- Guests
INSERT INTO guest (guest_id, name, phone, email, address) VALUES
    ('GST001', 'Rani Kusuma',    '081234567890', 'rani.kusuma@email.com',   'Jl. Melati No. 5, Bandung'),
    ('GST002', 'Budi Santoso',   '082345678901', 'budi.santoso@email.com',  'Jl. Anggrek No. 12, Surabaya'),
    ('GST003', 'Siti Aminah',    '083456789012', 'siti.aminah@email.com',   'Jl. Mawar No. 7, Semarang'),
    ('GST004', 'Dimas Pratama',  '084567890123', 'dimas.pratama@email.com', 'Jl. Kenanga No. 3, Medan'),
    ('GST005', 'Laras Wulandari','085678901234', 'laras.wulan@email.com',   'Jl. Dahlia No. 9, Makassar');

-- Payments
INSERT INTO payment (payment_id, payment_date, amount, payment_method, payment_status) VALUES
    ('PAY001', '2025-01-10', 1350000,  'Transfer Bank',  '1'),
    ('PAY002', '2025-02-14', 1500000,  'Kartu Kredit',   '1'),
    ('PAY003', '2025-03-05',  900000,  'Transfer Bank',  '1'),
    ('PAY004', '2025-04-20', 2250000,  'Cash',           '0'),
    ('PAY005', '2025-05-08',  700000,  'GoPay',          '1');

-- Reservations
INSERT INTO reservation (reservation_id, check_in_date, check_out_date, reservation_date, total_price, guest_guest_id, room_room_id, payment_payment_id) VALUES
    ('RSV001', '2025-01-12', '2025-01-15', '2025-01-10', 1350000,  'GST001', 'RM001', 'PAY001'),
    ('RSV002', '2025-02-15', '2025-02-17', '2025-02-14', 1500000,  'GST002', 'RM003', 'PAY002'),
    ('RSV003', '2025-03-07', '2025-03-09', '2025-03-05',  900000,  'GST003', 'RM004', 'PAY003'),
    ('RSV004', '2025-04-22', '2025-04-24', '2025-04-20', 2250000,  'GST004', 'RM005', 'PAY004'),
    ('RSV005', '2025-05-10', '2025-05-12', '2025-05-08',  700000,  'GST005', 'RM006', 'PAY005');

-- Reviews
INSERT INTO review (review_id, rating, comment, review_date, guest_guest_id) VALUES
    ('REV001', 5, 'Pelayanan sangat memuaskan, kamar bersih dan nyaman!', '2025-01-16', 'GST001'),
    ('REV002', 4, 'Suasana bagus tapi sarapan kurang variatif.',           '2025-02-18', 'GST002'),
    ('REV003', 5, 'Lokasi strategis, staf ramah dan profesional.',         '2025-03-10', 'GST003'),
    ('REV004', 3, 'Kamar cukup nyaman, namun WiFi kurang stabil.',         '2025-04-25', 'GST004'),
    ('REV005', 5, 'Harga terjangkau dengan fasilitas yang lengkap!',       '2025-05-13', 'GST005');

-- Facilities
INSERT INTO facility (facility_id, facility_name, hotel_hotel_id) VALUES
    ('FAC001', 'Kolam Renang',    'HTL001'),
    ('FAC002', 'Spa & Wellness',  'HTL001'),
    ('FAC003', 'Restoran',        'HTL001'),
    ('FAC004', 'Ruang Meeting',   'HTL002'),
    ('FAC005', 'Gym / Fitness',   'HTL002'),
    ('FAC006', 'Restoran',        'HTL002'),
    ('FAC007', 'WiFi Gratis',     'HTL003'),
    ('FAC008', 'Restoran',        'HTL003');

-- Staff
INSERT INTO staff (staff_id, name, position, phone, email, hotel_hotel_id) VALUES
    ('STF001', 'Agus Prasetyo',  'General Manager',   '081111111111', 'agus.gm@stitch.id',      'HTL001'),
    ('STF002', 'Dewi Lestari',   'Front Desk Officer', '082222222222', 'dewi.fd@stitch.id',      'HTL001'),
    ('STF003', 'Hendra Gunawan', 'General Manager',   '083333333333', 'hendra.gm@stitch.id',    'HTL002'),
    ('STF004', 'Maya Indah',     'Housekeeping',      '084444444444', 'maya.hk@stitch.id',      'HTL002'),
    ('STF005', 'Rizky Fajar',    'General Manager',   '085555555555', 'rizky.gm@stitch.id',     'HTL003'),
    ('STF006', 'Nadia Putri',    'Front Desk Officer', '086666666666', 'nadia.fd@stitch.id',     'HTL003');