/* ==========================================
   DISABLE RIGHT CLICK
========================================== */

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

const siteIntro = document.getElementById("siteIntro");

if (siteIntro) {
  /*
   * Check if user has already
   * seen the intro
   */

  const introAlreadySeen = localStorage.getItem("ezioIntroSeen");

  if (introAlreadySeen === "true") {
    /*
     * Already seen:
     * Don't show intro
     */

    siteIntro.remove();
  } else {
    /*
     * First visit:
     * Show intro
     */

    const introTimer = setTimeout(() => {
      siteIntro.classList.add("hide");

      /*
       * Remember that intro
       * has been shown
       */

      localStorage.setItem("ezioIntroSeen", "true");

      /*
       * Remove intro after
       * fade animation
       */

      setTimeout(() => {
        siteIntro.remove();
      }, 850);
    }, 3000);

    /*
     * Safety cleanup
     */

    window.addEventListener(
      "pagehide",
      () => {
        clearTimeout(introTimer);
      },
      { once: true },
    );
  }
}

const $ = (s) => document.querySelector(s);
const theme = $("#themeToggle"),
  menu = $("#menuToggle"),
  links = $("#navMenu");
if (localStorage.getItem("ezio-theme") === "dark")
  document.documentElement.dataset.theme = "dark";
function icon() {
  if (theme)
    theme.innerHTML =
      document.documentElement.dataset.theme === "dark"
        ? '<i class="ri-sun-line"></i>'
        : '<i class="ri-moon-line"></i>';
}
icon();
theme?.addEventListener("click", () => {
  if (document.documentElement.dataset.theme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("ezio-theme", "light");
  } else {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("ezio-theme", "dark");
  }
  icon();
});
menu?.addEventListener("click", () => {
  links.classList.toggle("open");
  menu.innerHTML = links.classList.contains("open")
    ? '<i class="ri-close-line"></i>'
    : '<i class="ri-menu-3-line"></i>';
});
links
  ?.querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open")),
  );
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".links a").forEach((a) => {
  if (a.getAttribute("href") === current) a.classList.add("active");
});
const obs = new IntersectionObserver(
  (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((e) => obs.observe(e));
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
window.showToast = showToast;

/* ==========================================
   HAPPY CLIENTS SLIDER
========================================== */

const testimonialTrack = document.getElementById("testimonialTrack");

const testimonialPrev = document.getElementById("testimonialPrev");

const testimonialNext = document.getElementById("testimonialNext");

const testimonialDots = document.getElementById("testimonialDots");

if (testimonialTrack && testimonialPrev && testimonialNext) {
  const testimonialCards =
    testimonialTrack.querySelectorAll(".testimonial-card");

  let testimonialIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 650) {
      return 1;
    }

    if (window.innerWidth <= 950) {
      return 2;
    }

    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, testimonialCards.length - getVisibleCards());
  }

  function updateTestimonials() {
    const visible = getVisibleCards();

    const cardWidth = testimonialCards[0].offsetWidth;

    const gap = 18;

    testimonialTrack.style.transform = `translateX(-${
      testimonialIndex * (cardWidth + gap)
    }px`;

    updateDots();
  }

  function createDots() {
    if (!testimonialDots) return;

    testimonialDots.innerHTML = "";

    const max = getMaxIndex();

    for (let i = 0; i <= max; i++) {
      const dot = document.createElement("button");

      dot.className = "testimonial-dot";

      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);

      dot.addEventListener("click", () => {
        testimonialIndex = i;

        updateTestimonials();
      });

      testimonialDots.appendChild(dot);
    }

    updateDots();
  }

  function updateDots() {
    if (!testimonialDots) return;

    const dots = testimonialDots.querySelectorAll(".testimonial-dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === testimonialIndex);
    });
  }

  testimonialNext.addEventListener("click", function () {
    const max = getMaxIndex();

    if (testimonialIndex >= max) {
      testimonialIndex = 0;
    } else {
      testimonialIndex++;
    }

    updateTestimonials();
  });

  testimonialPrev.addEventListener("click", function () {
    const max = getMaxIndex();

    if (testimonialIndex <= 0) {
      testimonialIndex = max;
    } else {
      testimonialIndex--;
    }

    updateTestimonials();
  });

  /* AUTO SLIDE */

  let testimonialAuto = setInterval(function () {
    const max = getMaxIndex();

    if (testimonialIndex >= max) {
      testimonialIndex = 0;
    } else {
      testimonialIndex++;
    }

    updateTestimonials();
  }, 4500);

  /* Pause while hovering */

  testimonialTrack.addEventListener("mouseenter", function () {
    clearInterval(testimonialAuto);
  });

  testimonialTrack.addEventListener("mouseleave", function () {
    testimonialAuto = setInterval(function () {
      const max = getMaxIndex();

      if (testimonialIndex >= max) {
        testimonialIndex = 0;
      } else {
        testimonialIndex++;
      }

      updateTestimonials();
    }, 4500);
  });

  window.addEventListener("resize", function () {
    testimonialIndex = Math.min(testimonialIndex, getMaxIndex());

    createDots();

    updateTestimonials();
  });

  createDots();

  updateTestimonials();
}
/* =========================================================
   EZIO INFOTECH
   BLOG DETAIL JAVASCRIPT
========================================================= */

