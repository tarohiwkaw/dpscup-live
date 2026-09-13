DPSCUP CLEAN REBUILD v37

สำคัญ: ต้องเก็บ firebase-config.js ตัวเดิมของโปรเจกต์ dpscup-live ไว้ใน repo

แก้บัค Login: app.js จะ initialize Firebase จาก window.DPSCUP_FIREBASE_CONFIG เพียงครั้งเดียว ก่อนเรียก firebase.auth()/database ทำให้หน้า Admin ไม่ขึ้นว่า Firebase App ยังไม่ถูกโหลด และใช้โปรเจกต์ dpscup-live ตัวเดียวกันทุกหน้า


v38: ปรับหน้าเพิ่มโปรแกรมให้ทีม A/B เป็น dropdown โดยดึงรายชื่อทีมจากโปรแกรมที่มีอยู่และกรองตามรุ่น; เวลาแก้รายการเดิมจะเลือกทีมเดิมให้อัตโนมัติ.
