# StaySphere

StaySphere is a full-stack property listing and rental web application built with Express, MongoDB, and server-rendered EJS views. It lets users discover accommodation listings, create and manage their own listings, upload listing images, view locations on an interactive map, and leave reviews.

## Features

- Browse all available property listings.
- View listing details, owner information, pricing, location, images, reviews, and an interactive Mapbox map.
- Create, edit, and delete listings when authenticated.
- Upload listing images to Cloudinary.
- Register, log in, and log out with Passport local authentication.
- Persist sessions in MongoDB with `connect-mongo`.
- Add and delete reviews with ratings from 1 to 5.
- Validate listing and review input with Joi.
- Display success and error feedback with flash messages.
- Seed the database with sample listings through `init/index.js`.

## Tech Stack

- **Runtime:** Node.js 24.19.0
- **Backend:** Express 5
- **Database:** MongoDB with Mongoose
- **Templating:** EJS with EJS-Mate layouts
- **Authentication:** Passport, Passport Local, and Passport Local Mongoose
- **Image storage:** Cloudinary with Multer
- **Maps and geocoding:** Mapbox GL JS and Mapbox Geocoding API
- **Validation:** Joi
- **Frontend:** Bootstrap 5, custom CSS, and browser-side JavaScript

## Project Structure

```text
StaySphere/
├── app.js                 # Express application, database connection, sessions, and middleware
├── cloudConfig.js         # Cloudinary configuration and Multer storage
├── middleware.js          # Authentication, ownership, and Joi validation middleware
├── schema.js              # Joi schemas for listings and reviews
├── controllers/           # Listing, review, and user request handlers
├── models/                # Mongoose models for Listing, Review, and User
├── routes/                # Listing, review, and authentication routes
├── views/                 # EJS pages, layouts, and reusable partials
├── public/
│   ├── css/               # Application and rating stylesheets
│   └── js/                # Map initialization and client-side form validation
├── init/
│   ├── data.js            # Sample listing data
│   └── index.js           # Database reset and seed script
└── utils/                 # Async route wrapper and custom Express errors
```

## How It Works

`app.js` connects to MongoDB, configures EJS-Mate, serves static assets, and sets up Mongo-backed sessions and Passport authentication. Requests are routed through `routes/`, where middleware checks authentication, listing ownership, and request validation before calling the matching controller.

Listing controllers use Mongoose models to read and update property data. New listing locations are converted to GeoJSON coordinates with Mapbox geocoding, while uploaded images are stored in Cloudinary. EJS templates render listing pages, reviews, flash messages, and the Mapbox map in the browser.

## Getting Started

### Prerequisites

Make sure you have the following installed or available:

- Node.js 24.19.0 or a compatible Node.js version
- npm
- MongoDB Atlas or a local MongoDB server
- A Cloudinary account for image uploads
- A Mapbox access token for geocoding and maps

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AhmadIsmail777/StaySphere.git
   cd StaySphere
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ```

   `.env` is ignored by Git and should never be committed.

### Seed sample data

The seed script clears existing listings in the local database named `StaySphere` and inserts the sample listings from `init/data.js`:

```bash
node init/index.js
```

> The seed script currently uses `mongodb://127.0.0.1:27017/StaySphere`, so run a local MongoDB instance before using it. It also assigns seeded listings to a fixed owner ID; make sure that user exists if you want to open seeded listing pages that display owner information.

### Start the application

Run the server with:

```bash
node app.js
```

The application listens on [http://localhost:8080](http://localhost:8080).

## Main Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/listings` | Display all listings |
| `GET` | `/listings/new` | Show the new listing form |
| `POST` | `/listings` | Create a listing with an optional image upload |
| `GET` | `/listings/:id` | Display one listing and its reviews |
| `GET` | `/listings/:id/edit` | Show the listing edit form |
| `PUT` | `/listings/:id` | Update a listing |
| `DELETE` | `/listings/:id` | Delete a listing |
| `POST` | `/listings/:id/reviews` | Add a review |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete your review |
| `GET` | `/signup` | Show the registration form |
| `POST` | `/signup` | Register a user |
| `GET` | `/login` | Show the login form |
| `POST` | `/login` | Authenticate a user |
| `GET` | `/logout` | Log out the current user |

## Data Models

- **Listing:** title, description, image metadata, price, location, country, GeoJSON point, owner, and reviews.
- **Review:** comment, rating, creation date, and author.
- **User:** email plus username and password fields supplied by Passport Local Mongoose.

Deleting a listing also removes its associated reviews through a Mongoose `findOneAndDelete` hook.

## Testing

The project does not currently include automated tests. The `npm test` script is still the default placeholder and exits with an error:

```bash
npm test
```

## License

This project currently declares the `ISC` license in `package.json`.
