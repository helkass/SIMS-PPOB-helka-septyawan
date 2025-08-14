"use client";
import React from "react";

interface ITabFilter {
  activeMonth: string;
  setActiveMonth: (month: string) => void;
}

const TabFilter = ({
  activeMonth = getBulanSekarang(),
  setActiveMonth,
}: ITabFilter) => {
  return (
    <div className="flex flex-nowrap gap-2">
      {months.map((item, i) => (
        <button
          onClick={() => setActiveMonth(item)}
          className={`font-medium text-sm capitalize ${
            activeMonth.toLowerCase() === item.toLowerCase()
              ? "text-black"
              : "text-gray-400"
          }`}
          key={i}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export function getBulanSekarang() {
  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const sekarang = new Date();
  return bulanIndo[sekarang.getMonth()];
}

const months = ["maret", "mei", "juni", "juli", "agustus", "september"];

export default TabFilter;
