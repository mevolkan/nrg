//play audio
audioPlayer = document.getElementById("player");
document.querySelector("#play").addEventListener("click", function() {
    audioPlayer.play();
});
document.querySelector("#pause").addEventListener("click", function() {
    audioPlayer.pause();
});
audioPlayer.addEventListener("timeupdate", function() {
    console.log(this.currentTime);
    document.querySelector("#seekbar").attr("value", this.currentTime / this.duration);
});

//# sourceMappingURL=index.88db5c57.js.map
