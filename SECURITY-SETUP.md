# DPSCUP v65 — Security Hardening

เป้าหมาย: ลดความเสี่ยงจากการแก้คะแนน ตาราง สรุปผล และประกาศฝนโดยผู้ที่ไม่ใช่ทีมงาน

## สำคัญ
ไม่มีระบบเว็บใดรับประกันว่า “แฮ็กไม่ได้ 100%” ได้ แต่ชุดนี้ย้ายสิทธิ์สำคัญไปไว้ที่ Firebase Security Rules ซึ่งบังคับใช้ฝั่งเซิร์ฟเวอร์ ไม่ใช่แค่ JavaScript หน้าเว็บ

## 1) ตั้ง Admin UID ก่อน
1. Firebase Console → Authentication → Users
2. เปิดบัญชีทีมงานที่จะเป็นแอดมิน แล้วคัดลอก User UID
3. Firebase → Realtime Database → Data
4. สร้าง:
   `dpscup-admins` → `<UID>` → `true`
5. ทำแบบนี้เฉพาะ UID ของทีมงานจริง

## 2) เปลี่ยน Rules
ใช้ไฟล์ `firebase-rules-secure.json` แล้วกด Publish

หลังจากนั้น:
- คะแนน/ตาราง/สรุป/ประกาศฝน: แก้ได้เฉพาะ UID ที่อยู่ใน `dpscup-admins`
- รายงานจากผู้ชม: สร้างใหม่ได้ แต่ผู้ชมแก้/ลบรายงานเดิมไม่ได้
- Analytics: สร้าง event ใหม่ได้ แต่แก้/ลบยอดเดิมไม่ได้
- อ่านรายงานและ analytics: เฉพาะแอดมิน

## 3) App Check (แนะนำมาก)
Firebase Console → App Check → เลือกเว็บ `DPSCUP Live Web` → ใช้ reCAPTCHA Enterprise หรือ reCAPTCHA v3 → ลงทะเบียนโดเมน GitHub Pages → ทดสอบ metrics ก่อน แล้วเปิด Enforcement สำหรับ Realtime Database

ในโค้ด v65 รองรับ App Check แล้ว: ใส่ `window.DPSCUP_APP_CHECK_SITE_KEY = "คีย์ของเว็บคุณ"` ใน `firebase-config.js` แล้วรีเฟรชเว็บ จากนั้นเปิด Enforcement หลังตรวจ metrics แล้ว

สำหรับการเปิด App Check ต้องใช้ site key ของคุณเอง จึงไม่ควรฝังคีย์ตัวอย่างของผู้อื่น

## 4) หลังเปิด Rules
ทดสอบ:
- คนทั่วไปยังดูคะแนน/ตาราง/สรุปได้
- Admin ที่ UID อยู่ใน `dpscup-admins` แก้ข้อมูลได้
- คนทั่วไปเปิดหน้าเว็บแล้ว analytics เพิ่มได้
- ผู้ชมส่งรายงานได้ แต่แก้/ลบรายงานไม่ได้
- ผู้ชมไม่สามารถเขียน `dpscup-2-scores`, `dpscup-2-schedule`, `dpscup-2-summary` หรือ `dpscup-2-weather-announcement` ได้

ไฟล์ `index.html` ยังใช้วิดีโอฝน `rain-video.mp4` และไม่มีเสียงฝน
