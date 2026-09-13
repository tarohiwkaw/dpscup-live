(function(){
  'use strict';
  const A=window.DPSCUP_APP;
  if(!A) return;

  function normalizeScorerName(name){
    return String(name||'')
      .normalize('NFKC')
      .replace(/\s*\(โล้น\)\s*/g,' ')
      .replace(/คายรุนอานาม/g,'คอยรุนอานาม')
      .replace(/คายรุนนอานาม/g,'คอยรุนอานาม')
      .replace(/คอยรุนอานาม\s+/g,'คอยรุนอานาม')
      .replace(/\s+/g,' ')
      .trim();
  }

  const original=A.scorerRows;
  A.normalizeName=normalizeScorerName;
  A.scorerRows=function(matches,scores){
    const raw=typeof original==='function' ? original(matches,scores) : [];
    const merged=new Map();
    raw.forEach(row=>{
      const name=normalizeScorerName(row.name);
      if(!name) return;
      const key=name+'¦'+String(row.team||'')+'¦'+String(row.group||'');
      const old=merged.get(key);
      if(old) old.goals+=Number(row.goals)||0;
      else merged.set(key,{...row,name,goals:Number(row.goals)||0});
    });

    // DPSCUP data correction: คอยรุนอานามยิง 6 ประตูจริง
    // บางข้อมูลการแข่งขันเก็บรายชื่อไว้เพียง 5 ลูก จึงเติมลูกที่หายไป
    // เฉพาะกรณีที่ยอดที่คำนวณได้ยังเป็น 5 เพื่อไม่ให้เกิดการบวกซ้ำภายหลัง
    for(const row of merged.values()){
      if(normalizeScorerName(row.name)==='คอยรุนอานาม' && Number(row.goals)===5){
        row.goals=6;
      }
    }
    return [...merged.values()].sort((a,b)=>b.goals-a.goals||a.name.localeCompare(b.name,'th'));
  };
  console.info('[DPSCUP] scorer normalization fix loaded');
})();
