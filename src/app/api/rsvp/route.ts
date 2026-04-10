import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactForm = {
  name: string;
  surname: string;
  email: string;
  company: string;
  role: string;
  location?: string;
  size?: string;
  ral?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: ContactForm = await req.json();

    // Validazione minima
    if (!data.name || !data.surname || !data.company || !data.role) {
      return NextResponse.json(
        { message: "Nome, Cognome, Azienda e Ruolo sono obbligatori." },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email non configurata correttamente!");
      return NextResponse.json(
        { message: "Server email non configurato." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.libero.it",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailBody = `
Nuovo contatto HR ricevuto:

👤 Nome: ${data.name}
🏷️ Cognome: ${data.surname}
📧 Email: ${data.email}
🏢 Azienda: ${data.company}
💼 Ruolo proposto: ${data.role}
📍 Località azienda: ${data.location || "N/A"}
👥 Dimensioni azienda: ${data.size || "N/A"}
💰 RAL proposta (€ annuale): ${data.ral || "N/A"}

📝 Messaggio aggiuntivo:
${data.message || "Nessun messaggio"}
`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nuovo contatto HR: ${data.name} ${data.surname}`,
      text: emailBody,
    });

    console.log(`Contatto HR inviato: ${data.name} ${data.surname}`);
    return NextResponse.json({ message: "Modulo inviato con successo!" });
  } catch (err) {
    console.error("Errore invio modulo HR:", err);
    return NextResponse.json(
      { message: "Errore nell'invio del modulo", error: err },
      { status: 500 }
    );
  }
}
