import { NextResponse } from "next/server";
import axiosInstance from "@/libs/axios";

export async function PUT(req: Request) {
  try {
    // Ambil file dari formData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    // Kirim ke API eksternal
    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const apiRes = await axiosInstance.put("/profile/image", uploadForm, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(apiRes.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "Gagal update profil" },
      { status: error.response?.status || 500 }
    );
  }
}
