const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const desktopQuery = window.matchMedia("(min-width: 1280px)");

function setExpanded(trigger, open) {
  trigger.setAttribute("aria-expanded", open ? "true" : "false");
}

function closeDropdowns() {
  document.querySelectorAll(".has-dropdown.is-open").forEach((item) => {
    item.classList.remove("is-open");
    const trigger = item.querySelector(".nav-link");
    if (trigger) setExpanded(trigger, false);
  });
}

function closeMenu() {
  nav.classList.remove("is-open");
  setExpanded(toggle, false);
  toggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("nav-open");
  closeDropdowns();
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  setExpanded(toggle, open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("nav-open", open);
  if (!open) closeDropdowns();
});

document.querySelectorAll(".has-dropdown > .nav-link").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (desktopQuery.matches) return;

    const item = trigger.parentElement;
    const willOpen = !item.classList.contains("is-open");
    closeDropdowns();

    if (willOpen) {
      item.classList.add("is-open");
      setExpanded(trigger, true);
    }
  });
});

desktopQuery.addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const markHeaderStuck = () => {
  header.classList.toggle("is-stuck", window.scrollY > 12);
};

markHeaderStuck();
window.addEventListener("scroll", markHeaderStuck, { passive: true });

const countdown = document.querySelector(".countdown-timer");

if (countdown) {
  const doorsOpen = new Date("2027-10-04T16:00:00Z");
  const values = {
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    minutes: countdown.querySelector('[data-unit="minutes"]'),
    seconds: countdown.querySelector('[data-unit="seconds"]'),
  };

  const pad = (value) => String(value).padStart(2, "0");

  const tick = () => {
    const remaining = Math.max(0, doorsOpen.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    values.days.textContent = String(days);
    values.hours.textContent = pad(hours);
    values.minutes.textContent = pad(minutes);
    values.seconds.textContent = pad(seconds);
  };

  tick();
  window.setInterval(tick, 1000);
}

document.querySelectorAll(".track-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".track-item");
    const open = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });
});
