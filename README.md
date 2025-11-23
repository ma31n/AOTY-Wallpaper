# AOTY Wallpaper for Lively Wallpaper

A dynamic wallpaper application that displays your album ratings from Album of the Year (AOTY) with album artwork and track listings powered by Last.fm API.

## Created with:

- HTML/CSS/JavaScript
- Last.fm API for album information and artwork
- [AlbumOfTheYearAPI](https://github.com/JahsiasWhite/AlbumOfTheYearAPI) by JahsiasWhite (used in background Python script to fetch ratings)

Built for [Lively Wallpaper](https://rocksdanister.github.io/lively/), a free and open-source Windows application that allows you to set animated and interactive wallpapers, bringing your desktop background to life.

## How to set up the wallpaper

The official AOTY site does not provide a public API, so this project uses [AlbumOfTheYearAPI](https://rocksdanister.github.io/lively/) and a small, custom Python helper to export your ratings for local use.

1) Run the data-gathering script
   - Download [aoty.py](https://github.com/ma31n/AOTY-Wallpaper/blob/main/aoty.py) and run it. The script will prompt for your AOTY username and produce `AOTYjson.txt` containing your ratings.
   - Warning: some albums or artists may be skipped if their AOTY entries contain unusual characters or inconsistent formatting. If an album is missing, verify the exact spelling on AOTY and re-run the script.

2) (Optional) Obtain a Last.fm API key
	- The wallpaper queries Last.fm for album artwork and track listings. Obtain a personal API key at https://www.last.fm/api and enter it in the wallpaper settings.
	- If you skip this step, the wallpaper will attempt to use the project's default/public key; this may be rate-limited or unavailable during high traffic.

3) Configure and run the wallpaper
   - Upload the generated `AOTYjson.txt` through the wallpaper's settings panel.
   - In the wallpaper settings, enter your Last.fm API key and your Last.fm username. (optional)
   - The wallpaper should display album artwork as the background and list tracks for the selected album.

