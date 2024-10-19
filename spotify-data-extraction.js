function loadPlaylistData() {
  const clientId = 'Your client Id'; // Your client ID
  const clientSecret = 'Your Client Secret'; // Your client secret
  const playlistId = 'your playlist id'; // Replace with your playlist ID
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Get active sheet

  const token = getAccessToken(clientId, clientSecret);
  Logger.log("Access Token: " + token); // Log the access token

  const tracks = getPlaylistTracks(token, playlistId);
  
  // Clear the sheet before adding new data
  sheet.clear(); 

  // Set the headers in the first row
  const headers = [
    'Playlist Name',
    'Song Name',
    'Artist Name',
    'Duration (Minutes)',
    'Genre',
    'Danceability',
    'Energy',
    'Key',
    'Loudness',
    'Speechiness',
    'Mode',
    'Acousticness',
    'Instrumentalness',
    'Liveness',
    'Valence',
    'Tempo',
    'Release Date',
    'Popularity',
    'Album Name',
    'Artist Followers',
    'Album/Song Image'
  ];
  sheet.appendRow(headers); // Append headers to the sheet

  // Loop through each track and fetch details
  for (let i = 0; i < tracks.length; i++) {
    const trackData = tracks[i].track;

    if (!trackData) {
      Logger.log("Track data is undefined for index: " + i);
      continue; // Skip this iteration if track data is undefined
    }

    const artist = trackData.artists[0]; // First artist
    if (!artist) {
      Logger.log("Artist data is undefined for track: " + trackData.name);
      continue; // Skip if artist is undefined
    }

    const features = getTrackFeatures(token, trackData.id);
    const artistDetails = getArtistDetails(token, artist.id);

    // Log the track information for debugging
    Logger.log("Track: " + trackData.name + ", Artist: " + artist.name);

    // Add track details to the sheet
    const rowData = [
      'Add yr playlist name', // I have hardcoded this, bcz i used multiple playlist of different countries and i needed to filter it.
      trackData.name,            // Song Name
      artist.name,               // Artist Name
      (trackData.duration_ms / 1000 / 60).toFixed(2), // Duration in minutes
      artist.genres ? artist.genres.join(', ') : '', // Genre
      features ? features.danceability : '',     // Danceability
      features ? features.energy : '',           // Energy
      features ? features.key : '',              // Key
      features ? features.loudness : '',         // Loudness
      features ? features.speechiness : '',      // Speechiness
      features ? (features.mode === 1 ? 'Major' : 'Minor') : '', // Mode
      features ? features.acousticness : '',     // Acousticness
      features ? features.instrumentalness : '', // Instrumentalness
      features ? features.liveness : '',         // Liveness
      features ? features.valence : '',          // Valence
      features ? features.tempo : '',            // Tempo
      trackData.album.release_date, // Release Date
      trackData.popularity,          // Popularity
      trackData.album.name,          // Album Name
      artistDetails ? artistDetails.followers.total : '', // Artist Followers
      trackData.album.images[0] ? trackData.album.images[0].url : '' // Album/Song Image
    ];
    sheet.appendRow(rowData); // Append the data to the sheet
  }
}

// Function to get the access token
function getAccessToken(clientId, clientSecret) {
  const url = 'https://accounts.spotify.com/api/token';
  const options = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: 'grant_type=client_credentials',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(clientId + ':' + clientSecret)
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  return data.access_token; // Return the access token
}

// Fetch playlist tracks from Spotify
function getPlaylistTracks(token, playlistId) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const options = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  
  const response = UrlFetchApp.fetch(url, options);
  Logger.log("Response Code: " + response.getResponseCode()); // Log response code
  const data = JSON.parse(response.getContentText());

  if (!data.items) {
    Logger.log("No tracks found in response: " + JSON.stringify(data));
    return []; // Return an empty array if no items are found
  }

  Logger.log("Fetched Tracks: " + JSON.stringify(data.items)); // Log the fetched tracks
  return data.items; // Return the list of tracks
}

// Fetch track features from Spotify
function getTrackFeatures(token, trackId) {
  const url = `https://api.spotify.com/v1/audio-features/${trackId}`;
  const options = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  return data; // Return track features
}

// Fetch artist details from Spotify
function getArtistDetails(token, artistId) {
  const url = `https://api.spotify.com/v1/artists/${artistId}`;
  const options = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  return data; // Return artist details
}
