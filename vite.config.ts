import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // เพิ่มบรรทัดนี้
    host: true, // ถ้าต้องการให้เข้าถึงจาก IP อื่นๆ ในเครือข่ายเดียวกันได้ด้วย
    port: 3000, // ถ้าต้องการเปลี่ยนพอร์ตจาก 5173 เป็น 3000
  }
})