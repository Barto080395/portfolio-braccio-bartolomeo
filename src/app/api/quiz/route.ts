import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type QuizFeedback = {
  source: string;
  rating: string;
  comment?: string;
  favoriteFeature?: string;
  improvement?: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: QuizFeedback = await req.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email non configurata correttamente!");
      return NextResponse.json(
        { message: "Server email non configurato." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.libero.it", // stesso host che usi nel ContactForm
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailBody = `
Hai ricevuto un nuovo feedback quiz:

📌 Come ha trovato il progetto: ${data.source}
⭐ Voto: ${data.rating}

💬 Commenti: ${data.comment || "Nessun commento"}
✨ Funzionalità preferita: ${data.favoriteFeature || "N/A"}
🔧 Suggerimenti di miglioramento: ${data.improvement || "N/A"}
`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // lo ricevi sul tuo cellulare come l’altro
      subject: `Nuovo Feedback Quiz - Voto ${data.rating}`,
      text: emailBody,
    });

    return NextResponse.json({ message: "Feedback inviato con successo!" });
  } catch (err) {
    console.error("Errore invio feedback quiz:", err);
    return NextResponse.json(
      { message: "Errore nell'invio del feedback", error: err },
      { status: 500 }
    );
  }
}
