# MeetX - Basic Activity Booking App API

This is the backend API for a basic activity booking application, built as a technical assignment for the Backend Developer Internship at MeetX.

## Features Implemented

* User Registration (Name, Email, Phone, Password)
* User Login (Email, Password) - Password Returns JWT
* List Available Activities (Public Endpoint) - Includes ID, title, description, location, date & time
* Book an Activity (Authorized Users Only) - Requires Activity ID
* Get My Bookings (Authorized Users Only) - Lists activities booked by the logged-in user

## Tech Stack

* **Backend:** Node.js with Express.js
* **Database:** MongoDB (using Mongoose)
* **Authentication:** JWT Token-based (jsonwebtoken)
* **Password Hashing:** bcryptjs

## Prerequisites

* Node.js
* npm (Pre-installed with Node.js)
* MongoDB
* Postman (for API testing)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kanishkaranr/MeetX-BackendDevInternAssignment
    cd meetx-backendDevInternAssignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root of the project with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string # e.g., mongodb://localhost:27017/meetXDB
    JWT_SECRET=your_very_strong_and_random_jwt_secret
    ```
    *Replace placeholders with your actual values.*

4.  **Add Activities Data (Optional, for testing `List Activities`):**
    * You can manually add some activity data to your `activities` collection in MongoDB using MongoDB Compass. 
    * **Sample JSON structure for an activity:**

        ```json
        {
            "title": "Title Name",
            "description": "A description.",
            "location": "Location",
            "date": "2025-05-07",
            "time": "09:00 AM"
        }
        ```

## Running the Application

* **Start Application:**
    ```bash
    npm start
    ```

## API Endpoints

A Postman collection is provided (`MeetX_API_Collection.postman_collection`). Import this into Postman to test the endpoints.

**Authentication (`/api/auth`)**
* `POST /register` - Register a new user.
    * Body: `{"name", "email", "phoneNumber", "password"}`
* `POST /login` - Login an existing user.
    * Body: `{"email", "password"}`
    * Returns: JWT token.

**Activities (`/api/activities`)**
* `GET /` - List all available activities (Public).

**Bookings (`/api/bookings`)**
* `POST /` - Book an activity (Requires Bearer Token).
    * Headers: `Authorization: Bearer <your_jwt_token>`
    * Body: `{ "activityId": "<activity_id_to_book>" }`
* `GET /mybookings` - Get bookings for the logged-in user (Requires Bearer Token).
    * Headers: `Authorization: Bearer <your_jwt_token>`


