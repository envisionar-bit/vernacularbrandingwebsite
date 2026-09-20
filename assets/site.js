/* Vernacular Branding — small enhancements: looping slideshows */
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.slides').forEach(function(s){
    var slides=s.querySelectorAll('.slide'),dots=s.querySelectorAll('.sl-dot'),i=0,t=null;
    if(slides.length<2){var a=s.querySelector('.sl-prev'),b=s.querySelector('.sl-next');if(a)a.hidden=true;if(b)b.hidden=true;return}
    function go(n){slides[i].classList.remove('is-on');if(dots[i])dots[i].classList.remove('is-on');i=(n+slides.length)%slides.length;slides[i].classList.add('is-on');if(dots[i])dots[i].classList.add('is-on')}
    function stop(){if(t){clearInterval(t);t=null}}
    function play(){if(reduce)return;stop();t=setInterval(function(){go(i+1)},4500)}
    s.querySelector('.sl-prev').addEventListener('click',function(){go(i-1)});
    s.querySelector('.sl-next').addEventListener('click',function(){go(i+1)});
    dots.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
    s.addEventListener('mouseenter',stop);s.addEventListener('mouseleave',play);
    s.addEventListener('focusin',stop);s.addEventListener('focusout',play);
    s.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(i-1);if(e.key==='ArrowRight')go(i+1)});
    play();
  });
})();

/* Collective Canvas — living directory of names (shared store when configured, this device otherwise) */
document.addEventListener('DOMContentLoaded',function(){
  var wall=document.getElementById('vb-names-wall'),form=document.getElementById('vb-canvas-form');
  if(!wall||!form)return;
  var EP=(window.VB_CANVAS_ENDPOINT||'').trim(),KEY='vb_canvas_local_names',LOCK='vb_canvas_device_signed';
  var msg=form.querySelector('.cv-msg'),nameEl=document.getElementById('map-name'),catEl=document.getElementById('map-category');
  function say(t,bad){msg.textContent=t;msg.className='cv-msg'+(bad?' bad':'')}
  function has(n){n=n.toLowerCase();return Array.prototype.some.call(wall.querySelectorAll('.name'),function(x){return x.textContent.trim().toLowerCase()===n})}
  function add(name,assoc,isNew){
    if(!name||has(name))return false;
    var s=document.createElement('span');s.className='name '+(assoc==='author-con'?'core':'peer')+(isNew?' is-new':'');s.textContent=name;
    if(isNew)wall.insertBefore(s,wall.firstChild);else wall.appendChild(s);return true}
  function lockForm(){form.classList.add('is-locked');nameEl.disabled=true;catEl.disabled=true;form.querySelector('button').disabled=true;nameEl.placeholder='Your name is already on the canvas.'}
  function local(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}}
  if(!EP){form.querySelector('.cv-note').hidden=false;local().forEach(function(n){add(n.name,n.association,false)})}
  else{fetch(EP+(EP.indexOf('?')>-1?'&':'?')+'action=list').then(function(r){return r.json()}).then(function(d){(d.names||[]).forEach(function(n){add(String(n.name||''),n.association,false)})}).catch(function(){})}
  try{if(localStorage.getItem(LOCK)==='true')lockForm()}catch(e){}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(form.querySelector('.hp').value)return;               // honeypot
    var name=nameEl.value.replace(/\s+/g,' ').trim(),assoc=catEl.value;
    if(!name||!assoc){say('Please enter your name and choose an association.',true);return}
    if(name.length>80){say('Please keep the name under 80 characters.',true);return}
    if(has(name)){say('This name is already on the canvas.',true);nameEl.focus();return}
    var btn=form.querySelector('button');btn.disabled=true;
    function done(shared){
      add(name,assoc,true);
      try{localStorage.setItem(LOCK,'true');if(!EP){var l=local();l.push({name:name,association:assoc});localStorage.setItem(KEY,JSON.stringify(l))}}catch(e){}
      nameEl.value='';catEl.selectedIndex=0;lockForm();
      say(shared?'Thank you — your name is now on the Collective Canvas.':'Saved on this device. (The shared directory is not connected yet.)',false)}
    if(!EP){done(false);return}
    fetch(EP,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({name:name,association:assoc})})
      .then(function(r){return r.json()}).then(function(d){if(d&&d.ok)done(true);else{btn.disabled=false;say((d&&d.error)||'Could not add the name. Please try again.',true)}})
      .catch(function(){btn.disabled=false;say('Could not reach the directory. Please try again in a moment.',true)});
  });
});

/* Thank-you page: show region-specific notes when the link carries ?r=in or ?r=de (otherwise show both) */
document.addEventListener('DOMContentLoaded',function(){
  var els=document.querySelectorAll('[data-region]');if(!els.length)return;
  var r=(new URLSearchParams(location.search).get('r')||'').toLowerCase();
  if(r!=='in'&&r!=='de')return;
  els.forEach(function(e){if(e.getAttribute('data-region')!==r)e.hidden=true});
  document.querySelectorAll('[data-region-only="none"]').forEach(function(e){e.hidden=true});
});