/* =========================================================
   READING PROGRESS
========================================================= */

const readingBar = document.getElementById("readingProgressBar");

function updateReadingProgress() {
  if (!readingBar) return;

  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (documentHeight <= 0) {
    readingBar.style.width = "0%";

    return;
  }

  const progress = (scrollTop / documentHeight) * 100;

  readingBar.style.width = Math.min(progress, 100) + "%";
}

window.addEventListener("scroll", updateReadingProgress);

updateReadingProgress();

/* =========================================================
   CAPTCHA
========================================================= */

const captchaCode = document.getElementById("captchaCode");

const refreshCaptcha = document.getElementById("refreshCaptcha");

const captchaInput = document.getElementById("captchaInput");

let currentCaptcha = "";

function generateCaptcha() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let result = "";

  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  currentCaptcha = result;

  if (captchaCode) {
    captchaCode.textContent = result;
  }

  if (captchaInput) {
    captchaInput.value = "";
  }
}

refreshCaptcha?.addEventListener("click", generateCaptcha);

generateCaptcha();

/* =========================================================
   COMMENT STORAGE
========================================================= */

const COMMENTS_KEY = "ezio_infotech_blog_comments";

const commentsList = document.getElementById("commentsList");

const commentCount = document.getElementById("commentCount");

function getComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENTS_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

/* =========================================================
   INITIAL DEMO COMMENTS
========================================================= */

function createDefaultComments() {
  const existing = localStorage.getItem(COMMENTS_KEY);

  if (existing !== null) {
    return;
  }

  const defaultComments = [
    {
      name: "Amit Patil",

      email: "amit@example.com",

      message:
        "Really liked the way you explained the importance of simplicity in digital products.",

      date: "August 30, 2026",
    },

    {
      name: "Neha Sharma",

      email: "neha@example.com",

      message:
        "Great insights. User experience should definitely be considered from the beginning of a project.",

      date: "August 29, 2026",
    },
  ];

  saveComments(defaultComments);
}

createDefaultComments();

/* =========================================================
   GET INITIALS
========================================================= */

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments() {
  if (!commentsList) return;

  const comments = getComments();

  commentsList.innerHTML = "";

  if (commentCount) {
    commentCount.textContent = comments.length;
  }

  if (comments.length === 0) {
    commentsList.innerHTML = `

            <div class="no-comments">

                <i class="ri-chat-3-line"></i>

                <br><br>

                Be the first person
                to leave a comment.

            </div>

        `;

    return;
  }

  comments
    .slice()
    .reverse()
    .forEach((comment) => {
      const item = document.createElement("article");

      item.className = "comment-item";

      item.innerHTML = `

                <div class="comment-top">

                    <div class="comment-user">

                        <div class="comment-avatar">

                            ${escapeHTML(getInitials(comment.name))}

                        </div>


                        <div>

                            <strong>

                                ${escapeHTML(comment.name)}

                            </strong>


                            <span class="comment-date">

                                ${escapeHTML(comment.date)}

                            </span>

                        </div>

                    </div>

                </div>


                <p class="comment-text">

                    ${escapeHTML(comment.message)}

                </p>

            `;

      commentsList.appendChild(item);
    });
}

renderComments();

/* =========================================================
   FORM
========================================================= */

const commentForm = document.getElementById("commentForm");

const nameInput = document.getElementById("commentName");

const emailInput = document.getElementById("commentEmail");

const messageInput = document.getElementById("commentMessage");

/* =========================================================
   ERROR HELPERS
========================================================= */

function setError(elementId, message) {
  const element = document.getElementById(elementId);

  if (element) {
    element.textContent = message;
  }
}

function clearErrors() {
  setError("nameError", "");

  setError("emailError", "");

  setError("messageError", "");

  setError("captchaError", "");
}

