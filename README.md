# DPSCUP CLEAN REBUILD v50

ระบบ DPSCUP LIVE พร้อมระบบนับ Page Views ผ่าน Firebase Realtime Database

## โครงสร้างสำคัญ
- `index.html` — หน้าหลัก
- `summary.html` — สรุปผล
- `bracket.html` — ผังการแข่งขัน
- `admin.html` — ระบบแอดมิน
- `analytics.js` — ตัวนับ Page Views
- `firebase-rules.json` — Rules ที่รวม `dpscup-2-analytics`

## สำคัญ
ไฟล์นี้ตั้งใจให้ทุกไฟล์อยู่ที่ Root ของ GitHub Pages ไม่อยู่ในโฟลเดอร์ย่อย

หากใน repo เดิมมี `app.js`, `style.css`, และ `firebase-config.js` อยู่แล้ว ให้เก็บไฟล์เดิมไว้ เพราะ HTML เรียกใช้ไฟล์เหล่านี้

หลังอัปโหลด ต้อง Publish Firebase Realtime Database Rules ที่มี node `dpscup-2-analytics` ด้วย

ตัวนับเป็น Page Views: การเปิด/รีเฟรชหน้า 1 ครั้ง = 1 view ไม่ใช่จำนวนคนไม่ซ้ำกัน
