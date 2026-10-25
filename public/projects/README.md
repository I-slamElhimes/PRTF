# Project images

Every image the site shows is real. There are two kinds, and the interface
labels each one so a visitor always knows what they are looking at:

- **Screenshot** — a capture of the running application.
- **Report · fig. p.N** — a figure lifted from the project's own written
  report, with the page it came from.

Nothing here is a reconstruction or a stand-in.

## Folders

| Folder                   | Project           | Source                                     |
| ------------------------ | ----------------- | ------------------------------------------ |
| `juribot/`               | JuriBot Sentinel  | Application screenshots                    |
| `faceattend/`            | FaceAttend        | Application screenshots                    |
| `edt/`                   | EDT Collaboratif  | Application screenshots                    |
| `travel-planner/`        | Travel Planner    | Figures extracted from `rapport_travelPlanne.pdf` |

`travel-planner/figures.json` records every extracted figure with its caption
and source page, so the mapping back to the report stays auditable.

## Adding or replacing an image

1. Drop the file in the project's folder.
2. Reference it in `src/data/projects.ts`, either as the `cover` or as a
   `gallery` entry:

```ts
{
  src: "/projects/juribot/new-screen.jpg",
  alt: "Describe what the screen actually shows.",
  caption: "Short caption for the gallery",
  source: "capture",          // or "report" (then add reportPage: 17)
}
```

`alt` is required and should describe the screen, not just name the project —
it is what a screen-reader user gets instead of the image.

## Image guidance

- **Aspect ratio:** 16:10 frames everywhere. Wider captures are cropped from
  the top (`object-top`), so keep the important UI in the upper portion.
- **Format:** JPG or PNG. Next.js serves AVIF/WebP automatically.
- **Size:** keep sources under ~500 KB where you can.
