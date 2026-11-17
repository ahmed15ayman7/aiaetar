# AIAETAR

The project is split into three apps:

- `backend` — ASP.NET Core API (certificates, admin auth, contact requests, gallery)
- `web` — public Next.js site on port 3000
- `admin` — admin control panel on port 3001

Both frontends keep calling `/api/...`. Next.js rewrites those requests to the API at `http://127.0.0.1:5080`.

## Run locally

PostgreSQL database `aiaetar` must already exist. The API reads `DATABASE_URL`, or connects as `ubuntu` on `127.0.0.1:5432` when that variable is unset.

```bash
# API
cd backend
dotnet run

# Public site
cd web
npm install
npm run dev

# Admin panel
cd admin
npm install
npm run dev
```

Open the site at http://127.0.0.1:3000 and the admin panel at http://127.0.0.1:3001/admin.

The seeded admin, when created by the previous database seed, is `admin@aiaetar.edu.eg` / `Admin@123456`.

Gallery uploads use `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Admin sign-in cookies are signed with `ADMIN_JWT_SECRET`.
