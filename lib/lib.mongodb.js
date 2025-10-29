import mongoose from "mongoose";
import dotenv from "dotenv";

// Carica prima .env.local, poi sovrascrive con .env se presente
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Devi impostare MONGODB_URI nel file .env.local o .env");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connesso!");
  } catch (err) {
    console.error("Errore connessione MongoDB:", err);
    throw err;
  }
};
