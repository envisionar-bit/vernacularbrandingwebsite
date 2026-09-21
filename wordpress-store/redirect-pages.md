# WordPress pages that must only forward to the main site

Keep these 4 pages **Published** (WooCommerce and old links still need the address to exist), but replace each page's content with the block below (one *Custom HTML* block; change only the URL). Visitors never see them: they are sent straight to the GitHub site.

| WordPress page | Slug | Send to |
|---|---|---|
| Contact | contact | https://vernacularbranding.in/contact |
| LEGAL NOTICE – IN | legal-notice-india | https://vernacularbranding.in/legal-notice-india |
| PRIVACY POLICY – IN | privacy-policy-india | https://vernacularbranding.in/privacy-policy-india |
| T & C | terns-and-conditions-india | https://vernacularbranding.in/terms-and-conditions-india |

```html
<meta http-equiv="refresh" content="0; url=https://vernacularbranding.in/privacy-policy-india">
<script>window.location.replace("https://vernacularbranding.in/privacy-policy-india");</script>
<p>This page has moved. <a href="https://vernacularbranding.in/privacy-policy-india">Continue →</a></p>
```
