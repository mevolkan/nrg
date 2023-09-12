//variables
if (document.getElementById("audiopage")) //play audio
window.onload = function() {
    let hour = new Date().getHours();
    const schedule = [
        "./images/breakfast-club.png",
        "./images/the-am-show.png",
        "./images/nrg-transit.png",
        "./images/the-circle.png",
        "./images/default.png", 
    ];
    var playBtn = document.getElementById("play");
    var audio = document.getElementById("audio");
    var showImg = document.getElementById("show-img");
    // if (hour >= 6 && hour < 10) {
    //     showImg.src = schedule[0]
    // } else if (hour >= 11 && hour < 14) {
    //     showImg.src = schedule[1]
    // } else if (hour >= 15 && hour < 19) {
    //     showImg.src = schedule[2]
    // } else if (hour >= 20 && hour <= 23) {
    //     showImg.src = schedule[3]
    // } else {
    //     showImg.src = schedule[4]
    // }
    audio.crossOrigin = "anonymous";
    audio.addEventListener("ended", ()=>{
        playBtn.textContent = "▶️";
        audioStatus.textContent = "Paused";
    });
    playBtn.addEventListener("click", ()=>{
        audio.paused ? audio.play() : audio.pause();
        playBtn.textContent = audio.paused ? "Paused" : "Playing";
        audio.src = "https://uksouth.streaming.broadcast.radio/nrg";
        // audio.load()
        // audio.play()
        var context = new AudioContext();
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();
        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 512;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        var barWidth = WIDTH / bufferLength;
        var barHeight;
        var x = 0;
        // set canvas color globally
        ctx.fillStyle = "#000";
        function renderFrame() {
            requestAnimationFrame(renderFrame);
            x = 0;
            analyser.getByteFrequencyData(dataArray);
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            for(var i = 0; i < bufferLength; i++){
                barHeight = dataArray[i];
                var r = barHeight + 25 * (i / bufferLength);
                var g = 255 * (i / bufferLength);
                var b = 50;
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                x += barWidth * 1.5;
            }
        }
        audio.play();
        renderFrame();
    });
};
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
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        }
    } else if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
    // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
    // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    }
});

//# sourceMappingURL=video.88db5c57.js.map
