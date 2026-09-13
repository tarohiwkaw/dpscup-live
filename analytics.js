(function(){
  'use strict';
  const ROOT='dpscup-2-analytics/views';
  function dayKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function run(){
    if(!window.firebase || !window.DPSCUP_FIREBASE_CONFIG) return setTimeout(run,400);
    try{
      if(!firebase.apps.length) firebase.initializeApp(window.DPSCUP_FIREBASE_CONFIG);
      const db=firebase.database();
      const now=Date.now();
      const page=(location.pathname.split('/').pop()||'index.html').slice(0,80);
      db.ref(ROOT).push({
        page:page,
        at:now,
        day:dayKey(new Date(now)),
        ua:(navigator.userAgent||'').slice(0,180)
      }).catch(e=>console.warn('analytics write blocked',e));
    }catch(e){console.warn('analytics init',e);setTimeout(run,1200);}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
})();
