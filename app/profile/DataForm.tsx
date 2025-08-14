"use client";
import React, { useEffect, useState } from "react";
import InputField from "../_components/forms/InputfField";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";

interface IFormData {
  email: string;
  first_name: string;
  last_name: string;
}

const DataForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    first_name: "",
    last_name: "",
  });

  function fetchData() {
    axios.get("/api/profile").then((res) => {
      const user = res.data.data;
      setFormData({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <InputField
        label="Email"
        name="email"
        defaultValue={formData.email}
        placeholder="masukan email anda"
        Icon={MdOutlineAlternateEmail}
        type="email"
        id="email"
        readonly
      />
      <InputField
        label="Nama Depan"
        name="firstName"
        placeholder="nama depan"
        Icon={FaRegUser}
        type="text"
        id="firstName"
        defaultValue={formData.first_name}
        readonly
      />
      <InputField
        label="Nama Belakang"
        name="last_name"
        placeholder="nama belakang"
        Icon={FaRegUser}
        type="text"
        id="last_name"
        defaultValue={formData.last_name}
        readonly
      />
    </>
  );
};

export default DataForm;
