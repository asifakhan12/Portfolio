/* =========================================================
   EDIT YOUR CONTENT HERE
   Sab projects aur certifications isi jagah se control hote
   hain — HTML/CSS chhedne ki zaroorat nahi.

   Har project object me:
   - image:    "assets/projects/your-file.png"  (screenshot ya GIF)
   - embedUrl: Power BI "Publish to web" wala public iframe link
               (sirf tab use karein jab data sensitive na ho)
   - featured: true karne se card bada aur alag style me dikhta hai
               (competition-winning dashboard ke liye use ho raha hai)
   Agar image aur embedUrl dono empty chhod dein, card ek
   stylised placeholder dikhayega jab tak aap screenshot na daalein.
   ========================================================= */

const PROJECTS = [
  {
    title: "Currency Exchange Analysis Dashboard",
    description:
      "Competition-winning dashboard with live exchange rate data pulled via API and automated Power Query refresh. DAX measures calculate conversion trends for real-time decision-making.",
    tags: ["Power BI", "API", "Power Query", "DAX"],
    image: "assets/projects/currency-exchange.png",
    embedUrl: "",
    featured: true,
    featuredLabel: "🏆 Competition Winner · Live API Integration",
  },
  {
    title: "Mobile Sales Dashboard",
    description:
      "Tracks sales, transactions and average price across mobile models, brands and payment methods, with month-by-month trend charts for the sales team.",
    tags: ["Power BI", "DAX", "Data Visualization"],
    image: "assets/projects/mobile-sales.png",
    embedUrl: "",
  },
  {
    title: "HR Analytics Dashboard",
    description:
      "Gives HR a single view of headcount, attrition and job satisfaction — broken down by age, department, role and education field — to spot where people are leaving and why.",
    tags: ["Power BI", "DAX", "HR Analytics"],
    image: "assets/projects/hr-analytics.png",
    embedUrl: "",
  },
  {
    title: "Amazon Product Sales Dashboard",
    description:
      "Explores product performance across categories — pricing, discounts, ratings and reviews — to surface which categories and discount bands actually drive sales.",
    tags: ["Power BI", "DAX", "E-Commerce Analytics"],
    image: "assets/projects/amazon-sales.png",
    embedUrl: "",
  },
  {
    title: "Regulatory Studies Exception Monitoring Dashboard",
    description:
      "Added an Exception Table with DAX measures that flags records where the Study Award Date precedes the PSV Date — catching data-entry errors before they reach reporting.",
    tags: ["Power BI", "Excel", "DAX", "Data Quality"],
    image: "",
    embedUrl: "",
  },
];

/* Contact form delivery.
   Step 1 (do this): go to https://formspree.io, sign up free, create a
   form, and paste the endpoint it gives you below — it looks like
   "https://formspree.io/f/abcdwxyz". Once set, messages land straight
   in your inbox and the form shows a real success message.
   Until you set it, the form falls back to opening the visitor's own
   email app with the message pre-filled — it still reaches you, but
   needs the visitor to hit "send" in their own mail app. */
const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"
const YOUR_EMAIL = "ak6251962@gmail.com";

const CERTIFICATIONS = [
  "Introduction to Power BI — DataCamp",
  "Advanced Excel Functions — DataCamp",
  "Data Modeling — SQLBI",
  "Data Integrations — HubSpot",
  "Programming in Python — Meta",
  "Git and GitHub — IBM",
  "Introduction to DAX in Power BI — DataCamp",
  "Data Preparation in Power BI — DataCamp",
  "Report Design in Power BI — DataCamp",
  "Data Analytics and Business Intelligence — DigiSkills",
  "Communication and Soft Skills — DigiSkills",
  "AI for Data Analyst — Google",
];

