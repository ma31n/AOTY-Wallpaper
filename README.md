# AOTY Wallpaper Engine

An interactive wallpaper for Wallpaper Engine that displays your Album of the Year (AOTY) ratings with album artwork and track listings, powered by Last.fm API.

## Features

- **Dynamic Album Display**: Auto-rotates through your AOTY ratings with random selection and rating filtering
- **Live Album Artwork**: Fetches high-quality album covers and track information from Last.fm
- **Interactive Settings Panel**: Configure update intervals, minimum ratings, and API keys with instant preview

## Built with

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no dependencies)
- **Album Data**: Last.fm API for metadata and artwork
- **Rating Fetch**: Self-hosted Flask backend ([aotywallpaperhelper](https://github.com/ma31n/AOTYwallpaperHelper)) using [AlbumOfTheYearAPI](https://github.com/JahsiasWhite/AlbumOfTheYearAPI) by JahsiasWhite
- **Platform**: [Wallpaper Engine](https://www.wallpaperengine.io/) on Windows

## Quick Setup

The wallpaper fetches your AOTY ratings directly from a self-hosted backend service powered by [JahsiasWhite's AlbumOfTheYearAPI](https://github.com/JahsiasWhite/AlbumOfTheYearAPI), so no local scripts needed!

### Step 1: (OPTIONAL) Obtain a Last.fm API Key
- Visit https://www.last.fm/api/account/create to create a free personal API key
- If the step is skipped, you will be using a public API key provided by me, which may be limited
- Using your personal Last.fm API key guarantees full functionality

### Step 2: Configure the Wallpaper
1. Set the wallpaper in Wallpaper Engine by loading it as URL
2. Click the **⚙️ settings button** on the wallpaper to open the panel
3. Fill in the following:
   - **Last.fm Username**: Your AOTY account username
   - **Last.fm API Key**: Your personal API key from step 1
   - **Update Interval**: How often to rotate albums (default: 30s)
   - **Minimum Rating**: Skip albums below this rating threshold (0-100, default: 0)
4. Click **Save** — the wallpaper will fetch your AOTY data and start rotating!

### USING THE INPUT FIELDS
Due to Windows restrictions, you must minimize all windows and hide icons in order to type into input fields of the wallpaper. Wallpaper Engine supports a shortcut key for this scenario.

## How It Works

- The wallpaper sends your AOTY username to the backend service, which fetches your rated albums
- Last.fm API provides high-quality album artwork and track listings
- Albums are randomly selected and displayed as your dynamic desktop background
- All settings are saved locally in browser storage for persistence

