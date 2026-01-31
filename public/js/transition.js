document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page-content");
  if (!page) return;

  function go(url) {
    page.classList.add("leaving");
    setTimeout(() => {
      window.location.href = url;
    }, 200);
  }

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (
        link.target === "_blank" ||
        link.href.includes("#") ||
        link.href.startsWith("mailto:")
      )
        return;

      e.preventDefault();
      go(link.href);
    });
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      page.classList.add("leaving");
    });
  });

  page.classList.remove("leaving");
});
