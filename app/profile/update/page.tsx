"use client";

import DefaultAlert from "@/app/_components/alerts/DefaultAlert";
import Button from "@/app/_components/Button";
import InputField from "@/app/_components/forms/InputfField";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

interface IFormData {
  email: string;
  first_name: string;
  last_name: string;
}

interface IErrorInput {
  error: boolean;
  message: string;
}

export default function UpdateProfile() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    first_name: "",
    last_name: "",
  });

  const [isEmailError, setIsEmailError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [isFirstNameError, setIsFirstNameError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [isLastNameError, setIsLastNameError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [isError, setError] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    // reset error message first
    setIsEmailError((prev) => ({ error: false, message: "" }));
    setIsFirstNameError((prev) => ({ error: false, message: "" }));
    setIsLastNameError((prev) => ({ error: false, message: "" }));

    axios
      .put("/api/profile", formData)
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response.data.message;
        if (errorMessage.toLowerCase().includes("email")) {
          setIsEmailError((prev) => ({
            error: true,
            message: errorMessage,
          }));
        } else if (errorMessage.toLowerCase().includes("username")) {
          setIsFirstNameError((prev) => ({
            error: true,
            message: errorMessage,
          }));
        } else if (errorMessage.toLowerCase().includes("last_name")) {
          setIsLastNameError((prev) => ({
            error: true,
            message: errorMessage,
          }));
        } else {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    setTimeout(() => {
      setError(false);
      setSuccess(false);
    }, 5000);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 mt-6">
      {isError && (
        <DefaultAlert message="Data profile gagal diupdate" variant="error" />
      )}
      {isSuccess && <DefaultAlert message="Data profile berhasil diupdate" />}
      <InputField
        label="Email"
        name="email"
        onChange={(e) => handleChange(e)}
        defaultValue={formData.email}
        placeholder="masukan email anda"
        Icon={MdOutlineAlternateEmail}
        type="email"
        id="email"
        required
        errorMessage={isEmailError.message}
        isError={isEmailError.error}
      />
      <InputField
        label="Nama Depan"
        name="first_name"
        placeholder="nama depan"
        onChange={(e) => handleChange(e)}
        Icon={FaRegUser}
        type="text"
        id="first_name"
        defaultValue={formData.first_name}
        errorMessage={isFirstNameError.message}
        isError={isFirstNameError.error}
        required
      />
      <InputField
        label="Nama Belakang"
        name="last_name"
        placeholder="nama belakang"
        onChange={(e) => handleChange(e)}
        Icon={FaRegUser}
        type="text"
        id="last_name"
        defaultValue={formData.last_name}
        errorMessage={isLastNameError.message}
        isError={isLastNameError.error}
        required
      />

      <Button disabled={isLoading} type="submit">
        Simpan
      </Button>
    </form>
  );
}
