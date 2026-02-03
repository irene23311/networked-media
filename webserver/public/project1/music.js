(() => {
    const STORAGE_KEY = "nm_music_playing";
    const musicLink = document.querySelector(".desk-item-music");
    const musicImage = musicLink ? musicLink.querySelector("img") : null;

    let musicCtx = null;
    let musicLoop = null;

    const playNote = (ctx, freq, startTime, duration = 0.22) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.06, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
    };

    const startLoop = () => {
        const sequence = [493.88, 587.33, 659.25, 587.33, 523.25, 587.33];
        const tempo = 0.3;
        let step = 0;

        musicLoop = setInterval(() => {
            const now = musicCtx.currentTime + 0.02;
            playNote(musicCtx, sequence[step % sequence.length], now, tempo * 0.85);
            step += 1;
        }, tempo * 1000);
    };

    const startMusic = () => {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (musicCtx) return;

        musicCtx = new AudioContextClass();
        startLoop();

        if (musicCtx.state === "suspended") {
            const resume = () => {
                musicCtx.resume();
                document.removeEventListener("pointerdown", resume);
            };
            document.addEventListener("pointerdown", resume, { once: true });
        }
    };

    const stopMusic = () => {
        if (musicLoop) {
            clearInterval(musicLoop);
            musicLoop = null;
        }
        if (musicCtx) {
            musicCtx.close();
            musicCtx = null;
        }
    };

    const setPlaying = (isPlaying) => {
        localStorage.setItem(STORAGE_KEY, isPlaying ? "1" : "0");
        if (musicImage) {
            musicImage.classList.toggle("desk-item-image--spinning", isPlaying);
        }
    };

    if (musicLink) {
        musicLink.addEventListener("click", (event) => {
            event.preventDefault();
            const isPlaying = !!musicCtx;
            if (isPlaying) {
                stopMusic();
                setPlaying(false);
            } else {
                startMusic();
                setPlaying(true);
            }
        });
    }

    if (localStorage.getItem(STORAGE_KEY) === "1") {
        startMusic();
        setPlaying(true);
    }
})();
