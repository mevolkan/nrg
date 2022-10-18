//play audio
if (document.getElementById('playbtn')) {
    const url = "https://uksouth.streaming.broadcast.radio/nrg";
    const audio = new Audio(url);
    const playBtn = document.getElementById('playbtn');
    const progressEl = document.querySelector('progress');
    const audioStatus = document.getElementById('audiostatus');
    const date = document.getElementById('date');

    let mouseDownOnSlider = false;

    audio.addEventListener("loadeddata", () => {
        progressEl.value = 0;
    });
    audio.addEventListener("timeupdate", () => {
        if (!mouseDownOnSlider) {
            progressEl.value = audio.currentTime / audio.duration * 100;
        }
    });
    audio.addEventListener("ended", () => {
        playBtn.textContent = "▶️";
        audioStatus.textContent = "Paused";
    });

    playBtn.addEventListener("click", () => {
        audio.paused ? audio.play() : audio.pause();
        playBtn.textContent = audio.paused ? "▶️" : "⏸️";
        audioStatus.textContent = audio.paused ? "Paused" : "Playing";
    });

    progressEl.addEventListener("change", () => {
        const pct = progressEl.value / 100;
        audio.currentTime = (audio.duration || 0) * pct;
    });
    progressEl.addEventListener("mousedown", () => {
        mouseDownOnSlider = true;
    });
    progressEl.addEventListener("mouseup", () => {
        mouseDownOnSlider = false;
    });

    //date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    date.textContent = today;


}