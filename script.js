
let streak = parseInt(localStorage.getItem('streak') || '0');
let points = parseInt(localStorage.getItem('points') || '0');
let lastRelease = localStorage.getItem('lastReleaseDate') || '';
let releasedToday = lastRelease === new Date().toISOString().slice(0,10);

document.getElementById("streak").textContent = streak;
document.getElementById("points").textContent = points;

const bgSound = document.getElementById("bg-sound");
const typingSound = document.getElementById("typing-sound");
const waveSound = document.getElementById("wave-sound");
const alertSound = document.getElementById("alert-sound");

["thought1","thought2","thought3"].forEach(id => {
  document.getElementById(id).addEventListener("focus", () => {
    bgSound.pause();
    typingSound.play();
  });
});

document.getElementById("release-btn").addEventListener("click", () => {
  if (releasedToday) {
    alertSound.play();
    alert("Lowering your burden; one thought a day.");
    return;
  }

  releasedToday = true;
  const today = new Date().toISOString().slice(0,10);
  localStorage.setItem('lastReleaseDate', today);

  // streak logic
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  if (lastRelease === yesterday) {
    streak++;
  } else {
    streak = 1;
  }
  lastRelease = today;
  localStorage.setItem('streak', streak);

  if (streak % 10 === 0) {
    points += 5;
    localStorage.setItem('points', points);
  }

  document.getElementById("streak").textContent = streak;
  document.getElementById("points").textContent = points;

  // animation
  typingSound.pause();
  waveSound.play();
  document.getElementById("animation-screen").classList.add("active");
  setTimeout(() => {
    document.getElementById("animation-screen").classList.remove("active");
    bgSound.play();
  }, 5000);
});
