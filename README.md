# Mahmoud Kronbi, finishing contractor

Portfolio site for Mahmoud Kronbi (RAZANCO Nigeria Limited, Lagos): marble, bathrooms, ceilings, floors, pools and facades for luxury homes and large buildings.

Built with Next.js, React, TypeScript and Tailwind CSS. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:3100
```

## Content

All copy lives in `src/content/` (`site.ts`, `projects.ts`, `cv.ts`). Photos are in `public/images/`; after changing them, run `npm run photos`.

## CV

The CV page is `/cv`. To regenerate the downloadable files after editing `src/content/cv.ts`:

```bash
npm run build && npm run start -- -p 3200   # in one terminal
npm run cv:pdf                              # writes public/cv/mahmoud-kronbi-cv.pdf
npm run cv:docx                             # writes cv/mahmoud-kronbi-cv.docx
```
