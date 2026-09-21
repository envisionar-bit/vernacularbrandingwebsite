# WordPress store (shop.vernacularbranding.in) — matching the main site

Install in WordPress.com (Appearance → Editor):
1. **Header:** open the Header template part, replace its contents with one *Custom HTML* block containing `header.html`.
2. **Footer:** open the Footer template part, replace the old `vb-compact-footer` block with a *Custom HTML* block containing `footer.html`.
3. **Styles:** Styles (half-moon icon) → ⋮ → Additional CSS. Delete the old "MASTER DESIGN SYSTEM" CSS and paste `store.css`.
4. Remove the Light/Dark toggle block if it is a separate block.

## Safety net for stale browsers
`404-forward.html` — paste into a Custom HTML block on the store's 404 template. Any main-site address that reaches the shop is forwarded to vernacularbranding.in.
`link-check.py` — crawls both sites and lists any link that ends on the wrong host (run: `python3 link-check.py`).
