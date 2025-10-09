// Highlight meaningful words using Compromise
(() => {
  if (window.meaningfulActive) {
    console.log("Meaningful Highlighter: turning off.");
    document.body.classList.remove("meaningful-active");
    window.meaningfulActive = false;
    document.querySelectorAll(".meaningful-word, .dimmed-word").forEach(el => {
      el.replaceWith(document.createTextNode(el.textContent));
    });
    return;
  }

  window.meaningfulActive = true;
  document.body.classList.add("meaningful-active");
  console.log("Meaningful Highlighter: analyzing text...");

  const stopwords = new Set(["a", "an", "the", "and", "but", "or", "if", "to", "for", "of", "in", "on", "at", "from", "by", "as", "that", "this", "is", "was", "were", "be", "been", "being", "it", "its", "so", "then", "with", "about"]);

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (!text) return;

      const doc = nlp(text);
      const nouns = new Set(doc.nouns().out("array"));
      const verbs = new Set(doc.verbs().out("array"));
      const adjs  = new Set(doc.adjectives().out("array"));
      const advs  = new Set(doc.adverbs().out("array"));

      const words = text.split(/\b/);
      const span = document.createElement("span");

      words.forEach(word => {
        const clean = word.toLowerCase();
        const el = document.createElement("span");

        if (stopwords.has(clean) || !/[a-z]/i.test(clean)) {
          el.textContent = word;
          el.className = "dimmed-word";
        } else if (nouns.has(clean)) {
          el.textContent = word;
          el.className = "meaningful-word noun";
        } else if (verbs.has(clean)) {
          el.textContent = word;
          el.className = "meaningful-word verb";
        } else if (adjs.has(clean)) {
          el.textContent = word;
          el.className = "meaningful-word adj";
        } else if (advs.has(clean)) {
          el.textContent = word;
          el.className = "meaningful-word adv";
        } else {
          el.textContent = word;
        }
        span.appendChild(el);
      });

      node.replaceWith(span);
    } else if (node.nodeType === Node.ELEMENT_NODE && !["SCRIPT", "STYLE"].includes(node.tagName)) {
      node.childNodes.forEach(processNode);
    }
  }

  processNode(document.body);
})();

