/**
 * Spotify Audio Features & Playlist Data Extraction Engine
 * Automated programmatic extraction of track acoustic profiles, danceability, valence, tempo, and audio metrics.
 */

const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';

async function getAccessToken() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.warn('[!] SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET not configured. Please set them in .env');
        return null;
    }
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    try {
        const response = await axios.post(tokenUrl, 'grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (err) {
        console.error('[!] Failed to obtain Spotify access token:', err.message);
        return null;
    }
}

async function extractPlaylistAudioFeatures(playlistId) {
    const token = await getAccessToken();
    if (!token) return [];

    try {
        console.log(`[*] Fetching tracks for playlist ID: ${playlistId}`);
        const playlistResp = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const tracks = playlistResp.data.items.map(item => item.track).filter(Boolean);
        const trackIds = tracks.map(t => t.id).filter(Boolean).join(',');

        console.log(`[*] Querying audio features for ${tracks.length} tracks...`);
        const featuresResp = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const featuresMap = {};
        (featuresResp.data.audio_features || []).forEach(f => {
            if (f) featuresMap[f.id] = f;
        });

        return tracks.map(t => {
            const f = featuresMap[t.id] || {};
            return {
                id: t.id,
                name: t.name,
                artist: t.artists.map(a => a.name).join(', '),
                album: t.album.name,
                danceability: f.danceability || 0,
                energy: f.energy || 0,
                valence: f.valence || 0,
                tempo: f.tempo || 0,
                loudness: f.loudness || 0,
                acousticness: f.acousticness || 0
            };
        });
    } catch (err) {
        console.error('[!] Error extracting playlist data:', err.message);
        return [];
    }
}

async function exportToCSV(data, filename = 'spotify_audio_features.csv') {
    const csvWriter = createCsvWriter({
        path: filename,
        header: [
            { id: 'id', title: 'TRACK_ID' },
            { id: 'name', title: 'TRACK_NAME' },
            { id: 'artist', title: 'ARTIST' },
            { id: 'album', title: 'ALBUM' },
            { id: 'danceability', title: 'DANCEABILITY' },
            { id: 'energy', title: 'ENERGY' },
            { id: 'valence', title: 'VALENCE' },
            { id: 'tempo', title: 'TEMPO_BPM' },
            { id: 'acousticness', title: 'ACOUSTICNESS' }
        ]
    });
    await csvWriter.writeRecords(data);
    console.log(`[+] Exported ${data.length} track records to ${filename}`);
}

module.exports = { getAccessToken, extractPlaylistAudioFeatures, exportToCSV };
