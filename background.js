(browser || chrome).browserAction.onClicked.addListener((tab) => {
  (browser || chrome).tabs.executeScript(tab.id, {
    file: "libs/compromise.min.js"
  });
  (browser || chrome).tabs.executeScript(tab.id, {
    file: "content.js"
  });
});

