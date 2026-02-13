// ═══════════════════════════════════════════════════════════════
// Google Sheet: Set your Web App URL (from Apps Script deployment)
// then the form will POST to it and append emails to your sheet.
// ═══════════════════════════════════════════════════════════════
const GOOGLE_SCRIPT_URL = "YOUR_WEB_APP_URL_HERE";

const form = document.getElementById("email-form");
if (form) {
  if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("YOUR_")) {
    form.action = GOOGLE_SCRIPT_URL;
    form.method = "POST";
  }

  form.addEventListener("submit", (e) => {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_")) {
      e.preventDefault();
      const feedback = form.querySelector(".form-feedback");
      if (feedback) feedback.textContent = "Add your script URL to script.js";
    } else {
      const feedback = form.querySelector(".form-feedback");
      if (feedback) feedback.textContent = "Thanks for subscribing.";
      form.querySelector('input[name="email"]').value = "";
    }
  });
}

// Intersection Observer for scroll-triggered fade-in
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -8% 0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".gallery-item").forEach((item) => {
  observer.observe(item);
});
