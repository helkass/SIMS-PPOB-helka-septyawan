"use client";

import React, { useEffect, useState } from "react";
import TabFilter, { getBulanSekarang } from "./TabFilter";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

interface ITransaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}
const DataTransaction = () => {
  const [activeMonth, setActiveMonth] = useState<string>(getBulanSekarang());
  const [data, setData] = useState<ITransaction[]>([]);
  const [limit, setLimit] = useState<number>(3);

  function fetchData(param?: string) {
    axios.get(`/api/transaction?${param}`).then((res) => {
      const transactions = res.data.data;
      setData((prev) => [...prev, ...transactions.records]);
    });
  }

  function filteredData(param: string) {
    setActiveMonth(param);
    // reset limit
    setLimit(3);
    fetchData(`offset=0&limit=3&month=` + param);
  }

  useEffect(() => {
    fetchData(`offset=0&limit=${limit}`);
  }, [limit]);

  return (
    <div className="space-y-4">
      <TabFilter
        setActiveMonth={(m) => filteredData(m)}
        activeMonth={activeMonth}
      />
      {data.length == 0 ? (
        <div className="w-full flex justify-center items-center min-h-44">
          <span className="text-xs text-gray-400 text-center">
            Maaf tidak ada data histori transaksi saat ini
          </span>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-5 justify-center items-center">
          {data.map((item, i) => (
            <div
              key={i}
              className="border border-gray-100 w-full rounded-md py-2 px-4 flex justify-between items-start"
            >
              {/* left content */}
              <div className="flex flex-col gap-1">
                <h5 className="text-lg text-emerald-500 font-semibold flex items-center">
                  <span className="text-xs">
                    <FaPlus />
                  </span>
                  Rp.{item.total_amount}
                </h5>
                <span className="text-xs text-gray-300">
                  {formatTanggal(item.created_on)}
                </span>
              </div>

              {/* right content */}
              <div>
                <span className="text-xs">{item.description}</span>
              </div>
            </div>
          ))}
          <button
            onClick={() => setLimit(limit + 3)}
            className="font-semibold text-sm hover:bg-gray-50 rounded text-[var(--primary)] py-2 w-full"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

function formatTanggal(timestamp: string) {
  const date = new Date(timestamp);

  const tanggal = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const waktu = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${tanggal} ${waktu} WIB`;
}

export default DataTransaction;
