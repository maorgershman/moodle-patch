if (typeof browser === "undefined") {
  var browser = chrome;
}

browser.declarativeNetRequest.updateDynamicRules({
  addRules: [
    {
      id: 1,
      priority: 1,
      action: {
        type: "modifyHeaders",
        responseHeaders: [
          {
            header: "content-disposition",
            operation: "remove",
          },
        ],
      },
      condition: {
        resourceTypes: ["main_frame", "sub_frame", "script"]
      },
    },
  ],
  removeRuleIds: [1],
});
