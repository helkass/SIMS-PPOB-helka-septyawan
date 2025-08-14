import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IBanner {
  href?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Banner = ({
  href = "/",
  src,
  alt = "",
  width = 260,
  height = 60,
}: IBanner) => {
  return (
    <Link href={href}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        objectFit="cover"
        className="rounded-xl min-w-[260px]"
      />
    </Link>
  );
};

export const BannerLoader = () => {
  return (
    <div className="w-[260px] h-[120px] min-w-[260px] bg-gray-200 animate-pulse rounded-xl"></div>
  );
};

export default Banner;
