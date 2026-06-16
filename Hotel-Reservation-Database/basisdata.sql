DROP TABLE IF EXISTS staff, facility, review, reservation, payment, guest, room, address, hotel CASCADE;


CREATE TABLE hotel (
    hotel_id VARCHAR(10) PRIMARY KEY,
    hotel_name VARCHAR(50) NOT NULL,
    classification VARCHAR(10) NOT NULL,
    description VARCHAR(100)
);

CREATE TABLE address (
    address_id VARCHAR(10) PRIMARY KEY,
    province VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    hotel_hotel_id VARCHAR(10) NOT NULL,
    CONSTRAINT address_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel(hotel_id)
        ON DELETE CASCADE
);

CREATE TABLE room (
    room_id VARCHAR(10) PRIMARY KEY,
    room_number INTEGER NOT NULL,
    room_type VARCHAR(10) NOT NULL,
    price_per_night INTEGER NOT NULL,
    status CHAR(1) NOT NULL,
    description VARCHAR(100),
    hotel_hotel_id VARCHAR(10) NOT NULL,
    CONSTRAINT room_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel(hotel_id)
        ON DELETE CASCADE
);

CREATE TABLE guest (
    guest_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    phone INTEGER NOT NULL,
    email VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL
);

CREATE TABLE payment (
    payment_id VARCHAR(10) PRIMARY KEY,
    payment_date DATE NOT NULL,
    amount INTEGER NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    payment_status CHAR(1) NOT NULL
);

CREATE TABLE reservation (
    reservation_id VARCHAR(10) PRIMARY KEY,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    reservation_date DATE NOT NULL,
    total_price INTEGER NOT NULL,
    guest_guest_id VARCHAR(10) NOT NULL,
    room_room_id VARCHAR(10) NOT NULL,
    payment_payment_id VARCHAR(10) NOT NULL,

    CONSTRAINT reservation_guest_fk
        FOREIGN KEY (guest_guest_id)
        REFERENCES guest(guest_id)
        ON DELETE CASCADE,

    CONSTRAINT reservation_room_fk
        FOREIGN KEY (room_room_id)
        REFERENCES room(room_id)
        ON DELETE CASCADE,

    CONSTRAINT reservation_payment_fk
        FOREIGN KEY (payment_payment_id)
        REFERENCES payment(payment_id)
        ON DELETE CASCADE
);

CREATE TABLE review (
    review_id VARCHAR(10) PRIMARY KEY,
    rating CHAR(1) NOT NULL,
    comment VARCHAR(100),
    review_date DATE NOT NULL,
    guest_guest_id VARCHAR(10) NOT NULL,
    CONSTRAINT review_guest_fk
        FOREIGN KEY (guest_guest_id)
        REFERENCES guest(guest_id)
        ON DELETE CASCADE
);

CREATE TABLE facility (
    facility_id VARCHAR(10) PRIMARY KEY,
    facility_name VARCHAR(20) NOT NULL,
    hotel_hotel_id VARCHAR(10) NOT NULL,
    CONSTRAINT facility_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel(hotel_id)
        ON DELETE CASCADE
);

CREATE TABLE staff (
    staff_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    position VARCHAR(20) NOT NULL,
    phone INTEGER NOT NULL,
    email VARCHAR(50) NOT NULL,
    hotel_hotel_id VARCHAR(10) NOT NULL,
    CONSTRAINT staff_hotel_fk
        FOREIGN KEY (hotel_hotel_id)
        REFERENCES hotel(hotel_id)
        ON DELETE CASCADE
); 