# GTA:PS Static Site

Simple static website for GTA:PS (Grand Theft Auto Police Simulator), designed for GitHub Pages + custom domain `gtaps.site`.

## File Structure

```text
/
  index.html
  404.html
  /changelog/
    index.html
  /information/
    index.html
  /assets/
    styles.css
    app.js
  /content/
    changelog.json
    information.json
    redirects.json
  README.md
  CNAME
```

## Manage Changelog Posts

Edit `content/changelog.json`.

Each item should follow this structure:

```json
{
  "slug": "11-12-25",
  "title": "Placeholder title",
  "date": "2025-11-12",
  "summary": "Placeholder summary",
  "body": "Plain text with newlines OR simple HTML string",
  "tags": ["optional", "tags"]
}
```

Notes:
- `slug` must be unique.
- `date` is optional, but recommended.
- List page is sorted by newest date first. Missing dates are placed last.

## Manage Information Pages

Edit `content/information.json`.

Each item uses the same fields:

```json
{
  "slug": "rules",
  "title": "Placeholder title",
  "date": "",
  "summary": "Placeholder summary",
  "body": "Placeholder body",
  "tags": []
}
```

Notes:
- `slug` must be unique.
- Information list is sorted alphabetically by `title`.

## Manage Short Redirects

Edit `content/redirects.json`:

```json
{
  "discord": "https://discord.com/invite/REPLACE_ME",
  "server": "https://example.com/REPLACE_ME"
}
```

Examples:
- `/discord` redirects to the `discord` URL.
- `/server` redirects to the `server` URL.

## Routing Behavior (GitHub Pages)

- Known routes `/changelog/<slug>` and `/information/<slug>` are rendered by `404.html` + `assets/app.js`.
- Short routes like `/discord` are handled by `redirects.json`.
- Unknown routes redirect to `/` (homepage).

## GitHub Pages + Custom Domain Setup

1. Push this repository to GitHub.
2. In GitHub repository settings, open **Pages**.
3. Set source to deploy from the main branch root (`/`).
4. Confirm the custom domain is `gtaps.site`.
5. Keep the `CNAME` file in the repository with this exact value:

```text
gtaps.site
```

6. At your DNS provider, point `gtaps.site` to GitHub Pages records.
7. Wait for DNS + certificate provisioning to finish in GitHub Pages settings.
