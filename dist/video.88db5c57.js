//play audio
if (document.getElementById("playbtn")) {
    const url = "https://uksouth.streaming.broadcast.radio/nrg";
    const audio = new Audio(url);
    const playBtn = document.getElementById("playbtn");
    const progressEl = document.querySelector("progress");
    let mouseDownOnSlider = false;
    audio.addEventListener("loadeddata", ()=>{
        progressEl.value = 0;
    });
    audio.addEventListener("timeupdate", ()=>{
        if (!mouseDownOnSlider) progressEl.value = audio.currentTime / audio.duration * 100;
    });
    audio.addEventListener("ended", ()=>{
        playBtn.textContent = "▶️";
    });
    playBtn.addEventListener("click", ()=>{
        audio.paused ? audio.play() : audio.pause();
        playBtn.textContent = audio.paused ? "▶️" : "⏸️";
    });
    progressEl.addEventListener("change", ()=>{
        const pct = progressEl.value / 100;
        audio.currentTime = (audio.duration || 0) * pct;
    });
    progressEl.addEventListener("mousedown", ()=>{
        mouseDownOnSlider = true;
    });
    progressEl.addEventListener("mouseup", ()=>{
        mouseDownOnSlider = false;
    });
}
//dark mode
var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
// Change the icons inside the button based on previous settings
if (localStorage.getItem("color-theme") === "dark" || !("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) themeToggleLightIcon.classList.remove("hidden");
else themeToggleDarkIcon.classList.remove("hidden");
var themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", function() {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");
    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        }
    } else if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
    }
});

//# sourceMappingURL=video.88db5c57.js.map
