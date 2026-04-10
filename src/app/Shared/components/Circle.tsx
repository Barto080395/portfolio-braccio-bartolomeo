"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Animated from "./Animated";

// ===== CONTENITORI PRINCIPALI =====
const MissionContainer = styled("section")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "1rem",
  padding: "60px 20px",
});

const MissionTitle = styled("h2")({
  fontSize: "2.5rem",
  fontWeight: 800,
  color: "#FF8A00",
  background: "#FF8A00",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: "#f1c40f",
    margin: "10px auto 0",
    borderRadius: "2px",
  },
});

const CirclesWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "3rem",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "1200px",
}));

// ===== CERCHIO SINGOLO =====
const CircleItem = styled("div")({
  width: "250px",
  height: "250px",
  borderRadius: "50%",
  border: "3px solid #f1c40f",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "20px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 1.5)",
  color: "#000",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
  },
});

const CircleIcon = styled("div")({
  fontSize: "2rem",
  marginBottom: "10px",
});

const CircleTitle = styled("h3")({
  fontSize: "1.3rem",
  fontWeight: 700,
  marginBottom: "0.5rem",
  color: "#f1c40f",
});

const CircleDescription = styled("p")({
  fontSize: "0.95rem",
  lineHeight: 1.6,
  color: "white",
});

// ===== COMPONENTE =====
const DigitalMission = () => {
  const points = [
    {
      icon: "📈",
      title: "Crescita Continua",
      description:
        "Aggiorno le mie competenze ogni giorno per fornire soluzioni aggiornate e performanti nel mondo digitale.",
    },
    {
      icon: "💡", // lampadina per creatività
      title: "Creatività e Innovazione",
      description:
        "Creo esperienze digitali uniche, con design accattivante e funzionalità pensate per valorizzare la tua presenza online.",
    },
    {
      icon: "🌍",
      title: "Progetti su Scala Globale",
      description:
        "Collaboro principalmente con clienti in Italia e con team internazionali, offrendo risultati di qualità e una presenza digitale efficace.",
    },
  ];

  return (
    <MissionContainer>
      <MissionTitle>I miei obiettivi</MissionTitle>
      <CirclesWrapper>
        {points.map((point, index) => (
          <Animated key={point.title} index={index}>
            <CircleItem key={index}>
              <CircleIcon>{point.icon}</CircleIcon>
              <CircleTitle>{point.title}</CircleTitle>
              <CircleDescription>{point.description}</CircleDescription>
            </CircleItem>
          </Animated>
        ))}
      </CirclesWrapper>
    </MissionContainer>
  );
};

export default DigitalMission;
