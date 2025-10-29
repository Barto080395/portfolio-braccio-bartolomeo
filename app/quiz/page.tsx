"use client";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 1.5);
`;

const FormCard = styled.form`
  background: rgba(255, 255, 255, 0.15); /* vetro leggero */
  backdrop-filter: blur(3px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 3rem 3.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  max-width: 900px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
  animation: ${fadeIn} 0.6s ease-out forwards;

  background: linear-gradient(135deg, rgba(29, 114, 184, 0.3), rgba(63, 169, 245, 0.2));

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

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid #9bb7d4;
  font-size: 1rem;
  outline: none;
  background-color: #fff;
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

export default function QuizPage() {
  const [formData, setFormData] = useState({
    source: "",
    rating: "",
    comment: "",
    favoriteFeature: "",
    improvement: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
       alert("invio del feedback inoltrato 🚀");

      if (!response.ok) {
        throw new Error("Errore invio feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Errore nell'invio del feedback. Riprova più tardi.");
    }
  };

  return (
    <Container>
      <FormCard onSubmit={handleSubmit}>
        {!submitted ? (
          <>
            <Title>📝 Quiz Feedback</Title>

            <div>
              <Label>Come hai trovato il progetto?</Label>
              <Select name="source" value={formData.source} onChange={handleChange} required>
                <option value="" disabled>
                  Seleziona un'opzione
                </option>
                <option value="😍_molto_bene">😍 Molto bene</option>
                <option value="👍_bene">👍 Bene</option>
                <option value="🙂_abbastanza">🙂 Abbastanza</option>
                <option value="👎_non_mi_piace">👎 Non mi piace</option>
                <option value="🤔_confuso">🤔 Confuso</option>
                <option value="💡_utile">💡 Utile</option>
                <option value="🛠️_da_migliorare">🛠️ Da migliorare</option>
                <option value="❓_altro">❓ Altro</option>
              </Select>
            </div>

            <div>
              <Label>Che voto dai da 1 a 5?</Label>
              <Input name="rating" type="number" min={1} max={5} value={formData.rating} onChange={handleChange} required />
            </div>

            <FullWidth>
              <Label>Commenti o suggerimenti</Label>
              <Textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Scrivi qui..." />
            </FullWidth>

            <FullWidth>
              <Label>Quale funzionalità ti è piaciuta di più?</Label>
              <Textarea name="favoriteFeature" value={formData.favoriteFeature} onChange={handleChange} placeholder="Es. Navigazione, Widget..." />
            </FullWidth>

            <FullWidth>
              <Label>Come possiamo migliorare?</Label>
              <Textarea name="improvement" value={formData.improvement} onChange={handleChange} placeholder="Suggerimenti..." />
            </FullWidth>

            <ButtonWrapper>
              <Button type="submit">Invia Feedback</Button>
            </ButtonWrapper>
          </>
        ) : (
          <FullWidth style={{ textAlign: "center", color: "#3182ce" }}>
            <h2>Grazie per il tuo feedback! 🎉</h2>
            <Button onClick={() => setSubmitted(false)}>Chiudi</Button>
          </FullWidth>
        )}
      </FormCard>
    </Container>
  );
}
