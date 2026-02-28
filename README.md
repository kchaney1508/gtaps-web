# GTA:PS Static Site (Jekyll)

Simple static website for GTA:PS (Grand Theft Auto Police Simulator), set up for GitHub Pages + custom domain `gtaps.site`.

## File Structure

```text
/
  _config.yml
  Gemfile
  index.html
  404.html
  CNAME
  /assets/
    styles.css
    app.js
  /_layouts/
    default.html
    detail.html
    redirect.html
  /_data/
    redirects.yml
  /_changelog/
    <slug>.md
  /_information/
    <slug>.md
  /changelog/
    index.html
  /information/
    index.html
  /discord/
    index.html
  /server/
    index.html
```

## Add/Edit A Changelog Post

Create or edit a file in `_changelog/`.

Example: `_changelog/11-12-25.md`

```markdown
---
title: Placeholder Update 11-12-25
published_on: 2025-11-12
summary: Placeholder summary
---
Post body content goes here.
```

Notes:
- Filename is the slug (`11-12-25.md` -> `/changelog/11-12-25/`).
- Use Markdown in the body.
- `published_on` is optional. If omitted, the post is listed after dated posts.
- Changelog list sorts newest `published_on` first, then undated posts last.

## Add/Edit An Information Page

Create or edit a file in `_information/`.

Example: `_information/rules.md`

```markdown
---
title: Rules Placeholder
summary: Placeholder summary
---
Information page body goes here.
```

Notes:
- Filename is the slug (`rules.md` -> `/information/rules/`).
- Information list sorts alphabetically by title.

## Add/Edit A Redirect

1. Edit `_data/redirects.yml`.
2. Add or update the key URL mapping.
3. Ensure a matching page exists at `/<key>/index.html` with `redirect_key: <key>`.

Current examples:
- `/discord/` -> `discord`
- `/server/` -> `server`

## Local Development (Like GitHub Pages)

### Option A: Ruby + Bundler

1. Install Ruby + Bundler.
2. Run:

```bash
bundle install
bundle exec jekyll serve
```

3. Open `http://127.0.0.1:4000`.

### Option B: Docker

```bash
docker run --rm -it -p 4000:4000 -v "$PWD:/srv/jekyll" --entrypoint jekyll jekyll/jekyll:4 serve --host 0.0.0.0 --port 4000 --watch
```

Then open `http://127.0.0.1:4000`.

Windows `cmd.exe` helper:

```bat
start.bat
```

## GitHub Pages + Custom Domain Setup

1. Push repository to GitHub.
2. In repo settings, open **Pages**.
3. Set source to deploy from your main branch root.
4. Set custom domain to `gtaps.site`.
5. Keep `CNAME` in the repo with exactly:

```text
gtaps.site
```

6. Configure DNS for `gtaps.site` to GitHub Pages.
7. Wait for DNS + certificate provisioning.

## Routing Behavior

- Real pages exist for `/changelog/<slug>/` and `/information/<slug>/` via Jekyll collections.
- Real redirect pages exist for `/discord/` and `/server/`.
- Unknown routes load `404.html`, which redirects to homepage.
