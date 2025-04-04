import React from 'react'
import { BellOutlined } from '@ant-design/icons'; // ใช้ไอคอนระฆังจาก Ant Design

function Notificate() {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-amber-500 w-full border">
        <div className="flex items-center">
          {/* ไอคอนระฆังจาก Ant Design */}
          <BellOutlined className="text-white mr-3" style={{ fontSize: '24px' }} />
          <h2 className="text-2xl font-bold text-gray-800">หัวข้อของการ์ด</h2>
        </div>
      </div>

      <div className="px-6 py-4">
        <p className="text-gray-600">
          นี่คือข้อความแจ้งที่คุณต้องการแสดงในส่วนนี้ สามารถเพิ่มเนื้อหาที่ต้องการได้ตามความเหมาะสม เช่น การแจ้งเตือนหรือข้อมูลอื่น ๆ ที่เกี่ยวข้อง
        </p>
      </div>
    </div>
  )
}

export default Notificate
