# jaya's little room ♡

A tiny illustrated bedroom that works as a homepage — objects in the room
(the mirror, the bookshelf, the desk, the plant, the bed…) are the
navigation. Built with plain HTML, CSS and JavaScript. No build step,
no dependencies.

## Running it locally

You don't need to install anything. Two options:

1. **Just open it** — double-click `index.html` and it'll open in your
   browser. Everything will work.
2. **Or serve it** (nicer for testing, avoids some browser file-access
   quirks) — from this folder, run one of:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000` in your browser.

## Folder structure

```
index.html          the room, the hotspots, the modal text
style.css            all colors, fonts, layout, animation
script.js            interactions (modals, gallery, particles, secrets)
assets/
  drawings/          your artwork goes here
  character/         (optional) a drawn version of you, to replace the doodle
  textures/          (optional) paper/grain textures if you add any
  decorations/        (optional) any extra doodles you want to scatter around
```

## Adding your own drawings

The gallery ("my drawings", opened by clicking the corkboard) is driven
by a small list near the top of `script.js`:

```js
const drawings = [
  { src: 'assets/drawings/placeholder-01.svg', caption: 'little drawing #01' },
  { src: 'assets/drawings/placeholder-02.svg', caption: 'little drawing #02' },
  { src: 'assets/drawings/placeholder-03.svg', caption: 'little drawing #03' },
];
```

To swap in a real drawing:
1. Drop your image file into `assets/drawings/` (jpg, png, whatever you have).
2. Change the matching `src` above to point at it, e.g.
   `assets/drawings/sunset-sketch.jpg`.
3. Update the `caption` if you want.

To add a fourth (or fifth, or twentieth) drawing, just add another line
to the array — the next/previous arrows will pick it up automatically.
Your artwork is shown as-is (not cropped or recolored), so use an image
that's already cropped the way you like it.

## Replacing the illustrated "you"

Right now there's a simple hand-drawn character sitting by the desk,
built directly out of SVG shapes inside `index.html` (look for
`id="jayaCharacter"`). When you have your own drawing of yourself, the
easiest swap is to replace that whole `<g id="jayaCharacter">…</g>`
block with:

```html
<image href="assets/character/jaya.png" x="490" y="820" width="150" height="180" />
```

(adjust `x`, `y`, `width`, `height` until she sits where you want her —
the room's coordinate grid is 1000 wide by 1400 tall.)

## Changing the words

All the text that appears in the little popup cards (the "about"
card, "currently learning", "say hi", etc.) lives in the `<div
id="modalOverlay">` section near the bottom of `index.html`, in plain
readable HTML. Edit it directly — no templating, no data files.

One thing to definitely change: the placeholder email address in the
"say hi" card (`mailto:jaya@example.com`) — swap it for your real one.

## A few notes on how it's built

- The room is one big inline SVG (`viewBox="0 0 1000 1400"`), so it
  scales cleanly at any size. The clickable "hotspot" buttons sit on
  top of it, positioned in percentages so they always land on the
  right object.
- Animations (fairy lights flickering, curtains swaying, the little
  floating dust/fireflies) are slow and ambient on purpose, and they
  all turn off automatically if a visitor's system has "reduce
  motion" turned on.
- No fake projects, jobs, or skills were invented anywhere in the
  copy — every line is either what you gave me or clearly a
  placeholder you can edit.
