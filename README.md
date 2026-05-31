# FlowChord

A web app for exploring musical chords and scales. Select notes on a piano keyboard or guitar fretboard, and FlowChord identifies the matching chord or scale, lists alternative interpretations (including slash chords), and plays the result back through a synthesizer.

**Live demo:** [flowgig.github.io/FlowChord/](https://flowgig.github.io/FlowChord/)

## Features

- **Note selection** — click notes on the piano keyboard or guitar fretboard to build a chord or scale
- **Chord & scale identification** — automatically identifies the chord or scale name and root key as you select notes
- **Slash chord support** — detects and displays slash chords (e.g. C major/E); bass note can also be set manually
- **Alternative interpretations** — shows all other valid chord or scale names for the selected notes via the alternatives menu
- **Manual selection** — pick a key, chord type, and optional bass note from the dropdowns to highlight the corresponding notes
- **Playback** — plays the chord (simultaneously then arpeggiated) or scale (ascending) through a built-in synthesizer; bass note is played one octave below the root
- **Computer keyboard input** — toggle notes using the keyboard
- **Configurable instruments** — show/hide guitar and keyboard, adjust number of frets/keys and lowest note
- **Note labels** — choose to display note names, intervals, or half-step numbers on each note button

## Usage

Select notes by clicking them on the keyboard or fretboard. The app will:

1. Identify the best matching chord or scale and update the **Key** and **Chord/Scale** selectors
2. Show the number of alternative interpretations on the **alternatives badge** (music note icon) — click it to see and switch to any of them
3. Display slash chord alternatives as `Root Name/BassNote` (e.g. `E m3/C`)

You can also drive it the other way — pick a key and chord/scale name from the dropdowns to select the corresponding notes. For chords, an optional **Bass** dropdown lets you add a slash chord bass note.

Press the **play button** to hear the current selection.

Open the **drawer** (hamburger menu) to switch between chord and scale mode, change the note label style, and configure the instruments.

## Development

```bash
yarn install
yarn start       # dev server at http://localhost:5173
yarn build       # production build → /docs (for GitHub Pages)
yarn preview     # preview the production build locally
```

Requires Node.js 18+.

## Tech stack

- **React 19** + **Redux 5** (with `redux-first-history` and `redux-thunk`)
- **Material UI v9** (Emotion-based)
- **Tone.js** for audio synthesis
- **`@benjamindehli/music-utils`** for chord/scale data and matching logic
- **Vite 8** build tooling
- **SCSS modules** for component styles
