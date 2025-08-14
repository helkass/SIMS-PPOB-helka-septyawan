"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

interface IFormData {
  first_name: string;
  last_name: string;
  profile_image: string;
}

const Header = () => {
  const [formData, setFormData] = useState<IFormData>({
    first_name: "",
    last_name: "",
    profile_image: "",
  });

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axios.put("/api/profile/image", formData).then((res) => {
      console.log(res);
      fetchData();
    });
  }

  function fetchData() {
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
    fetchData();
  }, []);
  return (
    <>
      <label className="flex items-center gap-3 relative rounded-full cursor-pointer">
        <Image
          src={formData.profile_image || `/assets/images/ProfilePhoto.png`}
          alt="logo"
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
        <input
          type="file"
          accept="image/png, image/jpg, image/webp"
          className="hidden"
          onChange={handleChangeImage}
        />
        <span className="rounded-full border border-gray-400 absolute right-0 -bottom-1 p-1 bg-white">
          <MdModeEditOutline size={14} />
        </span>
      </label>
      <h1 className="text-2xl max-w-xs text-center font-semibold capitalize">
        {formData.first_name} {formData.last_name}
      </h1>
    </>
  );
};

export default Header;
