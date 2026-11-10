# ZZPDesk

Statische NL-site voor ZZP-productiviteit (affiliate SEO, €0 start).

Live: https://gewoonian.github.io/zzpdesk/

## Lokaal

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080/

## Ian: één paste-bestand

Alle IDs staan in **`js/site-config.js`** (geen verzonnen waarden):

| Veld | Doel |
|------|------|
| `GSC_VERIFICATION` | Google Search Console meta-tag content |
| `ANALYTICS.provider` + IDs | Plausible / Cloudflare / GA4 (`MEASUREMENT_ID_PENDING`) |
| `AFFILIATE.*` | Amazon NL, Bol, Awin, TradeTracker |
| `IAN_EMAIL` | Contact/privacy |

HTML-bestand-verificatie GSC: vervang `GSC_VERIFICATION_PENDING.html` door het `google*.html` uit Search Console, of plak de meta-content in config.

## Publish (gratis)

- **GitHub Pages:** Settings → Pages → Deploy from branch `main` / root.
- **Cloudflare Pages:** framework **None** → output `/`.

Custom domein later optioneel (~€10/jaar).
