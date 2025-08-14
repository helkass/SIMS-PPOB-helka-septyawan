"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import InputField from "../_components/forms/InputfField";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiLockKeyLight } from "react-icons/pi";
import Link from "next/link";
import AuthLayout from "../_components/AuthLayout";
import { FaRegUser } from "react-icons/fa";
import axiosInstance from "@/libs/axios";
import Button from "../_components/Button";

interface IFormData {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
}

/**
 * 
  "email": "user@nutech-integrasi.com",
  "first_name": "User",
  "last_name": "Nutech",
  "password": "abcdef1234"
}
 */

interface IErrorInput {
  error: boolean;
  message: string;
}

const Registration = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    password_confirmation: "",
  });

  const [isEmailError, setIsEmailError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [isPasswordError, setIsPasswordError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [isPasswordConfirmError, setIsPasswordConfirmError] =
    useState<IErrorInput>({
      error: false,
      message: "",
    });
  const [isfirst_nameError, setIsfirst_nameError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [islast_nameError, setIslast_nameError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // reset error message first
    setIsPasswordError(() => ({ error: false, message: "" }));
    setIsPasswordConfirmError(() => ({ error: false, message: "" }));
    setIsEmailError(() => ({ error: false, message: "" }));
    setIsfirst_nameError(() => ({ error: false, message: "" }));
    setIslast_nameError(() => ({ error: false, message: "" }));

    // cek same confirm password
    if (formData.password !== formData.password_confirmation) {
      setIsPasswordConfirmError(() => ({
        error: true,
        message: "konfirmasi password tidak sama",
      }));
      setLoading(false);
      return;
    }

    axiosInstance
      .post("/registration", formData)
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response.data.message;
        if (errorMessage.toLowerCase().includes("password")) {
          setIsPasswordError(() => ({
            error: true,
            message: errorMessage,
          }));
        } else if (errorMessage.toLowerCase().includes("email")) {
          setIsEmailError(() => ({
            error: true,
            message: errorMessage,
          }));
        } else if (errorMessage.toLowerCase().includes("first_name")) {
          setIsfirst_nameError(() => ({
            error: true,
            message: errorMessage,
          }));
        } else if (errorMessage.toLowerCase().includes("last_name")) {
          setIslast_nameError(() => ({
            error: true,
            message: errorMessage,
          }));
        } else {
          alert(errorMessage);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  }

  return (
    <AuthLayout>
      <div className="flex h-full flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/images/Logo.png"
            alt="logo"
            width={30}
            height={40}
            style={{ objectFit: "cover" }}
          />
          <h6 className="font-semibold">SIMS PPOB</h6>
        </div>
        <h1 className="text-2xl max-w-xs text-center font-semibold">
          Masuk atau buat akun untuk memulai
        </h1>
        {isSuccess && (
          <div className="rounded-md max-w-sm w-full bg-emerald-50 flex justify-center items-center py-3">
            <span className="text-sm text-emerald-600 font-medium">
              Berhasil mendaftar, Silahkan melakukan login ulang
            </span>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-3 mt-6"
        >
          <InputField
            onChange={handleChange}
            name="email"
            placeholder="masukan email anda"
            Icon={MdOutlineAlternateEmail}
            type="email"
            id="email"
            isError={isEmailError.error}
            errorMessage={isEmailError.message}
            required
          />

          <InputField
            onChange={handleChange}
            name="first_name"
            placeholder="nama depan"
            Icon={FaRegUser}
            type="text"
            id="first_name"
            isError={isfirst_nameError.error}
            errorMessage={isfirst_nameError.message}
            required
          />
          <InputField
            onChange={handleChange}
            name="last_name"
            placeholder="nama belakang"
            Icon={FaRegUser}
            type="text"
            id="last_name"
            isError={islast_nameError.error}
            errorMessage={islast_nameError.message}
            required
          />
          <InputField
            onChange={handleChange}
            name="password"
            placeholder="masukan password anda"
            Icon={PiLockKeyLight}
            type="password"
            id="password"
            isError={isPasswordError.error}
            errorMessage={isPasswordError.message}
            required
          />
          <InputField
            onChange={handleChange}
            name="password_confirmation"
            placeholder="konfirmasi password"
            Icon={PiLockKeyLight}
            type="password"
            id="password_confirmation"
            isError={isPasswordConfirmError.error}
            errorMessage={isPasswordConfirmError.message}
            required
          />

          <Button type="submit" disabled={isLoading}>
            Registrasi
          </Button>
        </form>
        <p className="text-center text-xs text-gray-400 dark:text-gray-200">
          Sudah punya akun? login{" "}
          <Link href={"/login"} className="text-[var(--primary)] font-semibold">
            di sini
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Registration;
