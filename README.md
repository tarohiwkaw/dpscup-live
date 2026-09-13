# DPSCUP CLEAN REBUILD v49

เพิ่มระบบนับผู้เข้าชมเว็บไซต์แบบ Page Views ด้วย Firebase Realtime Database

## สิ่งที่เพิ่ม
- `analytics.js` นับการเปิดหน้า `index.html`, `summary.html`, `bracket.html`
- Admin เพิ่มแท็บ `📊 ผู้เข้าชม`
- แสดงยอดเข้าชมทั้งหมด / วันนี้ / 7 วันล่าสุด / หน้าที่เปิดมากสุด
- ใช้ Firebase node `dpscup-2-analytics`

## สำคัญ: อัปเดต Firebase Rules
ใช้ไฟล์ `firebase-rules.json` ชุดนี้ใน Firebase Console → Realtime Database → Rules แล้วกด Publish

ระบบนี้นับ **page views** ไม่ใช่จำนวนผู้ชมที่ไม่ซ้ำกัน (unique visitors)
