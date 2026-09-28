# Priya H. — Freelance Portfolio (Full Stack)

A premium freelance portfolio built with React + Vite, with a Node/Express backend and Supabase inquiry storage.

## What's included
- Soft nude/cream visual system instead of bright white
- Light/dark mode with saved preference
- Subtle scroll reveals, hover motion and floating hero animation
- Multi-page routing with React Router
- `/start-project` detailed freelance inquiry page
- Individual project case-study pages at `/projects/:slug`
- Express API for inquiry submissions
- Supabase schema for storing client inquiries
- Optional Resend email notifications

## Structure
```text
client/       React + Vite frontend
server/       Express API
supabase/     SQL schema
```

## Local setup
### Frontend
```bash
cd client
npm install
npm run dev
```

Create `client/.env` from `.env.example` if needed:
```env
VITE_API_URL=http://localhost:5000
```

### Backend
```bash
cd server
npm install
npm run dev
```

Create `server/.env` from `.env.example` and add your Supabase values before testing the inquiry form.

## Supabase
Open `supabase/schema.sql` in your Supabase SQL Editor and run it once.

## Inquiry email notifications
Email notifications are optional. Add a Resend API key and your email in `server/.env`. The inquiry is still stored in Supabase if email notification is not configured.

## Before deployment
Update these values in `client/src/main.jsx`:
- `SITE.email`
- `SITE.linkedin`
- project links if required

For Vercel, you can deploy `client` and `server` as separate projects for the simplest setup. Set the frontend `VITE_API_URL` to the deployed backend URL and the backend environment variables in Vercel.


## V4 visual updates
- Intentional extra vertical breathing room between the hero metadata/scroll cue and the next section.
- Slightly larger skill labels and stronger heading weights.
- Service, work, and process cards lift toward the viewer on hover with subtle scale/depth.
- Project live previews zoom slightly on hover.
- Existing case-study routes remain: `/projects/leadflow-ai`, `/projects/careerbridge`, `/projects/movie-website`, `/projects/personal-portfolio`.
- “View case study” opens the portfolio's project detail page; “Live demo” opens the deployed project.
