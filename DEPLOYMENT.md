# Deployment

## 1. Push to GitHub

The repository is `https://github.com/I-slamElhimes/PRTF.git`.

```bash
git push -u origin main
```

If the push asks for credentials, GitHub no longer accepts account passwords —
use a Personal Access Token as the password (GitHub → Settings → Developer
settings → Personal access tokens → Fine-grained token, with **Contents:
Read and write** on this repository), or sign in with the GitHub CLI:

```bash
gh auth login
```

## 2. Import into Vercel

1. <https://vercel.com/new>
2. **Import Git Repository** → select `I-slamElhimes/PRTF`.
3. Framework preset is detected as **Next.js**. Leave the build command, output
   directory and install command at their defaults — no overrides are needed.
4. **Do not deploy yet.** Add the environment variables first (step 3), so the
   very first build already has them.

## 3. Environment variables

Vercel → Project → **Settings** → **Environment Variables**.

| Name            | Required | Environments                     | What it is |
| --------------- | -------- | -------------------------------- | ---------- |
| `SMTP_USER`     | yes      | Production, Preview               | The mailbox that sends the contact form |
| `SMTP_PASSWORD` | yes      | Production, Preview               | App password for that mailbox |
| `SMTP_HOST`     | no       | Production, Preview               | Defaults to `smtp.gmail.com` |
| `SMTP_PORT`     | no       | Production, Preview               | Defaults to `465` |
| `CONTACT_TO`    | no       | Production, Preview               | Where messages land. Defaults to `SMTP_USER` |

**Gmail:** `SMTP_PASSWORD` must be a 16-character **App Password**, not your
account password. Google Account → Security → 2-Step Verification (must be on)
→ App passwords → generate one for "Mail".

None of these are `NEXT_PUBLIC_`, so none of them are ever sent to the browser.
Never add an `SMTP_*` value to a `NEXT_PUBLIC_` variable — that prefix is what
makes Next.js inline a value into the client bundle.

> Environment variables are only read at build/run time. **After adding or
> changing any of them, trigger a new deployment** (Deployments → ⋯ → Redeploy),
> otherwise the running build still has the old values.

## 4. Verify after deploying

- Open the deployed URL, submit the contact form, confirm the mail arrives.
- If it does not: Vercel → Deployments → the deployment → **Functions** →
  `/api/contact` logs. A failed SMTP send is logged there as
  `[contact] SMTP send failed:`.
- Without credentials configured the API replies `503` and the form falls back
  to opening the visitor's mail client — so the form still works, it just is
  not sending server-side yet.

## 5. Custom domain (optional)

Vercel → Settings → Domains. After attaching one, update `url` in
`src/data/site.ts` so the canonical URL, sitemap and Open Graph tags point at
the real domain, then redeploy.

## Local development

```bash
cp .env.example .env.local
```

Fill in `SMTP_USER` / `SMTP_PASSWORD` in `.env.local` (git-ignored), then:

```bash
npm run dev
```

## Secrets checklist

- `.env`, `.env.local` and `.env.*.local` are git-ignored; `.env.example`
  (names only, no values) is the only env file committed.
- `SMTP_PASSWORD` is read exclusively in `src/app/api/contact/route.ts`, which
  runs server-side on the Node.js runtime.
- Verified by building with canary values and grepping the client bundle: no
  `SMTP_*` value appears in any file served to the browser.
