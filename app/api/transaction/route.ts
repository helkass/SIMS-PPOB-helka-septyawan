import { NextResponse } from "next/server";
import axiosInstance from "@/libs/axios";

export async function GET(req: Request) {
  console.log(req.url);
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

    const apiRes = await axiosInstance.get("/transaction/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(apiRes.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "Gagal mengambil histori transaksi" },
      { status: error.response?.status || 500 }
    );
  }
}

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

    const apiRes = await axiosInstance.post("/transaction", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(apiRes.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "Gagal menambahkan data transaksi" },
      { status: error.response?.status || 500 }
    );
  }
}
