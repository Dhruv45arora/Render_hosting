# Arora Cars — Next.js marketplace

Server-rendered rental site for aroracars.com. Phone / WhatsApp: **8979490332**.

## Local setup

```bash
cd Render_hosting
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000

Admin: http://localhost:3000/admin/login  
Default login (change in `.env`): `admin` / `aroracars2026`

## What to upload to Render (or any Node host)

Upload the **entire `Render_hosting` folder**, except:

- `node_modules/` (install on the server)
- `.next/` (build on the server)
- `src/` (old Create React App — unused, safe to delete)
- `legacy-cra/` if present

**Must include**

- `app/` `components/` `data/` `lib/` `prisma/` `public/` `middleware.ts`
- `package.json` `next.config.js` `tsconfig.json` `.env` or host env vars
- `data/keyword-mapping.csv` (SEO mapping, not required at runtime)

**Environment variables on the host**

```
DATABASE_URL=file:./dev.db
ADMIN_USER=admin
ADMIN_PASSWORD=pick-a-strong-password
AUTH_SECRET=long-random-string
NEXT_PUBLIC_SITE_URL=https://aroracars.com
```

**Render build / start**

- Build: `npm install && npx prisma generate && npx prisma db push && npm run db:seed && npm run build`
- Start: `npm start`
- This is a **Node web service**, not a static site. Remove the old `/* → /index.html` rewrite.

SQLite on Render resets if the instance filesystem is ephemeral. Use a persistent disk, or move to Postgres later. Re-run `npm run db:seed` after a wipe.

## After go-live

1. Open view-source on any public URL — you should see the real `<h1>` and copy, not “enable JavaScript”.
2. https://aroracars.com/robots.txt and https://aroracars.com/sitemap.xml
3. Google Search Console → Sitemaps → submit `https://aroracars.com/sitemap.xml`
4. Bing Webmaster Tools → same sitemap
5. Replace AI category photos in `public/images/` with real fleet photos (Admin → vehicle image path)

## Page count (seed)

- Home + blog index
- 55 category / route / info landings
- 12 guides
- 141 vehicle `/rent/[slug]` pages  
**~210 indexable URLs** in `sitemap.xml`
