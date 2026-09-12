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
