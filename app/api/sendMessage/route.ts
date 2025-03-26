// import { Resend } from 'resend';

// export async function POST(req: Request) {

//     const resend = new Resend('re_K3zpfNTU_Dscd8qwbgaQyempQC3bGwti6');
//     resend.emails.send({
//     from: 'imrightheremf.dev',
//     to: 'alenabraham787@gmail.com',
//     subject: 'Hello World',
//     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
//     });
//     return new Response(JSON.stringify("message send"), { status: 200 });
// }

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    const resend = new Resend('re_K3zpfNTU_Dscd8qwbgaQyempQC3bGwti6');

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // ✅ Use a verified domain from Resend
      to: ["alenabraham787@gmail.com"], // ✅ Use an array for multiple recipients
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    return new NextResponse(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new NextResponse(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
