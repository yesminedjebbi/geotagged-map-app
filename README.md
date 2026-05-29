Geotagged Map App

A fullstack web application that allows authenticated users to upload geotagged photos, visualize them on an interactive map, and interact through comments and AI-generated image descriptions.

Features
User authentication (JWT)
Upload geotagged images
Extract GPS coordinates from image EXIF metadata
Interactive map visualization with Leaflet
Cloud image storage with Cloudinary
AI-generated image descriptions
Comment system for each photo
Responsive dark UI
Tech Stack
Frontend
Next.js
React
TypeScript
Leaflet / React-Leaflet
Backend
Next.js API Routes
Prisma ORM
Database
PostgreSQL (Neon)
Authentication
JWT Authentication
Storage
Cloudinary
AI
OpenAI API
Project Structure
src/
 ├── app/
 │    ├── api/
 │    ├── login/
 │    ├── signup/
 │    ├── map/
 │    └── upload/
 │
 ├── components/
 │    ├──Map.tsx
 │    └──UploadForm.tsx
     
 │
 ├── lib/
 │    ├── prisma.ts
 │    ├── jwt.ts
 │    ├── cloudinary.ts
 │    └── ai.ts
 │
prisma/
 └── schema.prisma
Installation

Environment Variables

Create a .env file:

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

OPENAI_API_KEY=your_openai_api_key
Prisma Setup

Generate Prisma client:

npx prisma generate

Run migrations:

npx prisma migrate dev
Run the Project
npm run dev

Application runs on:

http://localhost:3000
Deployment

The project can be deployed using:

Vercel (frontend + backend)
Neon PostgreSQL
Cloudinary
Scalability Considerations
Images are stored in Cloudinary instead of the database
Only metadata and URLs are stored in PostgreSQL
Leaflet markers can later be optimized using clustering
Bounding-box queries can be added for large datasets