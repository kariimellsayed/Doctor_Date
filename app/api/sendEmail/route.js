import { Resend } from "resend";
import { Email } from "./email";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();
  try {
    const data = await resend.emails.send({
      from: "Doctor-Date",
      to: [response.data.Email],
      subject: "Doctor Date",
      react: <Email url="https://example.com" />,
    });
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(err);
  }
}
