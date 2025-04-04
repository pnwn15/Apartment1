import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

export default function BillingSelection() {
  const [selectedFloor, setSelectedFloor] = useState(1);

  const billData = {
    1: [
      { roomNumber: "10101", price: "8,500 บาท" },
      { roomNumber: "10102", price: "9,000 บาท" },
      { roomNumber: "10103", price: "9,200 บาท" },
      { roomNumber: "10104", price: "9,300 บาท" },
      { roomNumber: "10105", price: "9,500 บาท" },
      { roomNumber: "10106", price: "9,700 บาท" },
    ],
    2: [
      { roomNumber: "10201", price: "10,000 บาท" },
      { roomNumber: "10202", price: "10,200 บาท" },
      { roomNumber: "10203", price: "10,400 บาท" },
      { roomNumber: "10204", price: "10,600 บาท" },
      { roomNumber: "10205", price: "10,800 บาท" },
      { roomNumber: "10206", price: "11,000 บาท" },
    ],
    3: [
      { roomNumber: "10301", price: "11,500 บาท" },
      { roomNumber: "10302", price: "11,700 บาท" },
      { roomNumber: "10303", price: "11,900 บาท" },
      { roomNumber: "10304", price: "12,000 บาท" },
      { roomNumber: "10305", price: "12,200 บาท" },
      { roomNumber: "10306", price: "12,500 บาท" },
    ],
    4: [
      { roomNumber: "10401", price: "13,000 บาท" },
      { roomNumber: "10402", price: "13,200 บาท" },
      { roomNumber: "10403", price: "13,400 บาท" },
      { roomNumber: "10404", price: "13,600 บาท" },
      { roomNumber: "10405", price: "13,800 บาท" },
      { roomNumber: "10406", price: "14,000 บาท" },
    ],
    5: [
      { roomNumber: "10501", price: "15,000 บาท" },
      { roomNumber: "10502", price: "15,200 บาท" },
      { roomNumber: "10503", price: "15,400 บาท" },
      { roomNumber: "10504", price: "15,600 บาท" },
      { roomNumber: "10505", price: "15,800 บาท" },
      { roomNumber: "10506", price: "16,000 บาท" },
    ],
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* หัวข้อ */}
      <h1 className="text-2xl font-bold text-center">เลือกรอบบิล</h1>

      {/* ไอคอนปฏิทิน + ช่องเลือกวันที่ */}
      <div className="flex items-center gap-2 justify-center">
        <FaCalendarAlt className="text-xl text-gray-600" />
        <Input type="date" className="w-full max-w-xs" />
      </div>

      {/* ปุ่มเลือกชั้น */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((floor) => (
          <Button
            key={floor}
            className={`px-4 py-2 ${
              selectedFloor === floor ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedFloor(floor)}
          >
            ชั้น {floor}
          </Button>
        ))}
      </div>

      {/* แสดงบิลค่าใช้จ่าย */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {billData[selectedFloor].map((bill, index) => (
          <div key={index} className="flex justify-center">
            <div className="w-full sm:w-[200px] h-[250px] bg-gray-100 flex flex-col items-center justify-center border rounded-lg shadow-md">
              <MailOutlined className="text-5xl text-blue-500" />
              <p className="text-lg font-semibold">{bill.roomNumber}</p>
              <p className="text-gray-600">{bill.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
