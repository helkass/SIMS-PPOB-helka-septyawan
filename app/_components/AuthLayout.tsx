import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen justify-between overflow-hidden">
      <div className="w-full md:w-8/12">{children}</div>
      <div className="overflow-hidden flex justify-end items-end">
        <Image
          src={"/assets/images/IllustrasiLogin.png"}
          alt="illustrasi"
          width={300}
          height={120}
          objectFit="contain"
          className="w-full h-full min-h-screen object-contain"
        />
      </div>
    </div>
  );
}
