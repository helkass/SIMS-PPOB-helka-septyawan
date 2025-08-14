"use client";
import React from "react";
import Link from "next/link";
import DataForm from "./DataForm";
import Button from "../_components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  function handleLogout() {
    axios.get("/api/logout").then(() => router.replace("/login"));
  }
  return (
    <div className="w-full max-w-lg space-y-4 mt-6">
      <DataForm />

      <div className="flex flex-col gap-5">
        <Link
          href={"/profile/update"}
          className="bg-[var(--primary)] text-sm py-2.5 text-center w-full font-semibold rounded-sm text-white mt-3"
        >
          Edit Profil
        </Link>
        <Button variant="outline-primary" onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
