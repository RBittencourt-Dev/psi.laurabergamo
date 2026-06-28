document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealGroups = [
    {
      selector: ".container-texto-home > *, #laura-foto-home",
      direction: "reveal-up",
    },
    {
      selector: "#session2 > div",
      direction: "reveal-up",
    },
    {
      selector: "#foto-laura-sobre",
      direction: "reveal-left",
    },
    {
      selector: ".container-sobre-mim > *",
      direction: "reveal-right",
    },
    {
      selector: ".container-texto-serviços > *",
      direction: "reveal-left",
    },
    {
      selector: ".cards",
      direction: "reveal-up",
    },
    {
      selector: "#lb-logo-branco, #Contato > div",
      direction: "reveal-up",
    },
  ];

  const revealItems = [];

  revealGroups.forEach(({ selector, direction }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal", direction);
      element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
      revealItems.push(element);
    });
  });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((element) => observer.observe(element));
});
