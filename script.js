const songs = [
  { name: "song1.mp3", title: "Stay With Me", artist: "Punch(fet.EXO Chanyeol)", cover: "swm.jpg" },
  { name: "song2.mp3", title: "MONA LISA", artist: "J-Hope", cover: "monlis.jpg" },
  { name: "song3.mp3", title: "Shinunoga E-Wa", artist: "Fujii Kaze", cover: "sniwa.jpg" },
  { name: "song4.mp3", title: "It's You", artist: "Henry", cover: "itsyou.jpg" },
  { name: "song5.mp3", title: "Back To Me", artist: "The Rose", cover: "btm.jpg" }
];

let index = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}`;
  cover.src = `music/${song.cover}`;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  playSong();
  updatePlaylist();
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(songs[index]);
  playSong();
  updatePlaylist();
}

audio.addEventListener("timeupdate", () => {
  const { currentTime: ct, duration: dur } = audio;
  if (!isNaN(dur)) {
    progress.value = (ct / dur) * 100;
    updateTimeDisplay(ct, dur);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateTimeDisplay(ct, dur) {
  currentTime.textContent = formatTime(ct);
  duration.textContent = formatTime(dur);
}

function loadPlaylist() {
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      index = i;
      loadSong(songs[i]);
      playSong();
      updatePlaylist();
    });
    playlist.appendChild(li);
  });
}

function updatePlaylist() {
  const items = playlist.querySelectorAll("li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

audio.addEventListener("ended", nextSong); // autoplay next

// INIT
loadSong(songs[index]);
loadPlaylist();
updatePlaylist();
