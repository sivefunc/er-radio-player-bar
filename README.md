<div align="center">

# ER Radio Player Bar

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, responsive web radio player bar component for [EternityReady.com/radio](https://eternityready.com/radio) icecast stations, built with React, Vite, and Tailwind CSS.

![UI](https://raw.githubusercontent.com/sivefunc/er-radio-player-bar/refs/heads/master/readme_res/hero.png)

<a href="https://eternityready.com/radio/" target="_blank">
  <img src="https://img.shields.io/badge/LIVE-APP-red?style=for-the-badge&logo=javascript&logoColor=white&labelColor=000000" alt="Live Demo" />
</a>

</div>

## Features

- 🎶 Live streaming audio playback from +400 Stations
- 🔄 Real-time metadata updates
- 🖼️ Related Content
- 📅 Last Played
- 🔊 Volume control with visual feedback
- 🎚️ Play/Pause functionality
- 🎨 Dark-themed UI
- 🗺️ Neon Map to find Stations

## APIs Used

- Spotify
- Itunes
- listen.eternityready.com
- Azura Cast
- MapTiler

## Setup 

1. Ensure you have Node.js installed on your machine
2. Clone the repository
3. Open a terminal in the project directory
4. Run `npm install` to install dependencies
5. Create a `.env` file in the base dir with the following content:

```env
SPOTIFY_CLIENT_ID="YOUR_KEY"
SPOTIFY_CLIENT_SECRET="YOUR_KEY"
MAP_KEY="YOUR_KEY"
```
6. Run `npm run dev` to test it.

## Embed React Component in a Vanilla JS Project
1. Run `npm run build` to bundle it.
2. Import the component mounter from ui.es.js and mount it.
```html
<script type="module">
  import { EternityRadioPlayerMounter } from 'dist/ui.es.js';
  EternityRadioPlayerMounter(
    'root',                         // <div id='root'></div>
    "dist/output.css",              // Tailwind CSS
    "dist/er-radio-player-bar.css", // MapTiler CSS
  );
</script>
```
3. Optional: Change Station to one from a external source (not the pre-defined)
```html
<script type="module">
  import { getEternityRadioPlayerRef } from 'dist/ui.es.js';
  const eternityRadioRef = getEternityRadioPlayerRef();
  if (eternityRadioRef && eternityRadioRef.current) {
    eternityRadioRef.current.changeExternalStation("https://your-stream-url");
  }
</script>
```

