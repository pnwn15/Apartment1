import React from "react";
import {
  CarryOutOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  AuditOutlined,
} from "@ant-design/icons";

function CardComponent({
  occupancyRate,
  reservedRooms,
  overdueRooms,
  availableRooms,
}) {
  const cards = [
    {
      title: `${occupancyRate}%`,
      description: "อัตราการเข้าพัก",
      icon: <CarryOutOutlined className="text-xl text-blue-600" />,
      borderColor: "border-blue-300",
    },
    {
      title: `${reservedRooms} ห้อง`,
      description: "ห้องจอง",
      icon: <ClockCircleOutlined className="text-xl text-yellow-600" />,
      borderColor: "border-yellow-300",
    },
    {
      title: `${overdueRooms} ห้อง`,
      description: "ค้างชำระ",
      icon: <UsergroupAddOutlined className="text-xl text-red-600" />,
      borderColor: "border-red-300",
    },
    {
      title: `${availableRooms} ห้อง`,
      description: "ห้องว่าง",
      icon: <AuditOutlined className="text-xl text-green-600" />,
      borderColor: "border-green-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:w-full lg:grid-cols-4 md:grid-cols-2 gap-4 lg:w-full w-92">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex flex-col p-6 bg-white rounded-lg shadow-md border-l-4 ${card.borderColor} ${card.bgColor}`}
        >
          <div className="flex justify-between items-start w-full">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800">{card.title}</h3>
              <p className="text-gray-600 mt-1">{card.description}</p>
            </div>
            <div className="p-3 rounded-full bg-white shadow-sm ml-4">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardComponent;
