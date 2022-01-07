# DB MODEL

## CONNECT MONGOSH
mongosh "mongodb+srv://cluster0.i2qm6.mongodb.net/dev_db" --username 
mtavares

## Spotify stuff

-> Create Spotify Connect on client side apps.(https://developer.spotify.com/documentation/web-playback-sdk/)

Testing objects:
exile id = 5U4dnRZsfW8NmwBBkELFPh
artist_id = 22bE4uQ6baNwSHPVcDxLCe
album_id = 0KEmmW5iXwzpaSlaamlizL,5U4dnRZsfW8NmwBBkELFPh
police_id = 5NGO30tJxFlKixkPSgXcFE
rocks_off_spotify = https://open.spotify.com/track/42o3gy9e8dzBHvQE991ad8
sympathy_spotify=https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe
BROWN_SUGAR:
	https://open.spotify.com/track/61UuPxxYUvacEH6SHIK3sU
	spotify:track:61UuPxxYUvacEH6SHIK3sU

mac_pro_id = e163015fd31950a5afb4d54a5e026ad55cac2603
cell_id = b0fcd9e530abd013412175eb818a12f614978c65

## Liked songs
-> create playlists collection;
-> create liked_songs playlist;
-> like song: save __album__, __artist__, __track__ -> add track to __liked_songs__;



## MODEL
User =>
{
	username:
	userId:
}

User_songs =>
{
	song_id:
	is_liked:
}

## spotify_clone
## 	spotify_disclaimer
		<btn onClick=goToSpotifyLogin() > spotify_login </btn>
## spotify_login
	store userId in session