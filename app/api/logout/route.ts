import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_APP_URL)
  );

  // Hapus cookie "token"
  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    expires: new Date(0), // Kadaluarsa
  });

  return response;
}
