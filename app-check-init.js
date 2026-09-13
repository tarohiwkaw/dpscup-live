(function(){
  'use strict';
  function init(){
    try{
      const key=window.DPSCUP_APP_CHECK_SITE_KEY || (window.DPSCUP_FIREBASE_CONFIG&&window.DPSCUP_FIREBASE_CONFIG.appCheckSiteKey);
      if(!key || !window.firebase || !firebase.appCheck) return;
      if(!firebase.apps.length) return setTimeout(init,300);
      const ac=firebase.appCheck();
      ac.activate(key,true);
      console.info('DPSCUP App Check enabled');
    }catch(e){console.warn('DPSCUP App Check not enabled:',e);}
  }
  init();
})();
