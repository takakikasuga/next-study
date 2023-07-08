import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

type DataType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
};

type ResponseType =
  | DataType
  | {
      errorMessage: string;
    };

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");
  console.log("bearerToken === ", bearerToken);
  const token = bearerToken?.split(" ")[1];
  const payload = jose.decodeJwt(token ?? "") as {
    email: string;
    exp: number;
    [key: string]: string | number;
  };
  console.log("✨ payload === ", payload);

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { errorMessage: "User not found" },
      { status: 401 }
    );
  }

  return NextResponse.json<ResponseType>(
    {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    },
    { status: 200, statusText: "OK Brother" }
  );
}
