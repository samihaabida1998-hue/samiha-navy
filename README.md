# Samiha — Navy Architecture Portfolio

A GitHub Pages-ready static website built with HTML, CSS, JavaScript and GSAP scroll animations.

## 1. Preview locally

The quickest preview is to double-click `index.html`.

For the most reliable animation preview, open a terminal inside this folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 2. Put it on GitHub Pages

1. Create a new **Public** GitHub repository.
2. Upload everything inside this folder to the root of the repository.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Choose **main** and **/(root)**.
6. Save.

Your site will publish at a URL similar to:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

## 3. The three main files

- `index.html` — all text, sections, image references and links.
- `styles.css` — colors, fonts, layout and responsive design.
- `script.js` — scroll transitions and zoom animations.

## 4. Change the color palette

At the very top of `styles.css`, edit:

```css
--navy: #0c2340;
--navy-soft: #31506f;
--yellow: #f3c744;
--white: #ffffff;
```

## 5. Change images WITHOUT changing code

The easiest method is to replace an image inside `assets/images/` with your new image using the exact same filename.

### About
- `about-me.jpg`

### Gallery
- `gallery-youthsphere.jpg`
- `gallery-the-bay.jpg`
- `gallery-skyscraper.jpg`
- `gallery-railway.jpg`
- `gallery-nirjhor.jpg`
- `gallery-eco-park.jpg`

### Project 01 — YOUTHSphere
- `p01-hero.jpg` — first project image
- `p01-plan.jpg` — image that zooms while scrolling
- `p01-detail.jpg` — technical/render/detail image

### Project 02 — The Bay
- `p02-hero.jpg`
- `p02-plan.jpg`
- `p02-detail.jpg`

### Project 03 — Skyscraper
- `p03-hero.jpg`
- `p03-plan.jpg`
- `p03-detail.jpg`

Recommended web image size: 1600–2200 px on the long side, ideally WebP/JPG and under roughly 1 MB each.

## 6. Change About text

Open `index.html` and search for:

`ABOUT / SAMIHA ABEDA NUR`

The About text is directly underneath.

## 7. Change project text

Search inside `index.html` for:

- `PROJECT 01`
- `PROJECT 02`
- `PROJECT 03`

Edit the title, subtitle, location, project type, focus, summary and specialties directly there.

## 8. Add another full project later

The easiest method is to copy everything between one pair of project comments, for example:

`04 — PROJECT 02`

Then:

1. Change the section id to `project-04`.
2. Change the text.
3. Add new image files such as `p04-hero.jpg`, `p04-plan.jpg`, `p04-detail.jpg`.
4. Add a new link in the fixed `.side-nav` near the top of `index.html`.

The animations are written to automatically work with new `.project-hero`, `.plan-scroll` and `.project-detail` sections.

## 9. Change animation speed

Open `script.js`.

The first-O transition is under:

`00 — First O portal transition`

The project plan zooms are under:

`Plan zoom`

For a slower animation, increase the scroll section height in `styles.css`, e.g.:

```css
.plan-scroll { height: 260vh; }
```

For faster, reduce it.

## 10. Important

Keep these files in the repository root:

- `index.html`
- `styles.css`
- `script.js`
- `.nojekyll`
- `assets/`

The site uses GSAP from a CDN, so an internet connection is needed for the scroll animation library to load. The page content itself remains plain editable HTML/CSS/JS.
