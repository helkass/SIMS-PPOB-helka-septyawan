"use client";

import React, { FormEvent, useState } from "react";
import { MdMoney } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IconType } from "react-icons";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Alert, { themeTypes } from "@/app/_components/alerts/Alert";
import InputField from "@/app/_components/forms/InputfField";
import Button from "@/app/_components/Button";

interface IValueAlert {
  Icon: IconType;
  theme: themeTypes;
  subtitle: string;
  title: string;
  submitTitle: string;
  isShow: boolean;
  message?: string;
}

interface IFormData {
  service: string;
}

interface IErrorInput {
  error: boolean;
  message: string;
}

const FormData = ({ service }: IFormData) => {
  const [nominal, setNominal] = useState<string>("");
  const [valueAlert, setValueAlert] = useState<IValueAlert>({
    Icon: FaCheck,
    theme: "success",
    subtitle: "Pembayaran listrik sebesar",
    title: "Rp.10.000",
    isShow: false,
    submitTitle: "Kembali ke Beranda",
    message: "berhasil",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isInputError, setInputError] = useState<IErrorInput>({
    error: false,
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const angka = Number(e.target.value.replace(/\D/g, ""));
    setNominal(angka.toLocaleString("id-ID"));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInputError({ error: false, message: "" });

    if (Number(nominal.toString().replaceAll(".", "")) < 10000) {
      setInputError({
        error: true,
        message: "minimal pembayaran Rp 10.000",
      });

      return;
    }

    setLoading(true);

    axios
      .post("/api/transaction", {
        total_amount: Number(nominal.toString().replaceAll(".", "")),
        service_code: service.toString().toUpperCase(),
      })
      .then((res) => {
        setNominal("0");
        setValueAlert({
          Icon: FaCheck,
          theme: "success",
          subtitle: `Pembayaran ${service} sebesar`,
          title: `Rp.${nominal}`,
          isShow: true,
          submitTitle: "Kembali ke Beranda",
          message: "berhasil",
        });
      })
      .catch((err) => {
        setValueAlert({
          Icon: IoClose,
          theme: "primary",
          subtitle: `Pembayaran ${service} sebesar`,
          title: `Rp.${nominal}`,
          isShow: true,
          submitTitle: "Kembali ke Beranda",
          message: "gagal",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 pt-6">
      {valueAlert.isShow && (
        <Alert
          title={valueAlert.title}
          subtitle={valueAlert.subtitle}
          showCancelButton={false}
          theme={valueAlert.theme}
          Icon={valueAlert.Icon}
          onSubmit={() => setValueAlert((prev) => ({ ...prev, isShow: false }))}
          onClose={() => setValueAlert((prev) => ({ ...prev, isShow: false }))}
          submitText="Kembali ke Beranda"
          message={valueAlert.message}
        />
      )}
      <form onSubmit={handleSubmit} className="w-full  space-y-2">
        <InputField
          type="text"
          value={nominal}
          Icon={MdMoney}
          onChange={(e) => handleChange(e)}
          name="nominal"
          id="nominal"
          placeholder="minimal 10,000"
          errorMessage={isInputError.message}
          isError={isInputError.error}
        />
        <Button disabled={isLoading} type="submit">
          Bayar
        </Button>
      </form>
    </div>
  );
};

export default FormData;
