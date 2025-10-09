document.getElementById("toggle").addEventListener("click", async () => {
  // get current tab
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];

  // inject scripts in the right order
  await browser.tabs.executeScript(tab.id, { file: "libs/compromise.min.js" });
  await browser.tabs.executeScript(tab.id, { file: "content.js" });
});

