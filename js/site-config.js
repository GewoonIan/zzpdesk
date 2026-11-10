/**
 * ZZPDesk — één paste-plek voor Ian (geen verzonnen IDs / geen fake revenue).
 *
 * Hoe: vul alleen waarden onder "PASTE HIER" in, commit/push naar main.
 * Laat *_PENDING staan tot je een echt ID hebt.
 *
 * Zie ook: monetisatie-blocker.md in de project-store.
 */
window.ZZPDESK_CONFIG = {
  /* ========== PASTE HIER ========== */

  /** Google Search Console HTML-tag content (zonder quotes). */
  GSC_VERIFICATION: "GSC_VERIFICATION_PENDING",

  /**
   * Analytics (gratis / privacyvriendelijk).
   * provider: "none" | "plausible" | "cloudflare" | "ga4"
   * - plausible: DOMAIN = hostname zonder protocol, bijv. "gewoonian.github.io"
   * - cloudflare: token uit Cloudflare Web Analytics beacon
   * - ga4: MEASUREMENT_ID = "G-XXXXXXXX" (fallback; minder privacyvriendelijk)
   */
  ANALYTICS: {
    provider: "none",
    PLAUSIBLE_DOMAIN: "PLAUSIBLE_DOMAIN_PENDING",
    CLOUDFLARE_TOKEN: "CLOUDFLARE_TOKEN_PENDING",
    MEASUREMENT_ID: "MEASUREMENT_ID_PENDING"
  },

  /**
   * Affiliate — plak tracking/site-IDs; geen wachtwoorden.
   * Pagina’s gebruiken a[data-affiliate="amazon|bol|awin|tradetracker|vendor"].
   * Bootstrap zet Amazon tag=, UTM, en sponsored-rel zodra IDs ≠ *_PENDING.
   */
  AFFILIATE: {
    AMAZON_NL_TRACKING_ID: "AFFILIATE_ID_PENDING",
    BOL_SITE_ID: "AFFILIATE_ID_PENDING",
    BOL_PARTNER_ID: "AFFILIATE_ID_PENDING",
    AWIN_PUBLISHER_ID: "AFFILIATE_ID_PENDING",
    TRADETRACKER_CAMPAIGN_ID: "AFFILIATE_ID_PENDING",
    TRADETRACKER_SITE_ID: "AFFILIATE_ID_PENDING"
  },

  /** Contact — vervangt [IAN_EMAIL] in de UI wanneer gezet. */
  IAN_EMAIL: "IAN_EMAIL_PENDING",

  /* ========== einde paste ========== */

  SITE_BASE: "https://gewoonian.github.io/zzpdesk",
  UTM: {
    source: "zzpdesk",
    medium: "affiliate"
  }
};
