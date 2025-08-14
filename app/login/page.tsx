"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import InputField from "../_components/forms/InputfField";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PiLockKeyLight } from "react-icons/pi";
import Link from "next/link";
import AuthLayout from "../_components/AuthLayout";
import Button from "../_components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IFormData {
  email: string;
  password: string;
}

interface IErrorInput {
  error: boolean;
  message: string;
}

const Login = () => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const [isEmailError, setIsEmailError] = useState<IErrorInput>({
    error: false,
    message: "",
  });
  const [isPasswordError, setIsPasswordError] = useState<IErrorInput>({
    error: false,
    message: "",
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    // reset error message first
    setIsPasswordError(() => ({ error: false, message: "" }));
    setIsEmailError(() => ({ error: false, message: "" }));

    axios
      .post("/api/login", formData)
      .then((res) => {
        console.log(res);
        // save token in localstorage
        const token = res.data.token;
        localStorage.setItem("token", token);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response.data.message;
        if (errorMessage.toLowerCase().includes("password")) {
          setIsPasswordError(() => ({
            error: true,
            message: errorMessage,
          }));
        } else if (errorMessage.toLowerCase().includes("username")) {
          setIsEmailError(() => ({
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
        {isError && (
          <div className="rounded-md max-w-sm w-full bg-red-50 flex justify-center items-center py-3">
            <span className="text-sm text-red-600 font-medium">
              Gagal login
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
            name="password"
            placeholder="masukan password anda"
            Icon={PiLockKeyLight}
            type="password"
            id="password"
            isError={isPasswordError.error}
            errorMessage={isPasswordError.message}
            required
          />

          <Button type="submit" disabled={isLoading}>
            Masuk
          </Button>
        </form>
        <p className="text-center text-xs text-gray-400 dark:text-gray-200">
          Belum punya akun? registrasi{" "}
          <Link
            href={"/registration"}
            className="text-[var(--primary)] font-semibold"
          >
            di sini
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
