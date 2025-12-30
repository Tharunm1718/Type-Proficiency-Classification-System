// 🔹 Select image based on level
const card = document.querySelector(".result-card");
const level = card.dataset.level;
const img = document.getElementById("levelImage");

if (level === "Beginner") {
  img.src = "/images/beginner.png";
} else if (level === "Intermediate") {
  img.src = "/images/intermediate.png";
} else {
  img.src = "/images/advanced.png";
}

/* 🎉 Party popper (first load only) */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    dx: (Math.random() - 0.5) * 6,
    dy: Math.random() * 4 + 2
  });
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random()*360},100%,70%)`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
  });
}

let frames = 0;
const interval = setInterval(() => {
  animateConfetti();
  frames++;
  if (frames > 60) {
    clearInterval(interval);
    canvas.remove();
  }
}, 16);
