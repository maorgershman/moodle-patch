window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((a) => {
    if (a.hasAttribute("target") || !a.hasAttribute("onclick")) {
      return;
    }

    a.setAttribute("target", "_blank");
    a.removeAttribute("onclick");
    a.parentNode.replaceChild(a.cloneNode(true), a);
  });
});
