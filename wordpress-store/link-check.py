import re,subprocess,urllib.parse as U,collections,concurrent.futures as cf
MAIN='www.vernacularbranding.in'; SHOP='shop.vernacularbranding.in'
seedsMain=['']+['authors', 'contact-us', 'contributors', 'exhibition', 'germany-agb', 'germany-datenschutz', 'germany-impressum', 'india-legal-notice', 'india-privacy-policy', 'india-terms', 'order-germany', 'order-india', 'press', 'project', 'reception', 'site-map', 'spot-a-sign-share', 'the-book']+['order-complete/','404']
seedsShop=['','store-india/','cart/','my-account/','product/vernacular-branding-hardcover-book/','privacy-policy-india/','terns-and-conditions-india/','contact/','legal-notice-india/']
def get(u):
    r=subprocess.run(['curl','-s','-m','25','-o','-','-w','\n%{http_code}',u],capture_output=True,text=True); b,_,c=r.stdout.rpartition('\n'); return c,b
def final(u):
    r=subprocess.run(['curl','-sIL','-m','25','-o','/dev/null','-w','%{http_code} %{url_effective}',u],capture_output=True,text=True).stdout.split(' ',1); return r[0],r[1] if len(r)>1 else ''
links=collections.defaultdict(set)   # (target)->set(source pages)
pages=[('https://'+MAIN+'/'+p) for p in seedsMain]+[('https://'+SHOP+'/'+p) for p in seedsShop]
def scan(p):
    c,h=get(p); out=[]
    for m in re.finditer(r'<a\b[^>]*?href="([^"]+)"',h):
        raw=m.group(1)
        if raw.startswith(('#','mailto:','tel:','javascript:')): continue
        u=U.urljoin(p,raw.split('#')[0]) 
        if not u.startswith('http'): continue
        host=U.urlparse(u).netloc
        if host in (MAIN,SHOP,'vernacularbranding.in'): out.append(u)
    return p,c,out
with cf.ThreadPoolExecutor(8) as ex: res=list(ex.map(scan,pages))
for p,c,out in res:
    for u in out: links[u].add(p)
print('pages scanned:',len(res),'| non-200 pages:',[(p,c) for p,c,_ in res if c!='200'])
print('unique internal targets:',len(links))
targets=sorted(links)
with cf.ThreadPoolExecutor(8) as ex: fin=dict(zip(targets,ex.map(final,targets)))
# WordPress-only paths (allowed to live on shop)
wp_ok=('/cart','/checkout-india','/my-account','/store-india','/product/','/wp-','/feed','/comments','/xmlrpc','/wp-json')
problems=[];notok=[]
for u in targets:
    code,fu=fin[u]; host=U.urlparse(fu).netloc; path=U.urlparse(u).path
    srcs=sorted(links[u])
    if code not in ('200','301','302'): notok.append((u,code,fu))
    onShopWanted=path=='/' and U.urlparse(u).netloc==SHOP or any(path.startswith(w) or path.rstrip('/')==w for w in wp_ok)
    if host==SHOP and not onShopWanted: problems.append((u,fu,srcs[:2]))
    if host!=SHOP and onShopWanted and U.urlparse(u).netloc==SHOP and path!='/': problems.append((u,'LEFT WP: '+fu,srcs[:2]))
print('\nLinks that end on the shop but should be on the main site:',len(problems))
for p in problems[:30]: print(' ',p)
print('\nLinks with a bad HTTP status:',len(notok))
for n in notok[:30]: print(' ',n)
