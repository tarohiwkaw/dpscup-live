# DPSCUP 2026 — Final v29

ไฟล์ชุดรวมสำหรับ GitHub Pages

## อัปโหลด/แทนที่ไฟล์
- index.html
- admin.html
- summary.html
- bracket.html
- dpspn-logo.png

อย่าเปลี่ยน `firebase-config.js` ถ้าของเดิมเชื่อม Firebase dpscup-live อยู่แล้ว

## ไฟล์ซ้ำ
ถ้ามี `index 3.html` หรือ `index 5.html` ไม่ต้องใช้ และลบออกจาก repo ได้เพื่อไม่ให้สับสน

## Firebase Rules
`firebase-rules.json` เป็นกติกาที่รองรับระบบนี้:
- scores: คนดูอ่านได้ / เฉพาะผู้ล็อกอินเขียนได้
- summary: คนดูอ่านได้ / เฉพาะผู้ล็อกอินเขียนได้
- reports: คนดูส่งรายงานได้ / เฉพาะผู้ล็อกอินอ่านและจัดการรายงานได้

ก่อนเปลี่ยน Rules ควร Export JSON จาก Realtime Database เพื่อสำรองข้อมูล
