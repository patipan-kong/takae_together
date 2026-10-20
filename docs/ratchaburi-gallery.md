# Ratchaburi editorial gallery

The `#gallery` section in `export/index.html` shows 20 photos (16 from
`export/assets/gallery/ratchaburi-e-card/` / 4 from `export/assets/gallery/legacy-web/`) in three chapters ("By the Lake",
"In the Meadow", "In the Studio"), with a click-to-enlarge lightbox. The video opener is unchanged.

- Markup: `<section id="gallery">` in `export/index.html`; seven named `.rg-spread--*`
  compositions contain the `.rg-item` photographs.
- Styles: `.rg-*` block at the end of `export/styles.css`. CSS Grid and Flexbox keep
  the editorial compositions in document flow, with a separate mobile arrangement
  at `max-width: 700px`. Images retain their natural aspect ratios without cropping.
- Chapter headings use `clamp(24px, 5vw, 34px)` at every breakpoint. Their computed
  sizes are 24px at 390px and 34px at 768px and 1440px.
- Lightbox: `initGalleryLightbox()` in `export/script.js` (native `<dialog>`, vanilla JS).
- Images: AVIF/WebP derivatives in `.../ratchaburi-e-card/web/` (`rc-<n>-<width>.{avif,webp}`);
  the original JPEG is the `<img>` fallback. Originals are never modified.

The DOM and lightbox order is:

- By the Lake: `75, 17, 94, 48, 20, 36, 3, 107, 148`.
- In the Meadow: `196, 204, 193, 170, 262, 224, 279`.
- In the Studio (legacy indoor set, `data-rg-web` points the lightbox at `legacy-web/`): `DSC05603, DSC05675, DSC05711, DSC05730`.

On mobile the supporting `3`/`148` pair appears above the large `107` portrait;
keyboard and lightbox navigation retain DOM order. Photo IDs are not printed in
the gallery. The existing lightbox position counter remains available when open.

Only these 17 original JPEGs are required for fallback and regeneration. The five
other photographs from the source selection are not used by this page or tool.
The calendar invitation and Wedding Experiences section are independent of the
gallery and are preserved when integrating the gallery changes.

## Regenerate derivatives

`scripts/make-gallery-derivatives.js` needs `sharp` (install it in a scratch folder, it is not a
project dependency): `NODE_PATH=<scratch>/node_modules node scripts/make-gallery-derivatives.js`

## Roll back to the previous gallery (4 photos + video)

The previous gallery is available in Git history at `b573ee7`; its markup is also
unchanged at the integrated remote baseline, `8060253`.

- After this work is committed: `git revert <gallery-commit>`.
- Before it is committed: `git checkout -- export/index.html export/styles.css export/script.js`.
- To restore only the old markup later: `git show b573ee7:export/index.html` (the `GALLERY` block).

The four old gallery JPGs and the MP4 were not touched, so the old markup works as-is.
The old `.gallery-grid` / `.gallery-item` CSS rules were left in `styles.css`.

## Legacy gallery images: optimized derivatives (not currently used)

The previous gallery (Git `b573ee7`, `export/index.html` lines 287-300) used four 2:3 portrait
photos of 13-16 MB each. They are no longer referenced by the page, so they cost nothing today.
Optimized copies are ready in `export/assets/gallery/legacy-web/` (generated with
`scripts/make-gallery-derivatives.js legacy`; the original `DSC05*.JPG` files are untouched):

| Original | Derivatives (`legacy-web/`) |
|---|---|
| `DSC05603.JPG` (3861x5792) | `dsc05603-{480,720,1080}.{avif,webp}` |
| `DSC05675.JPG` (4672x7008) | `dsc05675-{480,720,1080}.{avif,webp}` |
| `DSC05711.JPG` (4672x7008) | `dsc05711-{480,720,1080}.{avif,webp}` |
| `DSC05730.JPG` (4672x7008) | `dsc05730-{480,720,1080}.{avif,webp}` |

Recommended markup if the legacy gallery is restored (replace each `<img>` in `.gallery-item`;
the old items are about 480 px wide on desktop and about 46vw on phones). Example for the first photo:

```html
<picture>
  <source type="image/avif" sizes="(max-width: 700px) 46vw, 480px"
    srcset="assets/gallery/legacy-web/dsc05603-480.avif 480w, assets/gallery/legacy-web/dsc05603-720.avif 720w, assets/gallery/legacy-web/dsc05603-1080.avif 1080w" />
  <source type="image/webp" sizes="(max-width: 700px) 46vw, 480px"
    srcset="assets/gallery/legacy-web/dsc05603-480.webp 480w, assets/gallery/legacy-web/dsc05603-720.webp 720w, assets/gallery/legacy-web/dsc05603-1080.webp 1080w" />
  <img src="assets/gallery/DSC05603.JPG" width="3861" height="5792"
    alt="Kanokwan and Patipan pre-wedding moment" loading="lazy" decoding="async" />
</picture>
```

Repeat with `dsc05675` (4672x7008), `dsc05711` (4672x7008) and `dsc05730` (4672x7008).
The `width`/`height` attributes must match the original JPG so there is no layout shift.
