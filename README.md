dhapi

DigiHymnal API


VERY basic server


Creates a library from a megafile,

On request, sends giant blob of json songs to user

Will update local storage json style database when user sends putSong to right address

After 5 mintues of no updates, will put database into a backup json file.

Features: 

when user puts a song, checks if already exists and creates new listing if not.

(currently unused) update only a single line/verse of a song

returns a list of currently valid IDs on the / root address

Looks up the next unused ID



npm run start