/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================================================
   SUBMIT COMMENT
========================================================= */

commentForm?.addEventListener("submit", function (event) {
  event.preventDefault();

  clearErrors();

  const name = nameInput.value.trim();

  const email = emailInput.value.trim();

  const message = messageInput.value.trim();

  const captcha = captchaInput.value.trim().toUpperCase();

  let valid = true;

  /* NAME */

  if (name.length < 2) {
    setError("nameError", "Please enter your name.");

    valid = false;
  }

  /* EMAIL */

  if (!isValidEmail(email)) {
    setError("emailError", "Please enter a valid email.");

    valid = false;
  }

  /* MESSAGE */

  if (message.length < 5) {
    setError("messageError", "Please write a comment.");

    valid = false;
  }

  /* CAPTCHA */

  if (captcha === "" || captcha !== currentCaptcha) {
    setError("captchaError", "Incorrect CAPTCHA code.");

    valid = false;
  }

  if (!valid) {
    return;
  }

  /* CREATE COMMENT */

  const comments = getComments();

  const newComment = {
    name: name,

    email: email,

    message: message,

    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };

  comments.push(newComment);

  saveComments(comments);

  /* RESET */

  commentForm.reset();

  generateCaptcha();

  renderComments();

  /* SCROLL TO NEW COMMENTS */

  document.getElementById("comments")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  showCommentToast("Your comment has been posted!");
});

/* =========================================================
   TOAST
========================================================= */

function showCommentToast(message) {
  const toast = document.createElement("div");

  toast.className = "comment-toast";

  toast.textContent = message;

  Object.assign(toast.style, {
    position: "fixed",

    right: "20px",

    bottom: "20px",

    zIndex: "10000",

    padding: "13px 18px",

    borderRadius: "12px",

    background: "var(--text)",

    color: "var(--bg)",

    fontSize: "12px",

    fontWeight: "700",

    boxShadow: "0 15px 40px rgba(0,0,0,.2)",
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* =========================================================
   COPY BLOG LINK
========================================================= */

function copyBlogLink() {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      showCommentToast("Article link copied!");
    })
    .catch(() => {
      showCommentToast("Unable to copy link.");
    });
}

/* =====================================================
   TEAM IMAGE SLIDER
===================================================== */

const teamSlides = document.querySelectorAll(".team-slide");

const teamNext = document.getElementById("teamNext");

const teamPrev = document.getElementById("teamPrev");

let currentTeamSlide = 0;

let teamIsAnimating = false;

/* =====================================================
   SHOW SLIDE
===================================================== */

function showTeamSlide(newIndex, direction = "next") {
  if (teamIsAnimating || !teamSlides.length) {
    return;
  }

  teamIsAnimating = true;

  const currentSlide = teamSlides[currentTeamSlide];

  let nextIndex = newIndex;

  if (nextIndex < 0) {
    nextIndex = teamSlides.length - 1;
  }

  if (nextIndex >= teamSlides.length) {
    nextIndex = 0;
  }

  const nextSlide = teamSlides[nextIndex];

  /* Remove old classes */

  teamSlides.forEach((slide) => {
    slide.classList.remove("active", "slide-next", "slide-prev");
  });

  /* Prepare new slide */

  nextSlide.classList.add(direction === "next" ? "slide-next" : "slide-prev");

  nextSlide.classList.add("active");

  currentTeamSlide = nextIndex;

  setTimeout(() => {
    teamIsAnimating = false;
  }, 650);
}

/* =====================================================
   NEXT
===================================================== */

function nextTeamSlide() {
  showTeamSlide(currentTeamSlide + 1, "next");
}

/* =====================================================
   PREVIOUS
===================================================== */

function previousTeamSlide() {
  showTeamSlide(currentTeamSlide - 1, "prev");
}

/* =====================================================
   BUTTON EVENTS
===================================================== */

teamNext?.addEventListener("click", nextTeamSlide);

teamPrev?.addEventListener("click", previousTeamSlide);

/* =====================================================
   AUTO SLIDE
===================================================== */

let teamAutoSlide = setInterval(nextTeamSlide, 3000);

/* =====================================================
   RESET AUTO SLIDE
   After manual click
===================================================== */

function resetTeamAutoSlide() {
  clearInterval(teamAutoSlide);

  teamAutoSlide = setInterval(nextTeamSlide, 3000);
}

teamNext?.addEventListener("click", resetTeamAutoSlide);

teamPrev?.addEventListener("click", resetTeamAutoSlide);
