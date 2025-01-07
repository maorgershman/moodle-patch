const fetchActualUrl = async (href) => {
  let res = null;
  let html = null;

  try {
    res = await fetch(href);
    html = await res.text();
  } catch (e) {
    return null;
  }

  // Search resource div
  let delim = `workaround">`;
  let index = html.indexOf(delim);
  if (index == -1) {
    return null;
  }
  index += delim.length;

  html = html.substring(index);
  delim = `</div>`;
  index = html.indexOf(delim);
  if (index == -1) {
    return null;
  }
  html = html.substring(0, index);

  // Search link
  delim = `<a href="`;
  index = html.indexOf(delim);
  if (index == -1) {
    return null;
  }
  index += delim.length;

  html = html.substring(index);
  delim = '"';
  index = html.indexOf(delim);
  html = html.substring(0, index);

  return html;
};

let lazy = false;

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("options", (data) => {
    if (!!data && "options" in data && "lazyPDFLoading" in data.options) {
      lazy = Boolean(data.options.lazyPDFLoading);
    }

    document.querySelectorAll("a").forEach(async (a) => {
      if (a.hasAttribute("target") || !a.hasAttribute("onclick")) {
        return;
      }

      a.setAttribute("target", "_blank");
      a.removeAttribute("onclick");

      const clone = a.cloneNode(true);
      if (a.classList.contains("aalink")) {
        if (lazy) {
          const eventListener = async (event) => {
            event.preventDefault();

            let url = await fetchActualUrl(a.href);
            if (url == null) {
              clone.removeEventListener("click", eventListener);
              url = a.href;
            }

            window.open(url, "_blank");
          };

          clone.addEventListener("click", eventListener);
        } else {
          const url = await fetchActualUrl(a.href);
          if (url != null) {
            clone.setAttribute("href", url);
          }
        }
      }

      a.parentNode.replaceChild(clone, a);
    });
  });
});
