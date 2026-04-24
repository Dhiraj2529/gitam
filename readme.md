# Gitam Music Player

Gitam is a static music player project built with HTML, CSS, and JavaScript. It now includes a cleaner responsive UI, a dedicated liked songs view, upload support for local browser sessions, and a GitHub Pages-friendly fallback page.

## Features

- Play six built-in Alan Walker tracks
- Like and remove songs using `localStorage`
- Login and signup using browser storage
- Upload local MP3 files for the current browser session
- Switch between dark and light themes
- Use a shared bottom player across pages
- Show a custom `404.html` fallback for GitHub Pages

## Project Files

- `index.html` home page
- `liked.html` liked songs page
- `upload.html` upload page
- `login.html` login page
- `signup.html` sign up page
- `404.html` fallback page for bad routes
- `script.js` application logic
- `style.css` shared styling

## Run Locally

1. Open `index.html` in a browser.
2. Create an account or go straight to the home page.
3. Play songs, like tracks, and test the upload flow.

## Publish On GitHub Pages

1. Push this folder to your GitHub repository.
2. In the repository settings, open `Pages`.
3. Set the source to the root of your default branch.
4. Open the generated Pages URL after GitHub finishes deployment.

Because every page now uses relative links such as `index.html` and `liked.html`, the project is safe to host inside a repository subpath on GitHub Pages.

## Note About Uploads

Uploaded songs use browser object URLs. They work for the current device and browser session, but they are not permanent cloud uploads.
