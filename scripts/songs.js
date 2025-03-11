"use strict";

// =================================[ELEMENTS]=================================
const currentSongEl = document.querySelector(".songs-current");
const sectionSongsEl = document.querySelector(".section-songs");
const currentArtistEl = document.querySelector(".songs-current-artist");
const songImageContainers = document.querySelectorAll(".song-image-container");
// ============================================================================

// ========[INITIAL VALUES]========
let currentSong;
let songPlaying;
// ================================
songImageContainers.forEach((container) => {
  container.addEventListener("click", function () {
    // ===========[GET SONG INFO]===========
    const attributeString = container.dataset.albumInfo.split("$"),
      songObj = {};
    [
      songObj.song,
      songObj.album,
      songObj.artist,
      songObj.color,
      songObj.filePath,
    ] = attributeString;
    // =====================================

    // ===========[PLAY SONG AND UPDATE PAGE]===========
    if (songPlaying) currentSong.pause();
    currentSong = new Audio(`songs/${songObj.filePath}`);
    songPlaying = true;
    //
    currentSong.addEventListener("ended", () => {
      console.log("Acabou :c");
      currentSongEl.innerHTML = `clica pra tocar!`;
      sectionSongsEl.style.color = "#fff";
    });

    //
    currentSongEl.innerHTML = `${songObj.song} <span class="songs-current-artist"> by ${songObj.artist}</span> `;
    sectionSongsEl.style.color = songObj.color;
    //
    currentSong.play();
    // =================================================
  });
});
