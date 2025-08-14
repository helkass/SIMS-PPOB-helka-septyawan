"use client";

import React, { useEffect, useState } from "react";
import MenuFeature, {
  MenuFeatureLoader,
} from "./_components/menus/MenuFeature";
import axios from "axios";

interface IMenuFeature {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: string;
}

const MenuFeatures = () => {
  const [data, setData] = useState<IMenuFeature[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  function fetchData() {
    setLoading(true);
    axios.get("/api/services").then((res) => {
      const services = res.data.data;
      setData((prev) => [...prev, ...services]);
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-8 scroll-hidden items-start flex-nowrap overflow-x-auto">
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => (
            <MenuFeatureLoader key={i} />
          ))
        : data.map((menu, i) => <MenuFeature {...menu} key={i} />)}
    </div>
  );
};

export default MenuFeatures;
