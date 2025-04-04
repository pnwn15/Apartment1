import React from "react";
import { FaTint, FaBolt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MeterReading = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">จดมิเตอร์</h2>

      {/* ปุ่มเลือกจดมิเตอร์ */}
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-screen-md mb-6">
        <button
          onClick={() => navigate("/water-meter")}
          className="flex items-center justify-center w-full sm:w-[250px] h-[56px] bg-[#00D9FF] border border-[#00D9FF] text-white font-medium rounded-lg cursor-pointer hover:bg-[#00C4E6] transition"
        >
          <FaTint className="mr-2" /> จดมิเตอร์ค่าน้ำ
        </button>

        <button
          onClick={() => navigate("/electric-meter")}
          className="flex items-center justify-center w-full sm:w-[250px] h-[56px] bg-[#FF8484] border border-[#FF8484] text-white font-medium rounded-lg cursor-pointer hover:bg-[#FF6F6F] transition"
        >
          <FaBolt className="mr-2" /> จดมิเตอร์ค่าไฟ
        </button>
      </div>

      {/* ตารางข้อมูล */}
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 w-full text-sm sm:text-base">
              <th className="border px-4 py-2 text-center">ชั้นที่ 1</th>
            </tr>
            <tr className="bg-gray-200 text-xs sm:text-sm md:text-base">
              <th className="border px-4 py-2">ห้อง</th>
              <th className="border px-4 py-2">สถานะ</th>
              <th className="border px-4 py-2">เลขมิเตอร์เดือนก่อน</th>
              <th className="border px-4 py-2">เลขมิเตอร์ล่าสุด</th>
              <th className="border px-4 py-2">หน่วยที่ใช้</th>
            </tr>
          </thead>
          <tbody>
            {[
              { room: "101", prev: "10369", curr: "10521", unit: "6421" },
              { room: "102", prev: "10245", curr: "10001", unit: "6000" },
            ].map((row, index) => (
              <tr key={index} className="text-xs sm:text-sm md:text-base">
                <td className="border px-4 py-2 text-center">{row.room}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex items-center justify-center">
                    <FaUser />
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">{row.prev}</td>
                <td className="border px-4 py-2 text-center">{row.curr}</td>
                <td className="border px-4 py-2 text-center">{row.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeterReading;
