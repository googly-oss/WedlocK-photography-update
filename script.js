(function(){
 const bar=document.querySelector('.progress i');
 addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.width=(h?scrollY/h*100:0)+'%'},{passive:true});
 const nav=document.querySelector('.nav');
 addEventListener('scroll',()=>nav&&nav.classList.toggle('scrolled',scrollY>50),{passive:true});
 const menu=document.querySelector('.menu'), mobile=document.querySelector('.mobile-panel');
 if(menu&&mobile){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));mobile.classList.toggle('open',!open);document.body.classList.toggle('no-scroll',!open)});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');mobile.classList.remove('open');document.body.classList.remove('no-scroll')}));}
 const lb=document.querySelector('.lightbox');
 if(lb){const image=lb.querySelector('img'),caption=lb.querySelector('.lb-caption'),prev=lb.querySelector('.lb-prev'),next=lb.querySelector('.lb-next');let items=[],index=0;
  function render(){const item=items[index];image.src=item.dataset.full;image.alt=item.dataset.alt||'';caption.textContent=item.dataset.caption||''}
  function open(item){items=[...document.querySelectorAll('.photo-item')];index=items.indexOf(item);render();lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll')}
  function close(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');image.src=''}
  document.querySelectorAll('.photo-item').forEach(item=>item.addEventListener('click',()=>open(item)));
  lb.querySelector('.lb-close').addEventListener('click',close);prev.addEventListener('click',()=>{index=(index-1+items.length)%items.length;render()});next.addEventListener('click',()=>{index=(index+1)%items.length;render()});lb.addEventListener('click',e=>{if(e.target===lb)close()});document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')prev.click();if(e.key==='ArrowRight')next.click()});
 }
})();

/* Hero reel autoplay + browser-safe sound control */
(function(){
  const reel = document.getElementById('heroReel');
  const sound = document.getElementById('heroReelSound');
  if(!reel || !sound) return;

  reel.muted = true;
  const tryPlay = () => {
    const p = reel.play();
    if(p && typeof p.catch === 'function') p.catch(()=>{});
  };
  tryPlay();

  sound.addEventListener('click', async () => {
    if(reel.muted){
      reel.muted = false;
      try{
        await reel.play();
        sound.textContent = 'Sound on';
        sound.classList.add('is-on');
        sound.setAttribute('aria-label','Turn reel sound off');
      }catch(e){
        reel.muted = true;
        sound.textContent = 'Tap for sound';
      }
    }else{
      reel.muted = true;
      sound.textContent = 'Sound';
      sound.classList.remove('is-on');
      sound.setAttribute('aria-label','Turn reel sound on');
    }
  });
})();

// Reliable back-to-top button on every page
(function(){
  const btn=document.getElementById('backToTop');
  if(!btn) return;
  const toggle=()=>btn.classList.toggle('show',window.scrollY>500);
  window.addEventListener('scroll',toggle,{passive:true});
  toggle();
  btn.addEventListener('click',()=>{
    window.scrollTo({top:0,left:0,behavior:'smooth'});
    // Fallback for browsers that ignore smooth scrolling
    setTimeout(()=>{if(window.scrollY>20) window.scrollTo(0,0)},700);
  });
})();
