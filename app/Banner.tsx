"use client";

import { publicAxiosInstance } from "@/libs/axios";
import React, { useEffect, useState } from "react";
import Banner, { BannerLoader } from "./_components/cards/Banner";

interface IBannerComponent {
  banner_name: string;
  banner_image: string;
  description: string;
}

const BannerComponent = () => {
  const [data, setData] = useState<IBannerComponent[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  function fetchData() {
    setLoading(true);
    publicAxiosInstance.get("/banner").then((res) => {
      const banners = res.data.data;
      setData((prev) => [...prev, ...banners]);
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
      {isLoading && (
        <>
          <BannerLoader />
          <BannerLoader />
          <BannerLoader />
          <BannerLoader />
          <BannerLoader />
          <BannerLoader />
        </>
      )}
      {!isLoading &&
        data.map((banner, i) => (
          <Banner src={banner.banner_image} alt={banner.banner_name} key={i} />
        ))}
    </div>
  );
};

export default BannerComponent;
