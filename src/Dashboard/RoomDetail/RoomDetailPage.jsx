import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import rooms from "../roomData.json"; // ตรวจสอบ path ของ roomData.json
import roomData from "./roomData1.json"; // ตรวจสอบ path ของ roomData1.json

function RoomDetailPage() {
  const { roomNumber } = useParams(); // รับหมายเลขห้องจาก URL
  const [roomInfo, setRoomInfo] = useState(null);
  const [roomUsageData, setRoomUsageData] = useState(null);

  useEffect(() => {
    const room = rooms.find((r) => r.roomNumber === roomNumber);
    if (room) {
      setRoomInfo(room);
      const usageData = roomData[roomNumber];
      if (usageData) {
        setRoomUsageData(usageData);
      } else {
        setRoomUsageData(null); // ถ้าไม่พบข้อมูลการใช้ไฟฟ้าและน้ำ
      }
    } else {
      setRoomInfo(null); // ถ้าห้องไม่พบใน rooms
    }
  }, [roomNumber]);

  // ตรวจสอบการแสดงผลหากห้องหรือข้อมูลการใช้ไฟฟ้า/น้ำไม่พบ
  if (!roomInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">ไม่พบข้อมูลห้องนี้</p>
      </div>
    );
  }

  if (!roomUsageData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">
          ไม่พบข้อมูลการใช้ไฟฟ้าและน้ำของห้องนี้
        </p>
      </div>
    );
  }

  // คำนวณผลรวมการใช้ไฟฟ้าและน้ำในแต่ละเดือน
  const calculateTotals = (usageData) => {
    const totalElectricity = usageData.electricityUsage.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    const totalWater = usageData.waterUsage.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    return { totalElectricity, totalWater };
  };

  const { totalElectricity, totalWater } = calculateTotals(roomUsageData);

  // สมมติว่าค่าบริการไฟฟ้าและน้ำ
  const electricityRate = 5; // ราคาค่าไฟฟ้าต่อ kWh (ตัวอย่าง)
  const waterRate = 3; // ราคาค่าน้ำต่อลิตร (ตัวอย่าง)

  return (
    <div className="p-6 w-full">
      <div className="bg-white w-full shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          รายละเอียดห้อง {roomInfo.roomNumber}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-600">สถานะ:</p>
            <p className="text-xl font-bold">{roomInfo.statusText}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-600">ชั้น:</p>
            <p className="text-xl font-bold">{roomInfo.floor}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-600">การใช้ไฟฟ้า:</p>
            <p className="text-xl font-bold">{roomInfo.electricity} kWh</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-600">การใช้น้ำ:</p>
            <p className="text-xl font-bold">{roomInfo.water} ลิตร</p>
          </div>
        </div>

        {/* กราฟการใช้ไฟฟ้า */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            การใช้ไฟฟ้า (หน่วย kWh)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roomUsageData.electricityUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* กราฟการใช้น้ำ */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            การใช้น้ำ (ลิตร)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roomUsageData.waterUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ตารางรายงานการใช้ไฟฟ้าและน้ำ */}
        <div className="mt-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            รายงานการใช้ไฟฟ้าและน้ำ
          </h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left font-semibold text-gray-600">
                  เดือน
                </th>
                <th className="p-2 text-left font-semibold text-gray-600">
                  การใช้ไฟฟ้า (kWh)
                </th>
                <th className="p-2 text-left font-semibold text-gray-600">
                  การใช้น้ำ (ลิตร)
                </th>
                <th className="p-2 text-left font-semibold text-gray-600">
                  รวมบิลชำระค่าไฟและน้ำ
                </th>
              </tr>
            </thead>
            <tbody>
              {roomUsageData.electricityUsage.map((data, index) => {
                const electricityValue = data.value;
                const waterValue = roomUsageData.waterUsage[index]?.value || 0;

                return (
                  <tr key={index} className="border-t">
                    <td className="p-2">{data.time}</td>
                    <td className="p-2">{electricityValue} kWh</td>
                    <td className="p-2">{waterValue} ลิตร</td>
                    <td className="p-2">
                      {((electricityValue * electricityRate) +
                        (waterValue * waterRate)).toFixed(2)}{" "}
                      บาท
                    </td>
                  </tr>
                );
              })}       
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPage;
