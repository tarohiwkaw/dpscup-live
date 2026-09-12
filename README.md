DPSCUP v15 — รายงานปัญหาถึงแอดมินโดยตรง

ไฟล์:
- index.html — หน้าเว็บคนดู
- admin.html — หน้าแอดมิน
- dpspn-logo.png — โลโก้

สำคัญ: เก็บ firebase-config.js เดิมไว้ใน repo

Firebase Realtime Database Rules ที่ต้องมีเพิ่มสำหรับระบบรายงาน:
{
  "rules": {
    "dpscup-2-scores": {
      ".read": true,
      ".write": "auth != null"
    },
    "dpscup-2-reports": {
      ".read": "auth != null",
      ".write": true,
      "$reportId": {
        ".validate": "newData.hasChildren(['type','detail','createdAt','status']) && newData.child('type').isString() && newData.child('detail').isString() && newData.child('detail').val().length <= 1000"
      }
    }
  }
}

ระบบรายงาน:
- คนดูส่งรายงานจากหน้าเว็บ -> Firebase -> หน้า Admin แบบเรียลไทม์
- Admin เพิ่มรายงานเองได้
- Admin ทำเครื่องหมายแก้ไขแล้ว / เปิดกลับ / ลบ / คัดลอกได้
