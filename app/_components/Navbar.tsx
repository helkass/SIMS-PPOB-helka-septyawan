"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="shadow z-100 fixed w-full top-0 bg-white">
      {/* logo icon */}
      <div className="flex justify-between max-w-[1140px] mx-auto items-center p-4">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/assets/images/Logo.png"}
            objectFit="cover"
            width={50}
            height={10}
            alt="logo"
            className="h-8 object-contain"
          />
          <h3 className="font-bold">SIMS PPOB</h3>
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          {listNavs.map((item, i) => (
            <Link
              key={i}
              className={
                pathname.startsWith(item.href) ? "text-[var(--primary)]" : ""
              }
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

const listNavs = [
  {
    name: "Top Up",
    href: "/topup",
  },
  {
    name: "Transaksi",
    href: "/transaction",
  },
  {
    name: "Akun",
    href: "/profile",
  },
];

export default Navbar;
