# DPSCUP Live Score — Secure Admin

## หน้าเว็บ
- `index.html` = หน้าคนดู **ดูอย่างเดียว** ไม่มีปุ่มแก้สกอร์
- `admin.html` = หน้าแอดมิน ต้อง Login ด้วย Firebase Authentication
- `firebase-config.js` = Firebase config
- `firebase-rules.json` = Rules ที่ใช้กับ Realtime Database

## ต้องทำใน Firebase ก่อนใช้ระบบแอดมิน

1. Firebase Console → **Authentication**
2. เปิด **Sign-in method**
3. เปิด **Email/Password**
4. ไปที่ **Users**
5. กด **Add user**
6. สร้างอีเมล + รหัสผ่านสำหรับแอดมิน
7. ไม่ต้องเปิดระบบสมัครสมาชิกในเว็บ เพราะเรามีเฉพาะหน้า Login

## Database Rules

ตั้ง Realtime Database Rules เป็น:

```json
{
  "rules": {
    "dpscup-2-scores": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

ผลคือ:
- คนทั่วไปไม่ต้อง Login → อ่านคะแนนได้
- คนทั่วไป → เขียน/แก้คะแนนไม่ได้
- บัญชีที่ Login ด้วย Firebase Auth → เขียนคะแนนได้

เพื่อให้ปลอดภัย ควรสร้างเฉพาะบัญชีแอดมินใน Firebase และไม่เปิดช่องสมัครสมาชิกให้คนทั่วไป

## เรียลไทม์

แอดมินบันทึกคะแนน → Firebase Realtime Database → หน้า `index.html` ของคนดูที่เปิดอยู่รับการเปลี่ยนแปลงทันที

ไม่ต้อง Refresh

## Deploy

อัปโหลด `index.html`, `admin.html`, `firebase-config.js` และ `firebase-rules.json` เข้า GitHub repository เดิม

> `firebase-rules.json` เป็นไฟล์อ้างอิงสำหรับตั้งค่า Rules ไม่ได้ถูกโหลดโดยหน้าเว็บ
