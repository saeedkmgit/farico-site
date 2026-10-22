(function () {
  var FEED_URL = "https://feeds.behold.so/yGyumOEH9GhlCaPaqwj4";
  var root = document.getElementById("insta");
  if (!root || !FEED_URL) return;
  var track = root.querySelector(".ig-track");

  function pick(p) {
    var s = p.sizes || {};
    return (s.medium && s.medium.mediaUrl) || (s.small && s.small.mediaUrl) ||
           p.thumbnailUrl || (p.mediaType !== "VIDEO" ? p.mediaUrl : "");
  }

  fetch(FEED_URL, { credentials: "omit" })
    .then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (d) {
      var posts = (Array.isArray(d) ? d : d.posts || []).slice(0, 12);
      posts.forEach(function (p) {
        var src = pick(p), link = p.permalink || "";
        if (!src || link.indexOf("https://www.instagram.com/") !== 0) return;
        var a = document.createElement("a");
        a.className = "ig-item tile"; a.href = link; a.target = "_blank"; a.rel = "noopener";
        var img = document.createElement("img");
        img.src = src; img.loading = "lazy"; img.decoding = "async"; img.width = 394; img.height = 700;
        img.alt = (p.prunedCaption || p.caption || "Farico on Instagram").slice(0, 120);
        a.appendChild(img);
        var t = (p.prunedCaption || p.caption || "").split("\n")[0].trim();
        if (t) { var c = document.createElement("span"); c.className = "ig-cap"; c.textContent = t.length > 48 ? t.slice(0, 46) + "…" : t; a.appendChild(c); }
        if (p.mediaType === "VIDEO") { var v = document.createElement("span"); v.className = "ig-play"; v.setAttribute("aria-hidden", "true"); a.appendChild(v); }
        track.appendChild(a);
      });
      if (track.children.length) root.classList.add("ready");
    })
    .catch(function () {});

  root.querySelectorAll(".ig-nav").forEach(function (b) {
    b.addEventListener("click", function () {
      track.scrollBy({ left: (b.dataset.dir === "next" ? 1 : -1) * track.clientWidth * 0.8, behavior: "smooth" });
    });
  });
})();
