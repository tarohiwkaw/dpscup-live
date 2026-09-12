DPSCUP v20

ไฟล์หลัก: index.html, admin.html, summary.html, dpspn-logo.png
เก็บ firebase-config.js เดิมไว้ใน GitHub

Firebase Realtime Database Rules:
{
  "rules": {
    "dpscup-2-scores": { ".read": true, ".write": "auth != null" },
    "dpscup-2-reports": { ".read": "auth != null", ".write": true },
    "dpscup-2-summary": { ".read": true, ".write": "auth != null" }
  }
}

ข้อมูลทีมในตารางการแข่งขันชุดปัจจุบันตามที่ผู้ใช้ระบุเป็น ม.ต้น ทั้งหมด จึงกำหนด group="ม.ต้น" ให้ทุกคู่ที่มีอยู่ในตาราง เพื่อให้ดาวซัลโวแยกถูกต้อง ไม่ตกไปอยู่ใน "ไม่ระบุรุ่น". ช่องสรุป ม.ปลายยังคงมีไว้สำหรับกรอกผลของ ม.ปลายเมื่อมีข้อมูล.
