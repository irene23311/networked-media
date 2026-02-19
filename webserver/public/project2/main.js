window.onload = () =>
{
  const ticksEl = document.getElementById("ticks");
  const countdownEl = document.getElementById("countdown");
  const movingEl = document.getElementById("moving");
  const total = 24;

  const pad = (num) => String(num).padStart(2, "0");

  const deadlines = [
    new Date("2026-02-19T15:59:00"),
    new Date("2026-02-23T12:00:00"),
    new Date("2026-02-28T18:00:00")
  ];

  const charField = document.getElementById("charField");
  const deadlineEls = document.querySelectorAll(".deadline");
  const heartEl = document.querySelector(".heart");

  function updateChars(seconds) {
    const symbol = "•";
    const MAX = 5000;
    charField.textContent = symbol.repeat(Math.min(seconds, MAX));
  }

  function buildTicks() {
    ticksEl.innerHTML = "";
    const extra = 4;
    const count = total + extra;

    for (let i = 0; i <= count; i++) {
      const tick = document.createElement("div");
      tick.className = "tick";
      tick.style.left = `${(i / total) * 100}%`;
      ticksEl.appendChild(tick);
    }
  }

  function updateTime() {
    const now = new Date();
    const upcoming = deadlines.filter(d => d > now);

    if (upcoming.length === 0) {
      countdownEl.textContent = "None";
      return;
    }

    const nearest = upcoming[0];
    let remainingMs = nearest - now;
    if (remainingMs < 0) remainingMs = 0;

    const totalSeconds = Math.floor(remainingMs / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownEl.textContent =
      `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

    updateChars(totalSeconds);
  }

  function updateSlide() {
    const now = new Date();
    const startOfHour = new Date(now);
    startOfHour.setMinutes(0, 0, 0);

    const msIntoHour = now - startOfHour;
    const hourProgress = msIntoHour / 3600000;

    const tickPercent = 100 / total;
    const xPercent = -hourProgress * tickPercent;

    movingEl.style.transform = `translateX(${xPercent}%)`;
  }

  // Position deadlines based on data-steps attribute
  function placeDeadlines() {
    const tickPercent = 100 / total;

    const timelineRect = document.querySelector(".timeline").getBoundingClientRect();
    const heartRect = heartEl.getBoundingClientRect();

    const heartCenter = heartRect.left + heartRect.width / 2 - timelineRect.left;
    const heartPercent = (heartCenter / timelineRect.width) * 100;

    deadlineEls.forEach((el) => {
      // Read data-steps attribute to determine position
      const steps = parseInt(el.getAttribute("data-steps")) || 0;
      
      // Position relative to heart, each step = one tick width
      el.style.left = `${heartPercent + steps * tickPercent}%`;
    });
  }


  buildTicks();
  updateSlide();
  updateTime();
  placeDeadlines();


  window.addEventListener("resize", () => {
    buildTicks();
    updateSlide();
    placeDeadlines();
  });

  setInterval(updateSlide, 50);
  setInterval(updateTime, 1000);
  setInterval(placeDeadlines, 1000);

};
