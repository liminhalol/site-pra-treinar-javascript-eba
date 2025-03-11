const albums = document.querySelectorAll(".albums__album");
let currAlbum = 0;
albums.forEach(function (album, index) {
  album.style.transform = `translateX(${(index - currAlbum) * 100}%)`;
});
