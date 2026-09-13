(function(){'use strict';
  // Initialize Firebase exactly once. firebase-config.js must define window.DPSCUP_FIREBASE_CONFIG.
  if (window.firebase && window.DPSCUP_FIREBASE_CONFIG && !firebase.apps.length) {
    firebase.initializeApp(window.DPSCUP_FIREBASE_CONFIG);
  }
  window.DPSCUP_FIREBASE_READY = !!(window.firebase && firebase.apps && firebase.apps.length);
const SENIOR_IDS=new Set(['fri-4','sat-0b','sat-3','sat-6','sat-9','sat-12']);const SPECIAL_IDS=new Set(['sun-onepiraya']);const SCORE_KEY='dpscup-2-scores',SCHEDULE_KEY='dpscup-2-schedule',REPORT_KEY='dpscup-2-reports',SUMMARY_KEY='dpscup-2-summary';const DEFAULT_MATCHES=[
    {id:"fri-1", day:"fri", group:"ม.ต้น", time:"16:30", a:"DARK RAVENS X VORTEX", b:"พ่อลังสั่งลุย X เต่าเพื่อนรัก", final:true,
      goals:[{team:"b", scorer:"กิรติ", og:true}]},
    {id:"fri-2", day:"fri", group:"ม.ต้น", time:"16:50", a:"ลูกชายคนโต X TWO", b:"เสืออ้วน X YIYA KATONG", final:true,
      goals:[{team:"a", scorer:"ฮานีฟ"},{team:"a", scorer:"ฮานีฟ"},{team:"a", scorer:"ฮานีฟ"}]},
    {id:"fri-3", day:"fri", group:"ม.ต้น", time:"17:10", a:"HUFFAZ WORRIORS FC", b:"VORTEX", final:true,
      goals:[{team:"b", scorer:"อัรฟาริส"},{team:"b", scorer:"รุชดาน"},{team:"b", scorer:"อัรฮาม"}]},
    {id:"fri-4", day:"fri", group:"ม.ปลาย", time:"17:30", a:"ไม่ได้แชมป์ ไม่ขึ้นมัสยิด", b:"วัยรุ่นสายฮา X ทีเด็ด", final:true,
      goals:[{team:"a", scorer:"ฟารุก"}]},

    {id:"sat-0",  day:"sat", group:"ม.ต้น", start:"2026-09-12T07:00:00+07:00", end:"2026-09-12T07:20:00+07:00", time:"07:00", a:"บูเดาะบูล่ะห์", b:"ลุงโชเล่ X ปูดอง"},
    {id:"sat-0b", day:"sat", group:"ม.ปลาย", start:"2026-09-12T07:20:00+07:00", end:"2026-09-12T07:40:00+07:00", time:"07:20", a:"Dewan G.20", b:"วัยรุ่นสายฮา X ซีเครท"},
    {id:"sat-1",  day:"sat", group:"ม.ต้น", start:"2026-09-12T08:20:00+07:00", end:"2026-09-12T08:40:00+07:00", time:"08:20", a:"DARK RAVENS X VORTEX", b:"อาหรับน้อยร้อยลีลา"},
    {id:"sat-2",  day:"sat", group:"ม.ต้น", start:"2026-09-12T08:40:00+07:00", end:"2026-09-12T09:00:00+07:00", time:"08:40", a:"ลูกชายคนโต X TWO", b:"บุรฮันสั่งลุย X อีเราะฮ์ฮอ"},
    {id:"sat-3",  day:"sat", group:"ม.ปลาย", start:"2026-09-12T09:00:00+07:00", end:"2026-09-12T09:20:00+07:00", time:"09:00", a:"ไม่ได้แชมป์ ไม่ขึ้นมัสยิด", b:"Dewan G.20"},
    {id:"sat-4",  day:"sat", group:"ม.ต้น", start:"2026-09-12T09:20:00+07:00", end:"2026-09-12T09:40:00+07:00", time:"09:20", a:"TSP รุ่นที่ 4 ACADEMY 1", b:"ชาคริต X น้องกา"},
    {id:"sat-5",  day:"sat", group:"ม.ต้น", start:"2026-09-12T09:40:00+07:00", end:"2026-09-12T10:00:00+07:00", time:"09:40", a:"น้องใหม่ X Q-CHANGE", b:"ทีมงาน X อาเซียน"},
    {id:"sat-6",  day:"sat", group:"ม.ปลาย", start:"2026-09-12T10:00:00+07:00", end:"2026-09-12T10:20:00+07:00", time:"10:00", a:"วัยรุ่นสายฮา X ทีเด็ด", b:"วัยรุ่นสายฮา X ซีเครท"},
    {id:"sat-7",  day:"sat", group:"ม.ต้น", start:"2026-09-12T10:20:00+07:00", end:"2026-09-12T10:40:00+07:00", time:"10:20", a:"พ่อลังสั่งลุย X เต่าเพื่อนรัก", b:"อาหรับน้อยร้อยลีลา"},
    {id:"sat-8",  day:"sat", group:"ม.ต้น", start:"2026-09-12T10:40:00+07:00", end:"2026-09-12T11:00:00+07:00", time:"10:40", a:"เสืออ้วน X YIYA KATONG", b:"บุรฮันสั่งลุย X อีเราะฮ์ฮอ"},
    {id:"sat-9",  day:"sat", group:"ม.ปลาย", start:"2026-09-12T11:00:00+07:00", end:"2026-09-12T11:20:00+07:00", time:"11:00", a:"ไม่ได้แชมป์ ไม่ขึ้นมัสยิด", b:"วัยรุ่นสายฮา X ซีเครท"},
    {id:"sat-10", day:"sat", group:"ม.ต้น", start:"2026-09-12T11:20:00+07:00", end:"2026-09-12T11:40:00+07:00", time:"11:20", a:"HUFFAZ WORRIORS FC", b:"TSP รุ่นที่ 4 ACADEMY 1"},
    {id:"sat-break", day:"sat", group:"ม.ต้น", isBreak:true, time:"11:40 – 13:20", label:"พักเที่ยง และพักละหมาด",
      start:"2026-09-12T11:40:00+07:00", end:"2026-09-12T13:20:00+07:00"},
    {id:"sat-11", day:"sat", group:"ม.ต้น", start:"2026-09-12T13:20:00+07:00", end:"2026-09-12T13:40:00+07:00", time:"13:20", a:"บูเดาะบูล่ะห์", b:"น้องใหม่ X Q-CHANGE"},
    {id:"sat-12", day:"sat", group:"ม.ปลาย", start:"2026-09-12T13:40:00+07:00", end:"2026-09-12T14:00:00+07:00", time:"13:40", a:"Dewan G.20", b:"วัยรุ่นสายฮา X ทีเด็ด"},
    {id:"sat-13", day:"sat", group:"ม.ต้น", start:"2026-09-12T14:00:00+07:00", end:"2026-09-12T14:20:00+07:00", time:"14:00", a:"VORTEX", b:"ชาคริต X น้องกา"},
    {id:"sat-14", day:"sat", group:"ม.ต้น", start:"2026-09-12T14:20:00+07:00", end:"2026-09-12T14:40:00+07:00", time:"14:20", a:"ลุงโชเล่ X ปูดอง", b:"ทีมงาน X อาเซียน"},
    {id:"sat-16", day:"sat", group:"ม.ต้น", start:"2026-09-12T15:00:00+07:00", end:"2026-09-12T15:20:00+07:00", time:"15:00", a:"HUFFAZ WORRIORS FC", b:"ชาคริต X น้องกา"},

    {id:"sun-1", day:"sun", group:"ม.ต้น", start:"2026-09-13T08:30:00+07:00", end:"2026-09-13T08:50:00+07:00", time:"08:30", a:"บูเดาะบูล่ะห์", b:"ทีมงาน X อาเซียน"},
    {id:"sun-2", day:"sun", group:"ม.ต้น", start:"2026-09-13T08:50:00+07:00", end:"2026-09-13T09:10:00+07:00", time:"08:50", a:"VORTEX", b:"TSP รุ่นที่ 4 ACADEMY 1"},
    {id:"sun-3", day:"sun", group:"ม.ต้น", start:"2026-09-13T09:10:00+07:00", end:"2026-09-13T09:30:00+07:00", time:"09:10", a:"ลุงโชเล่ X ปูดอง", b:"น้องใหม่ X Q-CHANGE"},
    {id:"sun-onepiraya", day:"sun", group:"พิเศษ", start:"2026-09-13T16:00:00+07:00", end:"2026-09-13T17:30:00+07:00", time:"16:00", a:"ทีมศิษย์เก่า ONE PIRAYA", b:"ทีมปัจจุบัน DPSPN"},
  ];function clone(x){return JSON.parse(JSON.stringify(x));}function gradeOf(m){if(SENIOR_IDS.has(m.id))return 'ม.ปลาย';if(SPECIAL_IDS.has(m.id))return 'พิเศษ';return m.grade||m.group||'ม.ต้น';}function normalizeName(s){return String(s||'').replace(/\s*\(โล้น\)\s*/g,' ').replace(/คายรุนอานาม/g,'คอยรุนอานาม').trim();}function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}function order(d){return {fri:1,sat:2,sun:3}[d]||9;}function signature(m){const g=gradeOf(m);if(m.isBreak)return [m.day||'',m.time||'','break',m.label||''].join('¦');if(g==='พิเศษ')return [m.day||'',m.time||'',g].join('¦');return [m.day||'',m.time||'',g,m.a||'',m.b||''].join('¦');}function normalizeSchedule(cloud){const obj=cloud&&typeof cloud==='object'?cloud:{},deleted=new Set(),byId=new Map();Object.values(obj).forEach(x=>{if(x?.deleted&&x.id)deleted.add(x.id);});DEFAULT_MATCHES.forEach(m=>{if(!deleted.has(m.id))byId.set(m.id,clone(m));});Object.values(obj).forEach(x=>{if(!x?.id||x.deleted)return;byId.set(x.id,{...(byId.get(x.id)||{}),...clone(x)});});const seen=new Set(),rows=[];for(const m of byId.values()){if(!m.isBreak){const s=signature(m);if(seen.has(s))continue;seen.add(s);}rows.push(m);}return rows.sort((a,b)=>order(a.day)-order(b.day)||String(a.time||'').localeCompare(String(b.time||''))||String(a.id).localeCompare(String(b.id)));}function resultFor(m,scores){const r=scores[m.id];if(!r&&m.final){const g=m.goals||[];return {a:g.filter(x=>x.team==='a').length,b:g.filter(x=>x.team==='b').length,goals:g};}if(!r)return null;const goals=Array.isArray(r.goals)?r.goals:[];return r.mode==='manual'?{a:Number(r.scoreA)||0,b:Number(r.scoreB)||0,goals}:{a:goals.filter(x=>x.team==='a').length,b:goals.filter(x=>x.team==='b').length,goals};}function scorerRows(matches,scores){const map=new Map();matches.forEach(m=>{if(m.isBreak)return;const r=resultFor(m,scores);if(!r)return;(r.goals||[]).forEach(g=>{if(g.og||!g.scorer)return;const name=normalizeName(g.scorer);if(!name)return;const team=g.team==='a'?m.a:m.b,key=name+'¦'+team+'¦'+gradeOf(m),x=map.get(key)||{name,team,group:gradeOf(m),goals:0};x.goals++;map.set(key,x);});});return [...map.values()].sort((a,b)=>b.goals-a.goals||a.name.localeCompare(b.name,'th'));}function toast(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200);}window.DPSCUP_APP={SENIOR_IDS,SPECIAL_IDS,SCORE_KEY,SCHEDULE_KEY,REPORT_KEY,SUMMARY_KEY,DEFAULT_MATCHES,clone,gradeOf,normalizeName,esc,normalizeSchedule,resultFor,scorerRows,toast};})();