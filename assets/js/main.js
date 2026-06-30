// Maison Serrurier — interactions
(function(){
  var b=document.getElementById('burger'),n=document.getElementById('mainnav');
  if(b&&n){
    b.addEventListener('click',function(){n.classList.toggle('show');});
    n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('show');});});
  }
})();

// Logos assurances : bande défilante (clonage pour boucle continue)
(function(){
  var grid=document.querySelector('.assu-grid');
  if(grid && !grid.querySelector('.assu-track')){
    var track=document.createElement('div'); track.className='assu-track';
    while(grid.firstChild) track.appendChild(grid.firstChild);
    grid.appendChild(track);
    grid.appendChild(track.cloneNode(true));
  }
  // Arrondissements de Paris : bande défilante (auto)
  document.querySelectorAll('.arr-track').forEach(function(t){
    if(t.dataset.cloned) return;
    t.dataset.cloned='1';
    var clone=t.cloneNode(true); clone.removeAttribute('data-cloned');
    t.parentNode.appendChild(clone);
  });
})();

// Avis : slider manuel (glisser à la souris ; tactile natif sur mobile)
(function(){
  document.querySelectorAll('.avis-marquee').forEach(function(s){
    var down=false,sx=0,sl=0,moved=false;
    s.addEventListener('mousedown',function(e){down=true;moved=false;sx=e.pageX;sl=s.scrollLeft;s.classList.add('drag');});
    window.addEventListener('mouseup',function(){down=false;s.classList.remove('drag');});
    s.addEventListener('mouseleave',function(){down=false;s.classList.remove('drag');});
    s.addEventListener('mousemove',function(e){if(!down)return;e.preventDefault();var d=e.pageX-sx;if(Math.abs(d)>3)moved=true;s.scrollLeft=sl-d;});
    s.addEventListener('click',function(e){if(moved)e.preventDefault();},true);
  });
})();

// Pop-up formulaire de rappel
function openModal(){
  var m=document.getElementById('leadModal');
  if(m){m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
}
function closeModal(){
  var m=document.getElementById('leadModal');
  if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow='';}
}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});

function toggleAcc(btn){
  var acc=btn.closest('.acc'), body=acc.querySelector('.acc-body');
  var open=acc.classList.toggle('open');
  body.style.maxHeight = open ? (body.scrollHeight+40)+'px' : '0';
}

var POSTAL={"75":"Paris","77":"Meaux","78":"Versailles","91":"Évry-Courcouronnes",
 "92":"Boulogne-Billancourt","93":"Saint-Denis","94":"Créteil","95":"Argenteuil",
 "44":"Nantes","85":"La Roche-sur-Yon","56":"Lorient","35":"Rennes","49":"Angers",
 "30":"Nîmes","34":"Montpellier","31":"Toulouse","81":"Albi","06":"Nice","83":"Toulon"};
function cpLookup(val){
  var box=document.getElementById('cpCity'); if(!box) return;
  var full=(val||'').replace(/\D/g,''), d=full.slice(0,2);
  if(full.length>=5 && d==='75'){
    var a=parseInt(full.slice(3,5),10);
    if(a>=1&&a<=20){box.innerHTML='<span class="chip" onclick="pickCity(this)">Serrurier Paris '+a+'</span>';return;}
  }
  box.innerHTML = POSTAL[d] ? '<span class="chip" onclick="pickCity(this)">Serrurier '+POSTAL[d]+'</span>' : '';
}
function pickCity(el){
  document.querySelectorAll('#cpCity .chip').forEach(function(c){c.style.background='';c.style.color='';});
  el.style.background='#c5a572'; el.style.color='#14213a';
}

function submitLead(e){
  e.preventDefault();
  e.target.innerHTML='<div style="text-align:center;padding:14px">'
    +'<h2 style="color:#14213a;font-family:Fraunces,Georgia,serif">Merci !</h2>'
    +'<p style="color:#6b7588;margin:.6em 0 1em">Votre demande est bien reçue. Pour une prise en charge immédiate, appelez-nous directement.</p>'
    +'<a href="tel:+33123456789" class="btn btn-call btn-block" style="justify-content:center">📞 Appeler — gratuit</a></div>';
  return false;
}
