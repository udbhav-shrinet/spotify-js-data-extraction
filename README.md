# Spotify Acoustic Profile & Vibe Analyzer

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Interactive Studio](https://img.shields.io/badge/live%20analyzer-GitHub%20Pages-green.svg)](https://udbhav-shrinet.github.io/spotify-js-data-extraction/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> I built this client-side extraction engine to instantly dissect Spotify playlists and profiles without spinning up a heavy backend database. It uses the Spotify Web API strictly from the browser to generate acoustic signatures, multi-dimensional radar charts, and a unique 100+ badge achievement system for your music taste.

---

## 🎧 Live Explorer

👉 **[Launch Listening Profile Analyzer](https://udbhav-shrinet.github.io/spotify-js-data-extraction/)**

---

## ✨ Features

- **No-Backend Architecture**: 100% Client-side JavaScript. Uses Spotify's Implicit Grant Flow (OAuth 2.0) directly from the browser window.
- **Acoustic Radar Synthesis**: Maps tracks across Danceability, Energy, Valence (Happiness), Acousticness, Instrumentalness, and Liveness.
- **Vibe Matrix Generation**: Computes a personalized psychographic vibe title (e.g. *Syntax Cyberpunk*, *Autumn Melancholy*, *138-BPM Architect*).
- **100+ Badge Achievement System**: Unlocks digital collectible badges based on hidden listening geometry (e.g. *Basshead*, *Caffeine Coder*, *All Rounder*).
- **Instant Demo Mode**: Curated profile presets (Tech, Rave, Indie) available for instant exploration without needing a Spotify auth token.

---

## 🛠️ Usage Pipeline

```bash
git clone https://github.com/udbhav-shrinet/spotify-js-data-extraction.git
cd spotify-js-data-extraction
# Just open index.html in your browser, or mount a local web server!
python3 -m http.server 8000
```

---

## 📄 License
MIT. Not affiliated with Spotify AB. Data endpoints accessed via official Web API specifications.
