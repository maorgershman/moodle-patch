if (typeof browser === "undefined") {
  var browser = chrome;
}

const OPTIONS_TEMPLATE = {
  lazyPDFLoading: false,
};
const options = {};

const lazy_pdf_toggler = document.getElementById("lazy-pdf-toggler");

chrome.storage.sync.get("options", (data) => {
  Object.assign(options, data?.options ?? OPTIONS_TEMPLATE);

  // init objects by 'options' value
  lazy_pdf_toggler.checked = Boolean(options.lazyPDFLoading);
});

lazy_pdf_toggler?.addEventListener("click", (event) => {
  const checked = event.target.checked;
  options.lazyPDFLoading = checked;
  browser?.storage.sync.set({ options });
});
