import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

type DataType = {
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

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isEmail(email ?? ""),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isLength(password ?? "", {
        min: 1,
      }),
      errorMessage: "Password is invalid",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json(
      { errorMessage: errors.join("\n") },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { errorMessage: "Email is associated with another account" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { errorMessage: "Email or password is invalid" },
      { status: 401 }
    );
  }

  const alg = "HS256";

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  const response = NextResponse.json<ResponseType>(
    {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    },
    { status: 200, statusText: "OK Brother" }
  );

  const resCookie = response.cookies.set({
    name: "jwt",
    value: token,
    maxAge: 60 * 60 * 24,
  });

  return response;
}
