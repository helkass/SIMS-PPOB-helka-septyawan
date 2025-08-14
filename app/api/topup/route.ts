import { NextResponse } from "next/server";
import axiosInstance from "@/libs/axios";

export async function POST(req: Request) {
  const body = await req.json();
  try {
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

    const apiRes = await axiosInstance.post("/topup", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(apiRes.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "Gagal melakukan top up" },
      { status: error.response?.status || 500 }
    );
  }
}
