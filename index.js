// ── Hamburger / Sidebar ──
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  sidebar.classList.toggle("mobile-open");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  hamburger.classList.remove("open");
  sidebar.classList.remove("mobile-open");
  overlay.classList.remove("active");
});

// Close sidebar on nav link click (mobile)
document.querySelectorAll(".sidebar-nav a").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");
  });
});

// ── Active nav on scroll ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".sidebar-nav a[data-section]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(
          `.sidebar-nav a[data-section="${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((s) => observer.observe(s));

// ── Fade in on scroll ──
const fades = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        fadeObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
fades.forEach((f) => fadeObserver.observe(f));

// ── Portfolio Filter ──
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioGrid = document.getElementById("portfolio-grid");

function updatePortfolioLayout(items) {
  portfolioGrid.innerHTML = "";

  items.forEach((item) => {
    portfolioGrid.appendChild(item.cloneNode(true));
  });

  const screenWidth = portfolioGrid.parentElement.offsetWidth;

  const columnsNeeded = Math.ceil(items.length / 2);

  const requiredWidth = columnsNeeded * 300;

  portfolioGrid.classList.remove("auto-scroll", "normal-grid");

  if (requiredWidth > screenWidth) {
    items.forEach((item) => {
      portfolioGrid.appendChild(item.cloneNode(true));
    });

    portfolioGrid.classList.add("auto-scroll");
  } else {
    portfolioGrid.classList.add("normal-grid");
  }
}
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    let items = [...portfolioItems];

    if (filter !== "all") {
      items = items.filter(
        (item) => item.dataset.category === filter
      );
    }

    updatePortfolioLayout(items);
  });
});

// ── Lightbox ──
function openLightbox(el) {
  const img = el.querySelector("img");
  document.getElementById("lightbox-img").src = img.src;
  document.getElementById("lightbox-img").alt = img.alt;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ── Contact Form ──
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".submit-btn");
  btn.textContent = "✓ Message Sent!";
  btn.style.background = "#22c55e";
  btn.style.color = "white";
  setTimeout(() => {
    btn.textContent = "Send Message →";
    btn.style.background = "";
    btn.style.color = "";
    e.target.reset();
  }, 3000);
}

window.addEventListener('load',()=>{

    updatePortfolioLayout(
        [...portfolioItems]
    );

});