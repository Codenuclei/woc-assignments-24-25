const audio = document.getElementById("audioplayable");
const musicimage = document.getElementById("music-image");
const songname = document.getElementById("song-name");
const description = document.getElementById("song-desc");
const progressBar = document.getElementById("time-slide");
const currenttime = document.getElementById("current-time");
const endtime = document.getElementById("end-time");

const data = {
  songs: [
    {
      music_name: "Blue Eyes",
      description: "Blue Eyes by Yo Yo Honey Singh",
      url: "/music/src/BlueEyes-YoyoHoneySingh.m4a",
      image: "https://c.saavncdn.com/279/Blue-Eyes-2013-500x500.jpg",
    },
    {
      music_name: "Yaar Naa Miley",
      description:
        "Yaar Naa Miley from Kick by Yo Yo Honey Singh, Jasmine Sandlas",
      url: "/music/src/YaarNaMiley-Kick.m4a",
      image: "https://c.saavncdn.com/801/Kick-Hindi-2014-500x500.jpg",
    },
    {
      music_name: "Brown Rang",
      description:
        "Brown Rang from International Villager by Yo Yo Honey Singh",
      url: "/music/src/BrownRangYoyo.m4a",
      image:
        "https://c.saavncdn.com/blob/924/International-Villager-Punjabi-2011-20220722144441-500x500.jpg",
    },
  ],
};
const playhtml = document.getElementById("playbutton");
function playpause() {
  if (audio.paused) {
    audio.play();
    playhtml.innerHTML = `<img src="src/pause.png" class="button-image" alt="hello">`;
    musicimage.style.animationPlayState = "running";
  } else {
    audio.pause();
    playhtml.innerHTML = `<img src="src/play.png" class="button-image" alt="hello">`;
    musicimage.style.animationPlayState = "paused";
  }
}
function forward(a = 10) {
  audio.currentTime += a;
}
let songsn = 0;
async function next(a = 1) {
  songsn += a;
  if (songsn <= data.songs.length) {
    playpause();
    audio.src = await data.songs[songsn].url;
    musicimage.src = await data.songs[songsn].image;
    songname.textContent = await data.songs[songsn].music_name;
    description.textContent = await data.songs[songsn].description;
  } else {
    songsn -= a;
  }
}

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
  let hours = Math.floor(audio.currentTime / 3600);
  let minutes = Math.floor((audio.currentTime % 3600) / 60);
  let seconds = Math.floor(audio.currentTime % 60);
  currenttime.textContent =
    hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;
});
progressBar.addEventListener("input", () => {
  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
});
audio.addEventListener("loadedmetadata", () => {
  let minutes = Math.floor((audio.duration % 3600) / 60);
  let seconds = Math.floor(audio.duration % 60);
  endtime.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
});
function theme() {
  const themeElement = document.getElementById("theme-toggle");
  const body = document.body;
  const currentSrc = themeElement.src;
  if (currentSrc.includes("sun.png")) {
    themeElement.src = "src/moon.png";
    body.style.backgroundImage = "linear-gradient(45deg,rgb(79, 32, 198),rgb(22, 49, 104),rgb(0, 148, 221))"; // Darker gradient for dark theme
    body.style.backgroundColor = "#1a1a1a";
    body.style.color = "white";
  } else {
    themeElement.src = "src/sun.png"; 
    body.style.backgroundImage = "linear-gradient(45deg, #659eff, #5ffffc, #003cff)";
    body.style.backgroundColor = "white"; 
    body.style.color = "black";
  }
}
