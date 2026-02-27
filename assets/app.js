(function () {
  "use strict";

  setCurrentYear();

  var page = document.body ? document.body.getAttribute("data-page") : "";

  if (page === "changelog-list") {
    renderList("changelog");
    return;
  }

  if (page === "information-list") {
    renderList("information");
    return;
  }

  if (page === "router") {
    routeFrom404();
  }
})();

function setCurrentYear() {
  var yearNodes = document.querySelectorAll("[data-current-year]");
  var year = new Date().getFullYear();

  yearNodes.forEach(function (node) {
    node.textContent = String(year);
  });
}

async function renderList(section) {
  var root = document.getElementById("list-root");

  if (!root) {
    return;
  }

  try {
    var items = await fetchJson("/content/" + section + ".json");

    if (!Array.isArray(items)) {
      throw new Error("Content is not an array");
    }

    var sorted = section === "changelog"
      ? sortChangelog(items)
      : sortInformation(items);

    var cards = sorted
      .map(function (item) {
        return renderListCard(section, item);
      })
      .filter(Boolean)
      .join("");

    root.innerHTML = cards || '<p class="status">No entries yet.</p>';
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p class="status">Unable to load content right now.</p>';
  }
}

function sortChangelog(items) {
  return items.slice().sort(function (a, b) {
    var aTime = getSortableDate(a.date);
    var bTime = getSortableDate(b.date);

    if (aTime === null && bTime === null) {
      return safeString(a.title).localeCompare(safeString(b.title));
    }

    if (aTime === null) {
      return 1;
    }

    if (bTime === null) {
      return -1;
    }

    if (aTime !== bTime) {
      return bTime - aTime;
    }

    return safeString(a.title).localeCompare(safeString(b.title));
  });
}

function sortInformation(items) {
  return items.slice().sort(function (a, b) {
    return safeString(a.title).localeCompare(safeString(b.title), undefined, {
      sensitivity: "base"
    });
  });
}

function renderListCard(section, item) {
  if (!item || !item.slug) {
    return "";
  }

  var slug = String(item.slug);
  var title = escapeHtml(safeString(item.title) || "Untitled");
  var summary = escapeHtml(safeString(item.summary) || "Placeholder summary text.");
  var href = "/" + section + "/" + encodeURIComponent(slug);
  var dateHtml = item.date
    ? '<p class="item-meta">' + escapeHtml(formatDate(item.date)) + "</p>"
    : "";
  var tagsHtml = renderTags(item.tags);

  return [
    '<article class="item-card">',
    '<h2><a href="' + href + '">' + title + "</a></h2>",
    dateHtml,
    "<p>" + summary + "</p>",
    tagsHtml,
    "</article>"
  ].join("");
}

function renderTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return "";
  }

  var chips = tags
    .map(function (tag) {
      return '<span class="tag">' + escapeHtml(String(tag)) + "</span>";
    })
    .join("");

  return '<div class="tags" aria-label="Tags">' + chips + "</div>";
}

async function routeFrom404() {
  var path = normalizePath(window.location.pathname);

  if (path === "/changelog") {
    window.location.replace("/changelog/");
    return;
  }

  if (path === "/information") {
    window.location.replace("/information/");
    return;
  }

  try {
    var redirectTarget = await resolveShortRedirect(path);

    if (redirectTarget) {
      window.location.replace(redirectTarget);
      return;
    }

    var routeMatch = path.match(/^\/(changelog|information)\/([^/]+)$/);

    if (!routeMatch) {
      window.location.replace("/");
      return;
    }

    var section = routeMatch[1];
    var slug = decodeURIComponent(routeMatch[2]);
    var items = await fetchJson("/content/" + section + ".json");

    if (!Array.isArray(items)) {
      window.location.replace("/");
      return;
    }

    var match = items.find(function (entry) {
      return safeString(entry.slug) === slug;
    });

    if (!match) {
      window.location.replace("/");
      return;
    }

    renderDetail(section, match);
  } catch (error) {
    console.error(error);
    window.location.replace("/");
  }
}

async function resolveShortRedirect(path) {
  var key = path.replace(/^\/+|\/+$/g, "");

  if (!key || key.indexOf("/") !== -1) {
    return null;
  }

  var redirects = await fetchJson("/content/redirects.json");

  if (!redirects || typeof redirects !== "object") {
    return null;
  }

  var target = redirects[key];

  if (typeof target === "string" && target.trim() !== "") {
    return target;
  }

  return null;
}

function renderDetail(section, item) {
  var root = document.getElementById("router-root");

  if (!root) {
    return;
  }

  var sectionTitle = section === "changelog" ? "Changelog" : "Information";
  var backHref = section === "changelog" ? "/changelog/" : "/information/";
  var title = safeString(item.title) || "Untitled";
  var dateHtml = item.date
    ? '<p class="item-meta">' + escapeHtml(formatDate(item.date)) + "</p>"
    : "";
  var tagsHtml = renderTags(item.tags);
  var bodyHtml = formatBody(item.body);

  root.innerHTML = [
    '<article class="detail-view">',
    "<h1>" + escapeHtml(title) + "</h1>",
    dateHtml,
    tagsHtml,
    '<div class="detail-body">' + bodyHtml + "</div>",
    '<a class="back-link" href="' + backHref + '">Back to ' + sectionTitle + "</a>",
    "</article>"
  ].join("");

  document.title = title + " | GTA:PS";
}

function formatBody(body) {
  var text = safeString(body);

  if (!text) {
    return "<p>Placeholder body text.</p>";
  }

  if (looksLikeHtml(text)) {
    return text;
  }

  return "<p>" + escapeHtml(text).replace(/\n/g, "<br>") + "</p>";
}

function looksLikeHtml(text) {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

function normalizePath(pathname) {
  var normalized = pathname.replace(/\/{2,}/g, "/");

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

function getSortableDate(dateString) {
  if (!dateString) {
    return null;
  }

  var timestamp = Date.parse(dateString);

  return Number.isNaN(timestamp) ? null : timestamp;
}

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  var isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);

  if (isoDateMatch) {
    var year = Number(isoDateMatch[1]);
    var month = Number(isoDateMatch[2]) - 1;
    var day = Number(isoDateMatch[3]);
    var manualDate = new Date(year, month, day);

    return manualDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  var parsed = new Date(dateString);

  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function fetchJson(path) {
  return fetch(path, { cache: "no-store" }).then(function (response) {
    if (!response.ok) {
      throw new Error("Request failed for " + path + " (" + response.status + ")");
    }

    return response.json();
  });
}

function escapeHtml(value) {
  return safeString(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeString(value) {
  return value == null ? "" : String(value);
}
