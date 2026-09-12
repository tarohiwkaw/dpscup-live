DPSCUP v21 — Preview Summary Fix

แก้ปัญหาหน้าแรกไม่แสดงข้อมูลสรุปผลที่บันทึกแล้ว แต่หน้า summary.html แสดงข้อมูลได้

ไฟล์:
- index.html — แก้ให้โหลด dpscup-2-summary บนหน้าแรกจริง
- admin.html — ระบบเดิมจาก v20
- summary.html — ระบบเดิมจาก v20
- dpspn-logo.png — โลโก้

ให้แทนที่ index.html, admin.html, summary.html และ dpspn-logo.png ใน GitHub
เก็บ firebase-config.js เดิมไว้

Firebase Rules ที่ต้องมี:
{
  "rules": {
    "dpscup-2-scores": { ".read": true, ".write": "auth != null" },
    "dpscup-2-reports": { ".read": "auth != null", ".write": true },
    "dpscup-2-summary": { ".read": true, ".write": "auth != null" }
  }
}


## v23 — ผังการแข่งขันจากข้อมูลจริง
- ม.ต้นใส่ทีมตามภาพผังที่ผู้จัดส่งมา: สาย A–D
- ม.ปลายใช้ทีมที่เหลือจากตารางแข่ง: ไม่ได้แชมป์ ไม่ขึ้นมัสยิด, วัยรุ่นสายฮา X ทีเด็ด, Dewan G.20, วัยรุ่นสายฮา X ซีเครท
- แอดมินสามารถจัด 4 ทีม ม.ปลายเข้ากลุ่ม A–D จากหน้า admin แล้วบันทึกลง Firebase ที่ `dpscup-bracket`
- หน้า bracket จะอัปเดตข้อมูล ม.ปลายแบบเรียลไทม์
- ไม่ได้ใส่ทีมซ้ำ `DARK RAVEN(S) X VORTEX` เพราะเป็นชื่อเดียวกันในข้อมูล แต่มีการสะกดต่างกัน

### ถ้าใช้ Firebase Rules แบบปลอดภัย
ให้ใช้แนวคิดนี้ (แทนกฎ Test Mode เดิม):
```json
{
  "rules": {
    "dpscup-2-scores": { ".read": true, ".write": "auth != null" },
    "dpscup-2-summary": { ".read": true, ".write": "auth != null" },
    "dpscup-bracket": { ".read": true, ".write": "auth != null" },
    "dpscup-2-reports": { ".read": "auth != null", ".write": true }
  }
}
```
