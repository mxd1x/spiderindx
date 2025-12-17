/* ===============================
   PAGE LOAD CINEMATIC (FIXED)
================================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.transition = "opacity 0.6s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 700);
  }, 1200);
});

/* ===============================
   CURSOR GLOW
================================ */
const glow = document.querySelector(".cursor-glow");
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

if (glow) {
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* ===============================
   NAV UNDERLINE PHYSICS
================================ */
const navLinks = document.querySelectorAll(".nav-link");
const underline = document.querySelector(".nav-underline");
const navWrap = document.querySelector(".nav-links");

if (underline && navWrap) {
  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const rect = link.getBoundingClientRect();
      const parentRect = navWrap.getBoundingClientRect();

      underline.style.width = rect.width + "px";
      underline.style.left = rect.left - parentRect.left + "px";
    });
  });

  navWrap.addEventListener("mouseleave", () => {
    underline.style.width = "0";
  });
}

/* ===============================
   SECTION REVEAL (FIXED — SINGLE OBSERVER)
================================ */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition =
          "opacity 0.9s cubic-bezier(.2,.8,.2,1), transform 0.9s cubic-bezier(.2,.8,.2,1)";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ===============================
   TILT PHYSICS
================================ */
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  });
});

/* ===============================
   BUTTON PRESS PHYSICS
================================ */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mousedown", () => {
    btn.style.transform = "scale(0.96)";
  });
  btn.addEventListener("mouseup", () => {
    btn.style.transform = "scale(1)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});

/* ===============================
   PARTICLE SYSTEM (CYAN)
================================ */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

const ctx = canvas.getContext("2d");
let w, h;
let particles = [];

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach(p => {
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 140) {
      p.x -= dx * 0.002;
      p.y -= dy * 0.002;
    }

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,245,255,0.4)";
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===============================
   SUBTLE GRID PARALLAX (SAFE)
================================ */
const grid = document.querySelector(".cyber-grid");
if (grid) {
  window.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    grid.style.transform = `translate(${x}px, ${y}px)`;
  });
}
/* ===============================
   CONTACT BUTTON FEEDBACK
================================ */
const sendBtn = document.querySelector(".send-btn");

if(sendBtn){
  sendBtn.addEventListener("click", e=>{
    e.preventDefault();
    sendBtn.innerText = "Sending...";
    setTimeout(()=>{
      sendBtn.innerText = "Message Sent ✓";
      sendBtn.style.background = "#00f5ff";
      sendBtn.style.color = "#000";
    },1200);
  });
}
