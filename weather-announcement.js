(function(){
  const KEY='dpscup-2-weather-announcement';
  function esc(v){return (window.DPSCUP_APP&&window.DPSCUP_APP.esc)?window.DPSCUP_APP.esc(v):String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  const RAIN_HTML='<div class="rain-fx">'+
    Array.from({length:15}).map(()=>'<span class="drop"></span>').join('')+
    Array.from({length:4}).map(()=>'<span class="puddle"></span>').join('')+
    '</div>';
  function render(v){
    v=v||{}; const mode=v.mode||'off';
    document.querySelectorAll('[data-final-weather]').forEach(el=>{
      if(mode==='off'){el.hidden=true;el.innerHTML='';return;}
      const postponed=mode==='postponed';
      el.hidden=false;el.className='final-weather '+(postponed?'postponed':'waiting');
      const title=postponed?'เลื่อนการแข่งขัน':'รอดูสถานการณ์';
      const sub=postponed?'ฝนตกหนักในพื้นที่ เพื่อความปลอดภัยของนักกีฬา ทีมงาน และผู้ชม':'ขณะนี้ฝนตกหนัก ขอรอดูสถานการณ์ก่อน หากสภาพอากาศดีขึ้น การแข่งขันอาจกลับมาแข่งคืนนี้ได้';
      const date=postponed?(v.date||'14 กันยายน 2569'):(v.date||'ติดตามประกาศอีกครั้ง');
      el.innerHTML=RAIN_HTML+(postponed?'<div class="flash"></div>':'')+'<div class="weather-cloud">☁️</div><div class="weather-light">⚡</div><div class="weather-top"><span>🌧️</span><span class="weather-status">DPSCUP WEATHER UPDATE</span><span>💧</span></div><div class="weather-main">'+title+'</div><div class="weather-sub">'+sub+'</div>'+(postponed?'<div class="weather-date">📅 ย้ายไปแข่งพรุ่งนี้ · '+esc(date)+(v.time?' · '+esc(v.time):'')+'</div>':'<div class="weather-date">⏳ รอติดตามสถานการณ์คืนนี้</div>');
    });
  }
  function start(){
    if(!window.firebase||!window.DPSCUP_FIREBASE_CONFIG)return;
    try{if(!firebase.apps.length)firebase.initializeApp(window.DPSCUP_FIREBASE_CONFIG);firebase.database().ref(KEY).on('value',s=>render(s.val()||{}));}catch(e){console.warn('weather announcement',e)}
  }
  window.DPSCUP_WEATHER={KEY,render,start};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
