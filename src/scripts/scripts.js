// Variables
if (document.getElementById('audiopage')) {
    window.onload = function () {
        // Schedule and time-based image loading
        let hour = new Date().getHours();
        const schedule = [
            './images/breakfast-club.png',
            './images/the-am-show.png',
            './images/nrg-transit.png',
            './images/the-circle.png',
            './images/default.png',
        ];

        const playBtn = document.getElementById('play');
        const audio = document.getElementById('audio');
        const showImg = document.getElementById('show-img');
        let audioContext = null;
        let analyser = null;
        let animationFrameId = null;
        
        // Canvas setup
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Set show image based on time
        if (hour >= 6 && hour < 10) {
            showImg.src = schedule[0];
        } else if (hour >= 11 && hour < 14) {
            showImg.src = schedule[1];
        } else if (hour >= 15 && hour < 19) {
            showImg.src = schedule[2];
        } else if (hour >= 20 && hour <= 23) {
            showImg.src = schedule[3];
        } else {
            showImg.src = schedule[4];
        }

        // Audio setup
        audio.crossOrigin = 'anonymous';
        audio.src = 'https://uksouth.streaming.broadcast.radio/nrg';

        // Update button state
        function updateButtonState(isPlaying) {
            playBtn.textContent = isPlaying ? "Playing" : "Paused";
        }

        // Initialize audio context and analyzer
        function initializeAudio() {
            if (!audioContext) {
                audioContext = new AudioContext();
                const src = audioContext.createMediaElementSource(audio);
                analyser = audioContext.createAnalyser();
                
                src.connect(analyser);
                analyser.connect(audioContext.destination);
                analyser.fftSize = 512;
            }
        }

        // Render frame function
        function renderFrame() {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            const barWidth = WIDTH / bufferLength;

            let x = 0;
            analyser.getByteFrequencyData(dataArray);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i];
                const r = barHeight + 25 * (i / bufferLength);
                const g = 255 * (i / bufferLength);
                const b = 50;

                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                x += barWidth * 1.5;
            }

            if (!audio.paused) {
                animationFrameId = requestAnimationFrame(renderFrame);
            }
        }

        // Start visualization
        function startVisualization() {
            if (!audioContext) {
                initializeAudio();
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            renderFrame();
        }

        // Stop visualization
        function stopVisualization() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            // Clear canvas
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Event Listeners for native media controls and button
        audio.addEventListener("play", () => {
            updateButtonState(true);
            startVisualization();
        });

        audio.addEventListener("pause", () => {
            updateButtonState(false);
            stopVisualization();
        });

        audio.addEventListener("ended", () => {
            updateButtonState(false);
            stopVisualization();
        });

        playBtn.addEventListener("click", async () => {
            try {
                if (audio.paused) {
                    await audio.play();
                } else {
                    audio.pause();
                }
            } catch (error) {
                console.error("Error handling audio:", error);
                updateButtonState(false);
                stopVisualization();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Handle page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (!audio.paused) {
                    stopVisualization();
                }
            } else if (!audio.paused) {
                startVisualization();
            }
        });
    };
}