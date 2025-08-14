import { NextResponse } from "next/server";
import axiosInstance from "@/libs/axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const apiRes = await axiosInstance.post("/login", body, {
      headers: { "Content-Type": "application/json" },
    });

    const token = apiRes.data.data.token;
    console.log("token", token);

    const res = NextResponse.json({ ok: true, message: "Login berhasil" });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.response?.data?.message || "Login gagal" },
      { status: error.response?.status || 500 }
    );
  }
}
