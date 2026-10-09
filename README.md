# Spotify Web API Audio Features & Playlist Extraction Engine

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Interactive Demo](https://img.shields.io/badge/demo-GitHub%20Pages-green.svg)](https://udbhav-shrinet.github.io/spotify-js-data-extraction/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Production-grade Node.js automated extraction pipeline for Spotify playlist tracks, audio metrics (danceability, energy, valence, tempo), and tabular CSV export.

---

## 🚀 Live Interactive Showcase

Inspect Spotify audio feature radar charts and playlist acoustic breakdowns:  
👉 **[Launch Spotify Audio Profiler](https://udbhav-shrinet.github.io/spotify-js-data-extraction/)**

---

## ✨ Key Capabilities

- **OAuth Client Credentials Flow**: Automated token negotiation and lifecycle management with Spotify Accounts API.
- **Audio Features Extraction**: Programmatically queries multi-track audio features (Danceability, Energy, Valence, Acousticness, Instrumentalness, Tempo BPM).
- **Batch Processing**: Extracts full playlist catalogs with automated pagination and rate limit handling.
- **Structured CSV Exporter**: Generates tabular data output for machine learning, clustering, and data analysis pipelines.

---

## 🛠️ System Architecture

```text
┌─────────────────────────┐       ┌────────────────────────┐       ┌──────────────────────┐
│  Spotify Client Secrets │ ───>  │  Spotify Accounts API  │ ───>  │ Bearer Access Token  │
│  (CLIENT_ID, SECRET)    │       │  OAuth2 Auth Flow      │       │ Lifecycle Handler    │
└─────────────────────────┘       └────────────────────────┘       └──────────┬───────────┘
                                                                              │
                                                   ┌──────────────────────────┴──────────────────────────┐
                                                   ▼                                                     ▼
                                       ┌─────────────────────────┐                           ┌───────────────────────┐
                                       │ Playlist Tracks & Audio │                           │  GitHub Pages Studio  │
                                       │ Features CSV Pipeline   │                           │  Radar Profiler App   │
                                       └─────────────────────────┘                           └───────────────────────┘
```

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/udbhav-shrinet/spotify-js-data-extraction.git
   cd spotify-js-data-extraction
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. **Run Extraction**:
   ```bash
   node spotify-data-extraction.js
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
