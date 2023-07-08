import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log("✨ middleware");
  const bearerToken = req.headers.get("authorization");
  console.log("bearerToken === ", bearerToken);
  const token = bearerToken?.split(" ")[1];

  try {
    jose.jwtVerify(token ?? "", { type: process.env.JWT_SECRET ?? "" });
  } catch (error) {
    console.error("🔥", error);
    return NextResponse.json(
      { errorMessage: "Unauthorized request" },
      { status: 401 }
    );
  }

  const payload = jose.decodeJwt(token ?? "") as {
    email: string;
    exp: number;
    [key: string]: string | number;
  };
  console.log("✨ payload === ", payload);

  if (!payload?.email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized request" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};