/* =========================================================
   RENDER: PROJECTS
   ========================================================= */
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    let thumb;
    if (p.image) {
      thumb = `<img src="${p.image}" alt="${p.title} screenshot" loading="lazy" />`;
    } else if (p.embedUrl) {
      thumb = `<div class="thumb-placeholder">${barsSVG(i)}</div><span class="thumb-badge">Live embed</span>`;
    } else {
      thumb = `<div class="thumb-placeholder">${barsSVG(i)}</div><span class="thumb-badge">Add screenshot</span>`;
    }

    const featuredClass = p.featured ? " project-card-featured" : "";
    const ribbon = p.featured && p.featuredLabel
      ? `<span class="featured-ribbon">${p.featuredLabel}</span>`
      : "";

    return `
      <article class="project-card${featuredClass}" data-reveal data-index="${i}" tabindex="0" role="button"
                aria-label="View details for ${p.title}">
        <div class="project-thumb">${ribbon}${thumb}</div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <ul class="tag-list">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          <span class="project-link">${p.embedUrl ? "View live dashboard" : "View details"}</span>
        </div>
      </article>`;
  }).join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(PROJECTS[card.dataset.index]));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(PROJECTS[card.dataset.index]);
      }
    });
  });

  initReveal(); // newly injected cards need observing
}

/* small abstract bar-chart placeholder, deterministic per card */
function barsSVG(seed) {
  const heights = [55, 80, 40, 95, 65, 30].map(
    (h, i) => ((h + seed * 13 + i * 7) % 70) + 25
  );
  return heights
    .map((h) => `<div class="thumb-bar" style="height:${h}%"></div>`)
    .join("");
}

/* =========================================================
   RENDER: CERTIFICATIONS
   ========================================================= */
function renderCertifications() {
  const list = document.getElementById("cert-list");
  if (!list) return;
  list.innerHTML = CERTIFICATIONS.map((c) => `<li>${c}</li>`).join("");
}

/* =========================================================
   LIGHTBOX
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxMedia = document.getElementById("lightbox-media");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const lightboxTags = document.getElementById("lightbox-tags");

function openLightbox(project) {
  lightboxTitle.textContent = project.title;
  lightboxDesc.textContent = project.description;
  lightboxTags.innerHTML = project.tags.map((t) => `<li>${t}</li>`).join("");

  if (project.embedUrl) {
    lightboxMedia.innerHTML = `<iframe src="${project.embedUrl}" title="${project.title}" allowfullscreen></iframe>`;
  } else if (project.image) {
    lightboxMedia.innerHTML = `<img src="${project.image}" alt="${project.title}" />`;
  } else {
    lightboxMedia.innerHTML = `<div class="thumb-placeholder" style="height:100%;padding:2rem">${barsSVG(
      project.title.length
    )}</div>`;
  }

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxMedia.innerHTML = "";
  document.body.style.overflow = "";
}

lightbox?.addEventListener("click", (e) => {
  if (e.target.matches("[data-close]")) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* =========================================================
   KPI COUNT-UP
   ========================================================= */
function animateCounters() {
  document.querySelectorAll("[data-count-to]").forEach((el) => {
    const target = parseInt(el.dataset.countTo, 10);
    let started = false;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const duration = 900;
            const start = performance.now();
            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * target);
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
  });
}

/* =========================================================
   SCROLL REVEAL
   ========================================================= */
function initReveal() {
  const items = document.querySelectorAll("[data-reveal]:not(.in-view)");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          entry.target.style.setProperty("--reveal-delay", delay);
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item) => obs.observe(item));
}

/* =========================================================
   BOTTOM TAB NAV — active state on scroll
   ========================================================= */
function initTabNav() {
  const tabs = document.querySelectorAll(".report-tabs a");
  const sections = Array.from(tabs)
    .map((t) => document.getElementById(t.dataset.tab))
    .filter(Boolean);

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const tab = document.querySelector(
          `.report-tabs a[data-tab="${entry.target.id}"]`
        );
        if (!tab) return;
        if (entry.isIntersecting) {
          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((s) => obs.observe(s));
}

/* =========================================================
   CONTACT FORM
   ========================================================= */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (FORMSPREE_ENDPOINT) {
      status.textContent = "Sending…";
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (res.ok) {
          status.textContent = "Thanks — your message is on its way!";
          form.reset();
        } else {
          throw new Error("Formspree responded with an error");
        }
      } catch (err) {
        status.textContent =
          "Couldn't send automatically — opening your email app instead.";
        openMailFallback(name, email, message);
      }
    } else {
      status.textContent = "Opening your email app to send this…";
      openMailFallback(name, email, message);
    }
  });
}

function openMailFallback(name, email, message) {
  const subject = encodeURIComponent(`Portfolio contact from ${name || "a visitor"}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderCertifications();
  initReveal();
  animateCounters();
  initTabNav();
  initContactForm();

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
