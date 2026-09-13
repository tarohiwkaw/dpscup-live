/* DPSCUP visitor counter — page views + daily totals */
(function(){
  const KEY='dpscup-2-analytics';
  function pad(n){return String(n).padStart(2,'0')}
  function dayKey(){const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
  function safeInit(){
    try{
      if(!window.firebase || !window.DPSCUP_FIREBASE_CONFIG || !window.firebase.database) return null;
      if(!firebase.apps.length) firebase.initializeApp(window.DPSCUP_FIREBASE_CONFIG);
      return firebase.database();
    }catch(e){console.warn('DPSCUP analytics init failed',e);return null}
  }
  window.DPSCUP_ANALYTICS={
    track:function(page){
      const db=safeInit(); if(!db)return;
      const p=String(page||location.pathname.split('/').pop()||'index.html').replace(/[^a-zA-Z0-9._-]/g,'_').slice(0,80)||'index.html';
      const day=dayKey();
      const root=db.ref(KEY);
      root.child('totalViews').transaction(v=>(Number(v)||0)+1);
      root.child('days').child(day).transaction(v=>(Number(v)||0)+1);
      root.child('pages').child(p).transaction(v=>(Number(v)||0)+1);
      root.child('lastVisitAt').set(firebase.database.ServerValue.TIMESTAMP);
    }
  };
  // Count once per page load. This is page views, not unique people.
  window.DPSCUP_ANALYTICS.track(location.pathname.split('/').pop()||'index.html');
})();
