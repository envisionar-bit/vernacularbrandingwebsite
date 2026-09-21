# Vernacular Branding — website

Static site for *Vernacular Branding: Reading Identity Through Design and Visibility*.
Designed to follow the Vernacular Branding Brand Guidelines (First Edition, December 2025):
Signature Blue `#005AA9`, Highlight Yellow `#F4ED65`, Black, White · Poppins (wordmark, headings, labels) + Noto Sans (body).

- `index.html` … page files (served without `.html` on GitHub Pages)
- `assets/style.css` — the whole design system
- `assets/img`, `assets/docs`, `assets/press` — images, PDFs, press-kit files

**Status: live at https://vernacularbranding.in** — built with the generator in go-live mode (canonical links, sitemap.xml, robots.txt, redirects for the old WordPress URLs). `thank-you/index.html` stays `noindex` permanently (post-purchase page).
(India: WooCommerce + Shiprocket, Germany: Stripe). Remove the `robots` meta line from each page before pointing the domain here — except `thank-you/index.html`, which must stay `noindex` permanently (it is the post-purchase page).
