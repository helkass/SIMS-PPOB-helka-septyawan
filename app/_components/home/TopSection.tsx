"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import axios from "axios";

interface IFormData {
  first_name: string;
  last_name: string;
  profile_image: string;
}

const TopSection = () => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("0");

  const [formData, setFormData] = useState<IFormData>({
    first_name: "",
    last_name: "",
    profile_image: "",
  });

  function fetchDataUser() {
    axios.get("/api/profile").then((res) => {
      const user = res.data.data;
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
      });
    });
  }

  useEffect(() => {
    fetchDataBalance();
    fetchDataUser();
  }, []);

  function fetchDataBalance() {
    axios.get("/api/balance").then((res) => {
      const balanceData = res.data.data.balance;
      const angka = Number(balanceData.toString().replace(/\D/g, ""));
      setBalance(angka.toLocaleString("id-ID"));
    });
  }

  return (
    <section className="flex py-6">
      <div className="w-full md:w-5/12 space-y-5">
        <Image
          src={formData.profile_image || "/assets/images/ProfilePhoto.png"}
          objectFit="cover"
          width={80}
          height={80}
          alt="profile image"
        />
        <div>
          <p>Selamat Datang,</p>
          <h4 className="text-3xl font-semibold capitalize">
            {formData.first_name} {formData.last_name}
          </h4>
        </div>
      </div>
      <div className="w-full md:w-7/12">
        <div className="bg-red-600 rounded-xl p-5 flex flex-col gap-3 text-white text-sm">
          <span>Saldo anda</span>
          <h6 className="text-3xl font-semibold flex items-center gap-2">
            Rp{" "}
            <span className="flex">
              {showBalance ? (
                balance
              ) : (
                <>
                  <GoDotFill size={20} />
                  <GoDotFill size={20} />
                  <GoDotFill size={20} />
                  <GoDotFill size={20} />
                  <GoDotFill size={20} />
                  <GoDotFill size={20} />
                  <GoDotFill size={20} />
                </>
              )}
            </span>
          </h6>
          <div className="flex gap-2 items-center">
            <span>Lihat saldo</span>
            <button
              className="cursor-pointer"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <IoEyeOffOutline size={16} />
              ) : (
                <IoEyeOutline size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
