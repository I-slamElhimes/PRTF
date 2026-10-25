# CV

## How to update your CV

**Replace one file. That is the whole system.**

```
public/cv/CV-Islam-El-Himes.pdf
```

Drop your new PDF at that exact path, overwriting the old one. The
"Download CV" buttons in the hero and contact section pick it up immediately —
no code change, no rebuild step to remember, no admin panel to log into.

On Vercel: commit the replaced file and push. The next deploy serves it.

## Why there is no upload interface

An upload form would need an authenticated admin route, a writable filesystem
and a session store. Vercel's filesystem is read-only at runtime, so an upload
button would either not work in production or require a database and blob
storage — a lot of moving parts, and a login page on a public portfolio, to
replace dragging one file into one folder.

If you later want in-browser uploads, the clean path is Vercel Blob plus a
protected route; say the word and it can be added.

## Changing the filename

If you rename the file, update one line in `src/data/site.ts`:

```ts
cv: {
  href: "/cv/CV-Islam-El-Himes.pdf",   // ← path under /public
  filename: "Islam-El-Himes-CV.pdf",   // ← name the browser saves it as
  updated: "2026-08",                  // ← shown as "Updated ..." on the button
},
```

Set `cv` to `null` and every CV button disappears from the site rather than
becoming a dead link.
