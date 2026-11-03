/*
 * Site search: "Found on <page>" rows for words in page text (2026-11-02).
 *
 * The search box (ninja-keys, from the al_search gem) only matches page titles
 * and summaries. This adds one row per page whose visible text contains what
 * the visitor typed, showing a snippet around the first match. Choosing a row
 * opens the page with a text fragment (#:~:text=word): Chrome, Edge, Safari
 * 16.1+ and Firefox 131+ scroll to the word and highlight it (styled in
 * _sass/_mossy.scss, ::target-text); other browsers just open the page.
 *
 * The text comes from assets/search-text.json, written at build time by
 * _plugins/search_text.rb and fetched on the first keystroke, not on page
 * load. Uses the ninja-keys public API only: the `data` property, the `change`
 * event and the `open()` method. If the index cannot load, search keeps
 * working on titles exactly as before.
 *
 * Also renames the research collection's group in the dropdown from
 * "Projects" (the collection's internal name) to "Research", matching the menu.
 */
(function () {
  "use strict";

  var ninja = document.querySelector("ninja-keys");
  var script = document.currentScript;
  if (!ninja || !script || !script.dataset.index) return;

  var INDEX_URL = script.dataset.index;
  var MIN_CHARS = 3; // shorter queries match too much text to be useful
  var MAX_PAGES = 8;
  // Characters of context around the match. Sized so a row fits the desktop
  // dropdown; on phones the row end is clipped, but the match stays visible
  // because it sits near the start.
  var SNIPPET_BEFORE = 20;
  var SNIPPET_AFTER = 36;
  var WORD_CHAR = /[\p{L}\p{N}'’]/u; // letters, digits, straight and curly apostrophes

  // The entries al_search built (this script is deferred, so they are set).
  var base = (ninja.data || []).map(function (action) {
    if (action.section !== "Projects") return action;
    return Object.assign({}, action, { section: "Research" });
  });
  ninja.data = base;

  var pages = null; // [{ url, title, text, lower }] once loaded
  var loading = null;
  var turn = 0; // drops results from a keystroke that a newer one superseded
  var shownKey = "";

  function loadIndex() {
    if (!loading) {
      loading = fetch(INDEX_URL)
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);
          return response.json();
        })
        .then(function (rows) {
          pages = rows.map(function (row) {
            return { url: row.url, title: row.title, text: row.text, lower: row.text.toLowerCase() };
          });
        })
        .catch(function (error) {
          pages = [];
          console.warn("[search-text] page text unavailable; search still matches titles.", error);
        });
    }
    return loading;
  }

  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // encodeURIComponent leaves "-" alone, but in a text fragment it is syntax.
  function encodeFragmentText(value) {
    return encodeURIComponent(value).replace(/-/g, "%2D");
  }

  function makeRow(page, at, length) {
    var text = page.text;

    var start = Math.max(0, at - SNIPPET_BEFORE);
    if (start > 0) {
      var nextSpace = text.indexOf(" ", start);
      if (nextSpace !== -1 && nextSpace < at) start = nextSpace + 1;
    }
    var end = Math.min(text.length, at + length + SNIPPET_AFTER);
    if (end < text.length) {
      var lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace > at + length) end = lastSpace;
    }
    var snippet = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");

    // Text fragments only match whole words, so widen "wre" to "wrens".
    var wordStart = at;
    while (wordStart > 0 && WORD_CHAR.test(text.charAt(wordStart - 1))) wordStart--;
    var wordEnd = at + length;
    while (wordEnd < text.length && WORD_CHAR.test(text.charAt(wordEnd))) wordEnd++;
    var phrase = text.slice(wordStart, wordEnd);

    // ?q= makes it a full page load even when the match is on the current
    // page; browsers ignore text fragments on same-page jumps.
    var target = page.url + "?q=" + encodeURIComponent(phrase) + "#:~:text=" + encodeFragmentText(phrase);

    return {
      id: "text-" + page.url,
      title: escapeHtml(snippet),
      description: "",
      section: "Found on " + page.title,
      handler: function () {
        window.location.href = target;
      },
    };
  }

  function findRows(query) {
    var needle = query.toLowerCase();
    var rows = [];
    for (var i = 0; i < pages.length && rows.length < MAX_PAGES; i++) {
      var at = pages[i].lower.indexOf(needle);
      if (at !== -1) rows.push(makeRow(pages[i], at, needle.length));
    }
    return rows;
  }

  function show(rows) {
    var key = rows
      .map(function (row) {
        return row.id + "|" + row.title;
      })
      .join("\n");
    if (key === shownKey) return;
    shownKey = key;
    ninja.data = base.concat(rows);
  }

  ninja.addEventListener("change", function (event) {
    var query = ((event.detail && event.detail.search) || "").trim();
    var mine = ++turn;
    if (query.length < MIN_CHARS) {
      show([]);
      return;
    }
    loadIndex().then(function () {
      if (mine === turn) show(findRows(query));
    });
  });

  // Reopening the box starts with an empty query, which lists every entry, so
  // clear the previous search's text rows first. Wraps the public open()
  // method, which the search icon, Ctrl+K and the site all go through.
  customElements.whenDefined("ninja-keys").then(function () {
    var open = ninja.open;
    if (typeof open !== "function") return;
    ninja.open = function () {
      turn++;
      show([]);
      return open.apply(ninja, arguments);
    };
  });
})();
