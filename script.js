// Дата открытия: 13 октября 2026, 18:00 по времени UTC+7
const UNLOCK_AT = new Date("2026-10-13T18:00:00+07:00").getTime();

const countdown = document.getElementById("countdown");
const content = document.getElementById("content");
const timerParts = {
  days: document.getElementById("tDays"),
  hours: document.getElementById("tHours"),
  minutes: document.getElementById("tMinutes"),
  seconds: document.getElementById("tSeconds"),
};
let timerId;

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const left = UNLOCK_AT - Date.now();
  if (left <= 0) {
    clearInterval(timerId);
    countdown.remove();
    content.hidden = false;
    document.body.classList.remove("locked");
    window.scrollTo(0, 0);
    return;
  }
  const total = Math.floor(left / 1000);
  timerParts.days.textContent = Math.floor(total / 86400);
  timerParts.hours.textContent = pad(Math.floor(total / 3600) % 24);
  timerParts.minutes.textContent = pad(Math.floor(total / 60) % 60);
  timerParts.seconds.textContent = pad(total % 60);
}

tick();
timerId = setInterval(tick, 1000);

const buttons = document.querySelectorAll("[data-scroll]");
const yesButton = document.getElementById("yesButton");
const finalSection = document.getElementById("final");
const hearts = document.getElementById("hearts");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

yesButton.addEventListener("click", () => {
  createHearts(28);
  setTimeout(() => {
    finalSection.scrollIntoView({ behavior: "smooth" });
  }, 450);
});

function createHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.25 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.animationDelay = `${Math.random() * .8}s`;
    heart.style.animationDuration = `${2.6 + Math.random() * 1.8}s`;
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
}
