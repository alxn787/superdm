import { SuperchatEmailTemplate } from '@/components/email-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';



export async function POST(req: NextRequest) {
    const resend = new Resend('re_YcFK1ueG_G1rHBfuaPwWTSaCyNaf5ap4n'); 
    try {
        const { name, message, email, transactionSignature } = await req.json();

        if (!email || !name || !message || !transactionSignature) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Superdm <onboarding@resend.dev>',
            to: [email],
            subject: 'New SuperDM',
            react:await SuperchatEmailTemplate({message,name,transactionSignature}),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
