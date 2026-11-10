/**
 * ZZPDesk bootstrap — GSC meta, analytics stub, affiliate-status in disclosure.
 * Laadt niets extern zolang *_PENDING / provider "none".
 */
(function () {
  var cfg = window.ZZPDESK_CONFIG;
  if (!cfg) return;

  function isPending(value, token) {
    if (!value || typeof value !== "string") return true;
    var v = value.trim();
    if (!v) return true;
    if (token && v === token) return true;
    if (/_PENDING$/i.test(v)) return true;
    return false;
  }

  function injectGsc() {
    var code = cfg.GSC_VERIFICATION;
    if (isPending(code, "GSC_VERIFICATION_PENDING")) return;
    if (document.querySelector('meta[name="google-site-verification"]')) return;
    var meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = code.trim();
    document.head.appendChild(meta);
  }

  function injectAnalytics() {
    var a = cfg.ANALYTICS || {};
    var provider = (a.provider || "none").toLowerCase();

    if (provider === "plausible" && !isPending(a.PLAUSIBLE_DOMAIN, "PLAUSIBLE_DOMAIN_PENDING")) {
      var ps = document.createElement("script");
      ps.defer = true;
      ps.setAttribute("data-domain", a.PLAUSIBLE_DOMAIN.trim());
      ps.src = "https://plausible.io/js/script.js";
      document.head.appendChild(ps);
      return;
    }

    if (provider === "cloudflare" && !isPending(a.CLOUDFLARE_TOKEN, "CLOUDFLARE_TOKEN_PENDING")) {
      var cs = document.createElement("script");
      cs.defer = true;
      cs.src = "https://static.cloudflareinsights.com/beacon.min.js";
      cs.setAttribute("data-cf-beacon", JSON.stringify({ token: a.CLOUDFLARE_TOKEN.trim() }));
      document.head.appendChild(cs);
      return;
    }

    if (provider === "ga4" && !isPending(a.MEASUREMENT_ID, "MEASUREMENT_ID_PENDING")) {
      var id = a.MEASUREMENT_ID.trim();
      var gtagSrc = document.createElement("script");
      gtagSrc.async = true;
      gtagSrc.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
      document.head.appendChild(gtagSrc);
      var inline = document.createElement("script");
      inline.text = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config'," + JSON.stringify(id) + ");";
      document.head.appendChild(inline);
    }
  }

  function affiliateSummary() {
    var aff = cfg.AFFILIATE || {};
    var parts = [];
    if (!isPending(aff.AMAZON_NL_TRACKING_ID)) parts.push("Amazon NL: " + aff.AMAZON_NL_TRACKING_ID);
    if (!isPending(aff.BOL_SITE_ID) || !isPending(aff.BOL_PARTNER_ID)) {
      parts.push("Bol: " + [aff.BOL_SITE_ID, aff.BOL_PARTNER_ID].filter(function (x) { return !isPending(x); }).join(" / "));
    }
    if (!isPending(aff.AWIN_PUBLISHER_ID)) parts.push("Awin: " + aff.AWIN_PUBLISHER_ID);
    if (!isPending(aff.TRADETRACKER_SITE_ID) || !isPending(aff.TRADETRACKER_CAMPAIGN_ID)) {
      parts.push("TradeTracker: " + [aff.TRADETRACKER_CAMPAIGN_ID, aff.TRADETRACKER_SITE_ID].filter(function (x) { return !isPending(x); }).join(" / "));
    }
    return parts.length ? parts.join(" · ") : null;
  }

  function refreshAffiliatePlaceholders() {
    var summary = affiliateSummary();
    var nodes = document.querySelectorAll("code");
    for (var i = 0; i < nodes.length; i++) {
      var text = (nodes[i].textContent || "").trim();
      if (text === "[AFFILIATE_ID_PENDING]" || text === "AFFILIATE_ID_PENDING") {
        nodes[i].textContent = summary ? summary : "[AFFILIATE_ID_PENDING]";
      }
    }
  }

  function refreshEmailPlaceholders() {
    if (isPending(cfg.IAN_EMAIL, "IAN_EMAIL_PENDING")) return;
    var email = cfg.IAN_EMAIL.trim();
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walk.nextNode())) {
      if (node.nodeValue && node.nodeValue.indexOf("[IAN_EMAIL") !== -1) {
        node.nodeValue = node.nodeValue.replace(/\[IAN_EMAIL[^\]]*\]/g, email);
      }
    }
  }

  injectGsc();
  injectAnalytics();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      refreshAffiliatePlaceholders();
      refreshEmailPlaceholders();
    });
  } else {
    refreshAffiliatePlaceholders();
    refreshEmailPlaceholders();
  }
})();
