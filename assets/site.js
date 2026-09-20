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
