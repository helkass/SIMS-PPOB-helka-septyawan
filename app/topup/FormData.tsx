"use client";

import React, { FormEvent, useState } from "react";
import InputField from "../_components/forms/InputfField";
import { MdMoney } from "react-icons/md";
import Button from "../_components/Button";
import Alert, { themeTypes } from "../_components/alerts/Alert";
import { FaCheck } from "react-icons/fa";
import { IconType } from "react-icons";
import axios from "axios";
import { IoClose } from "react-icons/io5";

interface IValueAlert {
  Icon: IconType;
  theme: themeTypes;
  subtitle: string;
  title: string;
  submitTitle: string;
  isShow: boolean;
  message?: string;
}

const FormData = () => {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const angka = Number(e.target.value.replace(/\D/g, ""));
    setNominal(angka.toLocaleString("id-ID"));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/topup", {
        top_up_amount: nominal.toString().replaceAll(".", ""),
      })
      .then(() => {
        setValueAlert({
          Icon: FaCheck,
          theme: "success",
          subtitle: "Top Up sebesar",
          title: `Rp.${nominal}`,
          isShow: true,
          submitTitle: "Kembali ke Beranda",
          message: "berhasil",
        });
      })
      .catch(() => {
        setValueAlert({
          Icon: IoClose,
          theme: "primary",
          subtitle: "Top Up sebesar",
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
        />
      )}
      <form onSubmit={handleSubmit} className="w-full md:w-7/12 space-y-2">
        <InputField
          type="text"
          value={nominal}
          Icon={MdMoney}
          onChange={(e) => handleChange(e)}
          name="nominal"
          id="nominal"
          placeholder="minimal 10,000"
        />
        <Button disabled={isLoading} type="submit">
          Top Up
        </Button>
      </form>
      <div className="w-full md:w-5/12 grid grid-cols-3 gap-2">
        {listPrice.map((item, i) => (
          <Button
            disabled={isLoading}
            key={i}
            onClick={() => setNominal(item.nominal)}
            variant="outline"
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

interface IListPrice {
  name: string;
  nominal: string;
}

const listPrice: IListPrice[] = [
  {
    name: "Rp10.000",
    nominal: "10.000",
  },
  {
    name: "Rp20.000",
    nominal: "20.000",
  },
  {
    name: "Rp50.000",
    nominal: "50.000",
  },
  {
    name: "Rp100.000",
    nominal: "100.000",
  },
  {
    name: "Rp250.000",
    nominal: "250.000",
  },
  {
    name: "Rp500.000",
    nominal: "500.000",
  },
];

export default FormData;
