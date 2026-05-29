# Geotagged Map App

A fullstack web application that allows authenticated users to upload geotagged photos, visualize them on an interactive map, and interact through comments and AI-generated image descriptions.

---

# Features

* JWT Authentication
* Upload geotagged images
* EXIF GPS metadata extraction
* Interactive map visualization
* Cloud image storage with Cloudinary
* AI-generated image descriptions
* Comment system
* Responsive dark UI

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* React-Leaflet / Leaflet

## Backend

* Next.js API Routes
* Prisma ORM

## Database

* PostgreSQL (Neon)

## Authentication

* JWT

## Storage

* Cloudinary

## AI Integration

* OpenAI API

---

#  Project Structure

```bash
src/
 ├── app/
 │    ├── api/
 │    ├── login/
 │    ├── signup/
 │    ├── map/
 │    └── upload/
 │
 ├── components/
 │    ├── Map.tsx
 │    └── UploadForm.tsx 
 │
 ├── lib/
 │    ├── prisma.ts
 │    ├── jwt.ts
 │    ├── cloudinary.ts
 │    └── ai.ts
 │
prisma/
 └── schema.prisma
```

---

#  Installation

Clone the repository:

```bash
git clone https://github.com/yesminedjebbi/geotagged-map-app.git
```

Go to the project folder:

```bash
cd geotagged-map-app
```

Install dependencies:

```bash
npm install
```

---

#  Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

OPENAI_API_KEY=your_openai_api_key
```

---

#  Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

#  Run the Project

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:3000
```

---

#  Deployment

The project can be deployed using:

* Vercel
* Neon PostgreSQL
* Cloudinary

---

#  Scalability Considerations

* Images are stored in Cloudinary instead of the database
* Only metadata and image URLs are stored in PostgreSQL
* Marker clustering can be added for large datasets
* Bounding-box queries can optimize map performance

