# GTA:PS Site

Simple Jekyll site for `gtaps.site`

> KC1508: This website was co-coded with CodeX. If you don't support the use of AI, I understand, but don't really care. Take a second to realize this is a simple gaming community and pouring hundreds of man hours into a website really just isn't worth my time. 

## What Is In The Root

- `_config.yml`: Jekyll config
- `index.html`: homepage
- `404.html`: fallback page that redirects home
- `start.bat`: quickest local start command on Windows
- `CNAME`: custom domain for GitHub Pages
- `_site/`: generated output from Jekyll (do not edit)

## Run It Locally

This project is meant to be previewed with Docker.

Requirements:

- Docker Desktop installed
- Docker Desktop running

If Docker Desktop is not open and fully running, `start.bat` will fail.

### Windows Quick Start

From the repo root, run:

```bat
start.bat
```

That starts Jekyll in Docker and serves the site at:

```text
http://127.0.0.1:4000
```

Stop it with `Ctrl+C`.

### What `start.bat` Runs

```bat
docker run --rm -it -p 4000:4000 -v "%cd%:/srv/jekyll" --entrypoint jekyll jekyll/jekyll:4 serve --host 0.0.0.0 --port 4000 --watch
```

## Edit Content

### Changelog

Add or edit files in:

```text
_changelog/
```

Example:

```text
_changelog/11-12-25.md
```

Basic format:

```markdown
---
title: Example Update
published_on: 2026-03-01
summary: Short summary text
---
Main post content goes here.
```

### Information Pages

Add or edit files in:

```text
_information/
```

Example:

```text
_information/rules.md
```

Basic format:

```markdown
---
title: Example Page
summary: Short summary text
---
Main page content goes here.
```

### Redirects

Edit:

```text
_data/redirects.yml
```

Then make sure a matching folder exists for the short link, such as:

- `discord/index.html`
- `server/index.html`

## Main Site Folders

- `assets/`: CSS, JS, images, audio references
- `_layouts/`: shared page layouts
- `changelog/`: changelog list page
- `information/`: information list page
- `discord/` and `server/`: redirect pages

## Deploy

Push the repo to GitHub Pages and keep the `CNAME` file in place so the custom domain stays set to:

```text
gtaps.site
```
