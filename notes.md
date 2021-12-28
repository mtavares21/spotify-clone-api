# DB MODEL

## CONNECT MONGOSH
mongosh "mongodb+srv://cluster0.i2qm6.mongodb.net/dev_db" --username 
mtavares

## Spotify stuff
exile id = 5U4dnRZsfW8NmwBBkELFPh
artist_id = 22bE4uQ6baNwSHPVcDxLCe
album_id = 0KEmmW5iXwzpaSlaamlizL,5U4dnRZsfW8NmwBBkELFPh
police_id = 5NGO30tJxFlKixkPSgXcFE
rocks_off_id=42o3gy9e8dzBHvQE991ad8

curl --request GET \
  --url https://api.spotify.com/v1/me/player \
  --header 'Authorization: Bearer BQDousrvNiFVyOcy1q2kU_4FwKj2_3x_QLImW71Env0J1rVGmXyL1hSlxtU_63h9-WAb-GkLo0Uj9MkDU4BWTdDVnYe9p1lkcFfYRjw9k-yW6QkTchH1YKb7mXdfJUHsyTNWjb3e1BBvLpq6MxIZn84c33jqyEkB' \
  --header 'Content-Type: application/json'

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