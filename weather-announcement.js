(function(){
  const KEY='dpscup-2-weather-announcement';
  const SOUND_SRC='rain-sound.mp3';
  const VIDEO_SRC='rain-video.mp4';
  let audio=null, soundOn=false;
  function esc(v){return (window.DPSCUP_APP&&window.DPSCUP_APP.esc)?window.DPSCUP_APP.esc(v):String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  const RAIN_HTML='<video class="rain-video" data-rain-video autoplay muted loop playsinline preload="auto"><source src="'+VIDEO_SRC+'" type="video/mp4"></video><div class="rain-video-shade"></div><div class="rain-fx">'+
    Array.from({length:28}).map((_,i)=>'<span class="drop d'+(i%7)+'"></span>').join('')+
    Array.from({length:6}).map(()=>'<span class="puddle"></span>').join('')+
    '</div>';
  function ensureAudio(){
    if(!audio){audio=new Audio(SOUND_SRC);audio.loop=true;audio.preload='auto';audio.volume=.28;}
    return audio;
  }
  function syncSoundButtons(){
    document.querySelectorAll('.weather-sound-btn').forEach(btn=>{
      btn.classList.toggle('on',soundOn);
      btn.innerHTML=soundOn?'🔊 ปิดเสียงฝน':'🔊 เปิดเสียงฝน';
      btn.setAttribute('aria-pressed',String(soundOn));
    });
  }
  async function toggleSound(){
    const a=ensureAudio();
    if(!soundOn){
      try{await a.play();soundOn=true;localStorage.setItem('dpscup-rain-sound','1');}
      catch(e){soundOn=false;console.warn('rain sound requires a tap',e);}
    }else{
      a.pause();a.currentTime=0;soundOn=false;localStorage.removeItem('dpscup-rain-sound');
    }
    syncSoundButtons();
  }
  function soundButton(){return '<button type="button" class="weather-sound-btn" data-rain-sound>🔊 เปิดเสียงฝน</button><span class="weather-sound-hint">แตะปุ่มเพื่อเปิดเสียง · เบราว์เซอร์อาจไม่อนุญาตให้เล่นอัตโนมัติ</span>';}
  function render(v){
    v=v||{}; const mode=v.mode||'off';
    document.querySelectorAll('[data-final-weather]').forEach(el=>{
      if(mode==='off'){el.hidden=true;el.innerHTML='';return;}
      const postponed=mode==='postponed';
      el.hidden=false;el.className='final-weather '+(postponed?'postponed':'waiting');
      const title=postponed?'เลื่อนการแข่งขัน':'รอดูสถานการณ์';
      const sub=postponed?'ฝนตกหนักในพื้นที่ เพื่อความปลอดภัยของนักกีฬา ทีมงาน และผู้ชม':'ขณะนี้ฝนตกหนัก ขอรอดูสถานการณ์ก่อน หากสภาพอากาศดีขึ้น การแข่งขันอาจกลับมาแข่งคืนนี้ได้';
      const date=postponed?(v.date||'14 กันยายน 2569'):(v.date||'ติดตามประกาศอีกครั้ง');
      const soundEnabled=v.sound!==false;
      el.innerHTML=RAIN_HTML+(postponed?'<div class="flash"></div>':'')+'<div class="weather-cloud">☁️</div><div class="weather-light">⚡</div><div class="weather-top"><span>🌧️</span><span class="weather-status">DPSCUP WEATHER UPDATE</span><span>💧</span></div><div class="weather-main">'+title+'</div><div class="weather-sub">'+sub+'</div>'+(postponed?'<div class="weather-date">📅 ย้ายไปแข่งพรุ่งนี้ · '+esc(date)+(v.time?' · '+esc(v.time):'')+'</div>':'<div class="weather-date">⏳ รอติดตามสถานการณ์คืนนี้</div>')+(soundEnabled?soundButton():'');
    });
    if(v.sound===false && audio && soundOn){audio.pause();audio.currentTime=0;soundOn=false;localStorage.removeItem('dpscup-rain-sound');}
    syncSoundButtons();
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-rain-sound]');if(b){e.preventDefault();toggleSound();}});
  function start(){
    if(!window.firebase||!window.DPSCUP_FIREBASE_CONFIG)return;
    try{if(!firebase.apps.length)firebase.initializeApp(window.DPSCUP_FIREBASE_CONFIG);firebase.database().ref(KEY).on('value',s=>render(s.val()||{}));}catch(e){console.warn('weather announcement',e)}
  }
  window.DPSCUP_WEATHER={KEY,render,start,toggleSound};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
