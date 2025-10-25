# Booking Management Backend API

Backend API for managing **guests**, **authentication**, and **booking details**.
Supports both **admin** and **user** frontends:

* **Admin dashboard:** reviews, approves, and manages bookings.
* **User app:** allows guests to create, view, or cancel their bookings.

Built with **Express**, **Mongoose**, and **MongoDB**, providing secure authentication, image management, and Google OAuth integration.

---

## Tech Stack

* **Express.js** – web framework
* **Mongoose** – MongoDB ORM
* **MongoDB** – database
* **Joi** – schema validation
* **Google OAuth 2.0** – social login
* **Cloudinary** – image storage
* **jsonwebtoken** – token-based auth
* **bcryptjs** – password hashing

---

## Description

This backend powers a booking system where:

* Guests can register, log in (email/password or Google), make and cancel bookings.
* Admins can review and manage all bookings and guest details.
* All requests are validated, logged, and securely handled with JWT-based authentication.

---

## API Overview
<!-- 
signup
login
logout
google-auth
-------------------
getBookings
getBooking(id) => by id
getBookingAfterDate(date) => get bookings after given date
getStaysAfterDate(date) => get all stays after date (the booking that there status are confirmed)
getStaysTodayActivity => get all the today activity chiking in or out
updateBooking(id) => by id
deleteBooking(id)
---------------
getCabins
createCabin
updateCabin(id)
deleteCabin
------
getSettings
updateSettings(data)
-----
getUser
updateUser
 -->


<!-- Done -->
### Auth

* `POST /auth/signup` – register a new user or guest [user,admin]
* `POST /auth/login` – login with email/password [user,admin]
* `PATCH /auth/confirmEmail` - to confirm the email by the otp [user,admin]
* `PATCH /auth/resendOtp` - to resend the otp via email [user,admin]


<!-- Done -->
### Guests
* `GET /guests/:guestId` – get guest profile [admin] the guest with it's bookings
* `PUT /guests/:guestId` – update guest info [admin] 
* `DELETE /guests/:id` – delete guest [admin]


<!-- Done -->
### Bookings

* `GET /bookings` – list all bookings (admin)  ### You can also send the filtration condition here in the body (i validate on them by joi (not required)) [admin]
* `GET /bookings/user/:id` – list bookings by user  [admin]
* `POST /bookings` – create new booking [user,admin]
* `PUT /bookings/:id` – update booking [user,admin]
* `DELETE /bookings/:id` – cancel booking [user,admin]



<!-- Done -->
### Cabins
`GET /cabins` - get all the cabins 
`POST /cabins` - create a cabin
`POST /cabins/(cabinId)/uploadImg` - upload the image of the cabin
`PUT /cabins/(cabinId)`  - update the cabin data
`delete /cabins/(cabinId)`  - delete the cabin (shalow delete)


---
---
### Next inhance

<!-- 
*`GET /auth/google` – login via Google OAuth    [user]
*`POST /auth/refresh` – refresh JWT token
*`POST /auth/refresh` - user logout  
-->

<!--
 ### User 
* `GET /user/profile` – get user profile [admin,user]
* `PUT /user/:id` – update user info [admin,user]
* `DELETE /user/:id` – delete guest [admin,user] 
-->


---

## Models

### Users

```text
Users {
  _id: ObjectId
  fullName: String (required)
  email: String (unique, required)
  password: String (hashed)
  imgUrl: String (Cloudinary)
  role: String (enum: ['user', 'admin'], default: 'user')
  CountryFlag: String (optional)
  nationalId: String (required)
  isConfirmed: Boolean (required)
  createdAt: Date
}
```
### Cabins

``` text{
  Cabins {
    _id: ObjectId 
    name: String (required)
    maxCapacity: Number (required)
    regularPrice: Number (required)
    discountedPrice: Number (required)
    description: String (required)
    imgae: String (required)
    createdAt: Date 
  }
}
```

### Booking

```text
Booking {
  _id:  ObjectId 
  userId:  ObjectId  (ref: "User")
  cabinId: ObjectId  (ref:"Cabin")
  startDate: Date  (String)
  endDate:  Date  (required)
  numNights: Number (required)
  numGuests: Number (required)
  cabinPrice: Number (required)
  extraPrice: Number (required)
  totalPrice: Number (required)
  status:  String  (enum: ['pending', 'confirmed', 'cancelled'], default: 'pending')
  hasBreakfast: Boolean (default: false)
  isPaid: Boolean (default: false)
  Observation:  String 
  createdAt:  Date 
}
```

### Settings

```text
Settings{
  _id: ObjectId
  minBookingLength: Number (required)
  maxBookingLength: Number (required)
  maxGuestPerBooking: Number (required)
  breakfastPrice : Number (required)
  createdAt : Date
}
```

---

## Environment Variables (`.env.example`)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/booking
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

---

## Scripts

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "seed": "node src/db/seed.js",
  "test": "jest --runInBand"
}
```

---

## Quick Start

```bash
git clone <repo-url>
cd project
npm install
cp .env.example .env
# fill environment values
npm run dev
```

Access API at `http://localhost:4000`.

---

## Folder Structure

```
src/
  app.js
  index.js
  config/
  models/
    Guest.js
    Booking.js
  controllers/
  routes/
  middlewares/
  services/
  utils/
  validators/
tests/
.env.example
```

---

## Security

* Passwords hashed using **bcrypt**.
* Auth protected with **JWT** and optional Google OAuth.
* File uploads sanitized and stored via **Cloudinary**.
* Input validation enforced with **Joi**.

---

## Admin & User Flows

* **Admin:** login → view all bookings → approve or reject → manage guests.
* **User:** register/login → create booking → cancel or view history.

---

## Future Enhancements

* Payment integration (Stripe)
* Email notifications
* Booking reminders
* Analytics dashboard

