//play audio
if (document.getElementById('playbtn')) {
    const url = "https://uksouth.streaming.broadcast.radio/nrg";
    const audio = new Audio(url);
    const playBtn = document.getElementById('playbtn');
    const audioStatus = document.getElementById('audiostatus');

    let mouseDownOnSlider = false;


    audio.addEventListener("ended", () => {
        playBtn.textContent = "▶️";
        audioStatus.textContent = "Paused";
    });

    playBtn.addEventListener("click", () => {
        audio.paused ? audio.play() : audio.pause();
        playBtn.textContent = audio.paused ? "▶️" : "⏸️";
        audioStatus.textContent = audio.paused ? "Paused" : "Playing";
    });

 



}