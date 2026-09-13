/* DPSCUP visitor counter v51 — robust REST event counter */
(function(){
  'use strict';
  const KEY='dpscup-2-analytics';
  function pageName(){
    return (location.pathname.split('/').pop()||'index.html').replace(/[^a-zA-Z0-9._-]/g,'_').slice(0,80)||'index.html';
  }
  function dayKey(ts){
    const d=new Date(ts);
    const p=n=>String(n).padStart(2,'0');
    return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());
  }
  async function track(){
    try{
      const cfg=window.DPSCUP_FIREBASE_CONFIG;
      if(!cfg || !cfg.databaseURL) throw new Error('ไม่พบ Firebase databaseURL');
      const base=String(cfg.databaseURL).replace(/\/$/,'');
      const now=Date.now();
      const payload={page:pageName(),at:now,day:dayKey(now)};
      const res=await fetch(base+'/'+KEY+'/views.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true});
      if(!res.ok) throw new Error('HTTP '+res.status);
      console.log('[DPSCUP analytics] counted',payload);
      window.DPSCUP_ANALYTICS={ok:true,payload};
    }catch(e){
      console.error('[DPSCUP analytics] count failed:',e);
      window.DPSCUP_ANALYTICS={ok:false,error:String(e)};
    }
  }
  track();
})();
