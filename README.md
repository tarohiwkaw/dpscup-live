# DPSCUP Live Score

## ไฟล์
- `index.html` = หน้าให้คนดู
- `admin.html` = หน้าแอดมินแก้สกอร์
- `firebase-config.js` = config ของ Firebase

## ตั้งค่า
1. สร้างโปรเจกต์ใน Firebase Console
2. เพิ่ม Web App และคัดลอก config ลง `firebase-config.js`
3. เปิด Realtime Database
4. สำหรับระบบจริง แนะนำเปิด Firebase Authentication และใช้ Rules:
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
5. สร้างบัญชีผู้ดูแลใน Authentication แล้วค่อยปรับหน้า admin ให้ล็อกอินด้วย Firebase Auth
6. Deploy ทั้งโฟลเดอร์ไปยัง GitHub Pages / Netlify / Vercel

### การทำงาน
เมื่อแอดมินบันทึกผล `admin.html` จะเขียนข้อมูลไป Realtime Database และ `index.html` ที่คนอื่นเปิดอยู่จะรับ event แล้วเปลี่ยนคะแนนทันทีโดยไม่ต้อง refresh

> PIN ในไฟล์ config เป็นเพียงชั้น UI และไม่ใช่ระบบความปลอดภัย เพราะผู้ใช้สามารถเห็น JavaScript ได้ ความปลอดภัยจริงควรใช้ Firebase Authentication + Database Rules
