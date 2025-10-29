"use client";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useGlobalStore } from "../State/GlobalContext";
import Rocket from "../Shared/components/Rocket";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1); /* vetro trasparente */
  backdrop-filter: blur(3px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 1.5);
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormCard = styled.form`
  background: rgba(255, 255, 255, 0.15); /* trasparenza specchiata */
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 3rem 3.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 1.5);
  max-width: 900px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
  animation: ${fadeIn} 0.6s ease-out forwards;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const Title = styled.h2`
  grid-column: 1 / -1;
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  color: #0b3d91;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
  color: #1f3c88;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box; /* 👈 include padding e border nel calcolo della larghezza */
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid #9bb7d4;
  font-size: 1rem;
  outline: none;
  transition: all 0.25s ease;

  &:focus {
    border-color: #1d72b8;
    box-shadow: 0 0 12px rgba(29, 114, 184, 0.3);
    transform: translateY(-1px);
  }

  &:hover {
    border-color: #3fa9f5;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box; /* 👈 fondamentale */
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #9bb7d4;
  font-size: 1rem;
  min-height: 160px;
  resize: vertical;
  transition: all 0.25s ease;

  &:focus {
    border-color: #1d72b8;
    box-shadow: 0 0 12px rgba(29, 114, 184, 0.3);
    transform: translateY(-1px);
  }

  &:hover {
    border-color: #3fa9f5;
  }
`;

const ButtonWrapper = styled.div`
  grid-column: 1 / -1;
  position: relative;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #1d72b8, #3fa9f5, #1d72b8);
  background-size: 200% 200%;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 12px 25px rgba(29, 114, 184, 0.3);
  overflow: visible;

  &:hover {
    background-position: right center;
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 18px 35px rgba(29, 114, 184, 0.4);
  }
`;

const ButtonText = styled.span`
  flex: 1; // prende tutta la larghezza disponibile
  text-align: center;
  transition: margin 0.2s ease;
`;

export default function ContactForm() {
  const { dispatch } = useGlobalStore();
  const [isLaunching, setIsLaunching] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    company: "",
    role: "",
    location: "",
    size: "",
    ral: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLaunching) return;

    setIsLaunching(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Errore nella risposta dal server");
      }

      dispatch({
        type: "SHOW_MODAL",
        payload: {
          title: "🎉 Modulo inviato con successo!",
          message: "Il modulo è stato inviato correttamente. La richiesta è stata inoltrata e verrà presa in carico al più presto.",
          confirmText: "OK",
          onConfirm: () => {},
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          title: "⚠️ Errore durante l'invio",
          message: "Si è verificato un errore. Il modulo non è stato inviato. Riprova più tardi.",
          confirmText: "Chiudi",
          onConfirm: () => {},
        },
      });
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <>
    <Container>
      <FormCard onSubmit={handleSubmit}>
        <Title>Modulo HR - Richiesta Informazioni</Title>

        <div>
          <Label>👤 Nome</Label>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label>🏷️ Cognome</Label>
          <Input name="surname" value={formData.surname} onChange={handleChange} required />
        </div>

        <div>
          <Label>📧 Email</Label>
          <Input name="email" value={formData.email} onChange={handleChange} required/>
        </div>

        <div>
          <Label>🏢 Azienda</Label>
          <Input name="company" value={formData.company} onChange={handleChange} required />
        </div>

        <div>
          <Label>👥 Dimensioni azienda</Label>
          <Input name="size" value={formData.size} onChange={handleChange} />
        </div>

        <div>
          <Label>💼 Ruolo proposto</Label>
          <Input name="role" value={formData.role} onChange={handleChange} required />
        </div>

        <div>
          <Label>💰 RAL proposta (€ lorda annuale)</Label>
          <Input name="ral" value={formData.ral} onChange={handleChange} type="number" step={1000} />
        </div>

        <div>
          <Label>📍 Località azienda</Label>
          <Input name="location" value={formData.location} onChange={handleChange} />
        </div>

        <FullWidth>
          <Label>📝 Messaggio aggiuntivo</Label>
          <Textarea name="message" value={formData.message} onChange={handleChange} />
        </FullWidth>

        <ButtonWrapper>
          <Button type="submit" aria-disabled={isLaunching}>
            <ButtonText>Invia</ButtonText>
            <Rocket isLaunching={isLaunching} style={{ right: 10, top: "50%" }} />
          </Button>
        </ButtonWrapper>
      </FormCard>
    </Container>
    </>
  );
}
