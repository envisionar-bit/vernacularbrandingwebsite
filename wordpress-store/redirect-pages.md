# WordPress pages that must only forward to the main site

Keep these 4 pages **Published** (WooCommerce and old links still need the address to exist), but replace each page's content with the block below (one *Custom HTML* block; change only the URL). Visitors never see them: they are sent straight to the GitHub site.

| WordPress page | Slug | Send to |
|---|---|---|
| Contact | contact | https://vernacularbranding.in/contact-us |
| LEGAL NOTICE – IN | legal-notice-india | https://vernacularbranding.in/india-legal-notice |
| PRIVACY POLICY – IN | privacy-policy-india | https://vernacularbranding.in/india-privacy-policy |
| T & C | terns-and-conditions-india | https://vernacularbranding.in/india-terms |

```html
<meta http-equiv="refresh" content="0; url=https://vernacularbranding.in/india-privacy-policy">
<script>window.location.replace("https://vernacularbranding.in/india-privacy-policy");</script>
<p>This page has moved. <a href="https://vernacularbranding.in/india-privacy-policy">Continue →</a></p>
```
