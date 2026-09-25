# Aliya's Birthday Surprise

## Folder structure
- index.html
- style.css
- script.js
- assets/photos/   -> put your ~25 real photos here
- assets/audio/    -> put music.mp3 here (music starts right after she unlocks it, loops throughout, stops on Play Again)

## Flow
Opening -> unlock (Baba / pita|peeta) -> 25.01.2026 -> 16.02 -> swipeable photo cards (25 slots)
-> balloon pop game -> letter -> gift (reveals an original lily bouquet illustration + "Tumak pita hobo")
-> final page, with Play Again / Exit buttons.

## Adding your photos
In script.js, find the photo gallery section near the top (PHOTO_COUNT and captions[]).
Two ways to add real photos:
1. Fill in captions[0], captions[1], etc. with your own caption text.
2. To show actual images instead of the "YOUR PHOTO 01" placeholder text, open script.js
   and change the line that builds each card's photo-slot div to include an <img> tag, e.g.:
     `<div class="photo-slot"><img src="assets/photos/1.jpg" alt=""></div>`
   Any photo dimension works — the CSS already handles cropping cleanly (object-fit: cover).
   Simplest approach: name your files 1.jpg, 2.jpg ... 25.jpg to match the loop index + 1.

## Adding music
Put your file at assets/audio/music.mp3 (must be named exactly that, or update the
src in index.html's <audio> tag to match your filename). It starts automatically
the moment she unlocks the page, and loops for the rest of the experience.

## Editing the letter
Open index.html and find the <div class="letter">...</div> block on the
letter page. The [bracketed] lines are placeholders for you to personalize.

## Unlock answers
First blank: Baba (case-insensitive)
Second blank: pita OR peeta (case-insensitive)

## Play Again / Exit
"Play again" resets everything (balloons, gift, gallery, music) and returns to the
start. "Exit" stops the music and tries to close the tab — most browsers only allow
a page to close a tab it opened itself, so on many phones/browsers this will just
stop the music and do nothing further, which is expected.

## GitHub Pages
Create a new repo, upload all these files (keep the folder structure),
then go to Settings -> Pages, pick your branch and root, and save.
Your page will be live at https://yourusername.github.io/reponame/

Note: this is a visual/interaction build, not real security — the unlock
answers live in script.js, so don't use this to gate anything sensitive.
