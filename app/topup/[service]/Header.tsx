"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IMenuFeature {
  service_code: string;
  service_name: string;
  service_icon: string;
}

interface IHeader {
  service: string;
}

const Header = ({ service }: IHeader) => {
  const [data, setData] = useState<IMenuFeature>({
    service_code: "",
    service_name: "",
    service_icon: "",
  });

  useEffect(() => {
    axios.get("/api/services").then((res) => {
      const services = res.data.data;
      const result = services.filter(
        (item: IMenuFeature) =>
          item.service_code.toLowerCase() === service.toLowerCase()
      )[0];
      setData(result);
    });
  }, [service]);

  return (
    <div className="space-y-2">
      <p>Pembayaran</p>
      <div className="flex items-center gap-2">
        {data.service_icon && (
          <Image
            src={data.service_icon}
            width={30}
            height={30}
            className="object-contain rounded"
            alt={data.service_name || ""}
          />
        )}
        <h4 className="text-xl capitalize font-semibold">{service}</h4>
      </div>
    </div>
  );
};

export default Header;
