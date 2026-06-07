# UMM Hotel Management System

Welcome to the **UMM Hotel Management System**, a comprehensive web-based platform designed to streamline hotel operations, enhance guest experiences, and provide administrative control for hotel staff. This application serves both guests and hotel administrators with tailored interfaces and functionality to ensure a seamless hospitality experience.

---

## 🌟 System Overview

The UMM system is built with a focus on modern web design, utilizing HTML, CSS (via Tailwind CSS), and JavaScript. It provides a robust, responsive, and intuitive interface for managing everything from room reservations to maintenance reporting.

The platform is divided into two primary experiences, strictly gated by an authentication layer (`secure_access.html`):
1. **Guest Experience**: Focused on convenience, booking, and in-stay support.
2. **Administrator Suite**: Focused on hotel operations, oversight, and issue resolution.

---

## 🧳 Features for Guests

The guest-facing side of the application is designed to give visitors full control over their stay, from the initial booking to requesting services during their visit.

*   **Landing Page & Secure Access**: A beautiful, welcoming landing page that transitions into a secure login portal for guests to access their accounts.
*   **Guest Dashboard (`guest_dashboard.html`)**: A personalized hub where guests can view their current stay details, upcoming reservations, and quick actions.
*   **Room Booking**:
    *   **Book by Date (`book_by_date.html`)**: Search for available rooms based on specific check-in and check-out dates.
    *   **Book by Room (`book_by_room.html`)**: Browse specific room types (e.g., Penthouse, Executive Suite, Standard Room) and check their availability.
*   **Issue Reporting (`reports.html`)**: Guests can easily report issues in their room (e.g., plumbing, HVAC, cleanliness) directly to the hotel staff. They can specify the severity, urgency, and category of the problem, ensuring a swift response from maintenance.

---

## 👔 Features for Administrators

The administrative side of the platform equips hotel staff and management with the tools necessary to run the hotel efficiently.

*   **Administrator Suite (`Admin.html`)**: The central command center for hotel staff. It provides high-level metrics, recent activities, and quick access to all management modules.
*   **Room Status Monitoring (`room_status.html`)**: A real-time overview of all rooms in the hotel. Admins can view which rooms are Occupied, Available, Dirty, or Out of Order, allowing for efficient housekeeping and front-desk management.
*   **Guest Logs (`guest_log.html`)**: A comprehensive database of all guests. Staff can review guest histories, contact information, and current in-house status to provide personalized service.
*   **Maintenance Management (`maintenance.html`)**: A dedicated module for tracking, assigning, and resolving maintenance tasks across the property. It ensures that rooms are kept in pristine condition and that out-of-order rooms are returned to service quickly.
*   **Reports Oversight (`reports.html`)**: Admins can view and manage the issues reported by guests, tracking the status of each report from "Open" to "Resolved."

---

## 📁 Project Structure

The project consists of several interconnected HTML pages, all styled with a cohesive design system:

*   `landing_page.html` - The public-facing welcome screen.
*   `secure_access.html` - The login and authentication gateway.
*   `guest_dashboard.html` - The primary view for logged-in guests.
*   `Admin.html` - The primary view for logged-in staff/admins.
*   `book_by_date.html` & `book_by_room.html` - Reservation interfaces.
*   `room_status.html`, `guest_log.html`, `maintenance.html` - Core operational views for staff.
*   `reports.html` - Shared interface for guests to submit issues and staff to review them.

## 🚀 Getting Started

To run this application locally:
1. Ensure all HTML files are located in the same directory.
2. Open `landing_page.html` or `secure_access.html` in any modern web browser.
3. Because the system relies on `sessionStorage` and `localStorage` for state management and authentication, it will work right out of the box in your browser without requiring a backend server.
