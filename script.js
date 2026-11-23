const EMAIL = "david.kyalo@email.com";

const projects = [
  {
    num: "01",
    type: "Infrastructure",
    title: "Cloud Platform Re-architecture",
    description: "Rebuilt a monolithic deployment stack into a resilient, observable platform designed for independent delivery.",
    result: "↓ 42% cloud spend",
    tags: ["AWS", "Terraform", "Kubernetes", "Grafana"],
    tone: "lime",
    icon: "server",
  },
  {
    num: "02",
    type: "Software",
    title: "Internal Developer Portal",
    description: "Created a self-service platform that standardized service scaffolding, ownership, and deployment workflows.",
    result: "3× faster onboarding",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    tone: "orange",
    icon: "code",
  },
  {
    num: "03",
    type: "Automation",
    title: "Zero-Touch Fleet Management",
    description: "Automated configuration, patching, and compliance reporting across a distributed Linux server estate.",
    result: "860+ nodes managed",
    tags: ["Ansible", "Python", "Linux", "Prometheus"],
    tone: "blue",
    icon: "terminal",
  },
  {
    num: "04",
    type: "Software",
    title: "Incident Intelligence Engine",
    description: "Built an event correlation service that enriches alerts and routes incidents to the right team in seconds.",
    result: "↓ 61% MTTR",
    tags: ["Go", "Kafka", "Redis", "OpenTelemetry"],
    tone: "violet",
    icon: "code",
  },
];

const icons = {
  server: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="8" x="2" y="3" rx="2"></rect><rect width="20" height="8" x="2" y="13" rx="2"></rect><path d="M6 7h.01M6 17h.01"></path></svg>',
  code: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 9-4 3 4 3"></path><path d="m16 9 4 3-4 3"></path><path d="m14 5-4 14"></path></svg>',
  terminal: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 17 6-6-6-6"></path><path d="M12 19h8"></path></svg>',
};

const projectList = document.querySelector("[data-projects]");
let filter = "All";

function renderProjects() {
  const visible = filter === "All" ? projects : projects.filter((project) => project.type === filter);
  projectList.replaceChildren(
    ...visible.map((project) => {
      const article = document.createElement("article");
      article.className = "project-card group bg-[#f2f0e9] p-6 sm:p-9";
      article.innerHTML = `
        <div class="mb-16 flex items-start justify-between">
          <span class="font-mono text-sm text-[#656c68]">${project.num} / ${project.type.toUpperCase()}</span>
          <span class="project-mark mark-${project.tone}" aria-hidden="true">${icons[project.icon]}</span>
        </div>
        <h3 class="max-w-lg font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">${project.title}</h3>
        <p class="mt-5 max-w-xl text-base leading-7 text-[#59605c]">${project.description}</p>
        <div class="mt-10 flex items-center justify-between gap-5 border-t border-[#c9cbc4] pt-5">
          <div class="flex flex-wrap gap-2">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          <strong class="shrink-0 text-sm">${project.result}</strong>
        </div>`;
      return article;
    })
  );
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("filter-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    renderProjects();
  });
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const menuIcon = menuToggle.querySelector("[data-icon='menu']");
const closeIcon = menuToggle.querySelector("[data-icon='close']");

function setMenu(open) {
  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuIcon.hidden = open;
  closeIcon.hidden = !open;
}

menuToggle.addEventListener("click", () => setMenu(mobileNav.hidden));
document.querySelectorAll("[data-close-menu]").forEach((node) => {
  node.addEventListener("click", () => setMenu(false));
});

const contact = document.querySelector("[data-contact]");
const dialog = contact.querySelector("[role='dialog']");
const closeContact = contact.querySelector("[data-close-contact]");
let contactTrigger = null;

function openContact() {
  contactTrigger = document.activeElement;
  contact.hidden = false;
  document.body.style.overflow = "hidden";
  closeContact.focus();
}

function closeContactDialog() {
  contact.hidden = true;
  document.body.style.overflow = "";
  contactTrigger?.focus();
}

document.querySelectorAll("[data-open-contact]").forEach((button) => {
  button.addEventListener("click", openContact);
});
closeContact.addEventListener("click", closeContactDialog);
contact.addEventListener("mousedown", (event) => {
  if (event.target === contact) closeContactDialog();
});
document.addEventListener("keydown", (event) => {
  if (contact.hidden) return;
  if (event.key === "Escape") closeContactDialog();
  if (event.key !== "Tab") return;
  const nodes = [...dialog.querySelectorAll("button, a[href]")];
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.querySelector("[data-mailto]").href = `mailto:${EMAIL}`;
document.querySelector("[data-email-text]").textContent = EMAIL;

const copyButton = document.querySelector("[data-copy-email]");
const copyLabel = copyButton.querySelector("[data-copy-label]");
const copyIcon = copyButton.querySelector("[data-icon='copy']");
const checkIcon = copyButton.querySelector("[data-icon='check']");
let copyTimer = 0;

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyLabel.textContent = "Copied";
    copyIcon.hidden = true;
    checkIcon.hidden = false;
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
      copyLabel.textContent = "Email";
      copyIcon.hidden = false;
      checkIcon.hidden = true;
    }, 1800);
  } catch {
    window.location.href = `mailto:${EMAIL}`;
  }
});

renderProjects();
