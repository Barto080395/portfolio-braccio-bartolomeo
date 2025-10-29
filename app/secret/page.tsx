"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useGlobalStore } from "../State/GlobalContext";
import DigitalMission from "../Shared/components/Circle";
import Animated from "../Shared/components/Animated";
import Link from "next/link";
import { Tooltip } from "@mui/material";

const HeroSection = styled("section")(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh", // default desktop
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "'Poppins', sans-serif",
  color: "#fff",
  background:
    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/BartolomeoScrivania.png') center top 40% / cover no-repeat",

  // Mobile + tablet fino a 768px
  [theme.breakpoints.down("md")]: {
    minHeight: "700px", // fissa altezza in pixel
  },
}));



const Box = styled(motion.div)({
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: "rgba(50,50,50,0.55)",
  textAlign: "center",
  boxShadow: "0 6px 20px rgba(0,0,0,1)",
  cursor: "default",
  maxWidth: "500px",
  margin: "0 20px",
});

const Title = styled("h1")({
  fontSize: "2.5rem",
  fontWeight: 700,
  marginBottom: "30px",
  color: "#FF8A00",
  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
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

const SubTitle = styled("p")({
  fontSize: "1.2rem",
  color: "#fff",
  opacity: 0.9,
  marginBottom: "25px",
});

const ButtonLink = styled(Link)({
  display: "inline-block",
  padding: "12px 26px",
  borderRadius: "8px",
  backgroundColor: "#FF8A00",
  color: "#fff",
  fontWeight: 600,
  textDecoration: "none",
  transition: "all 0.3s ease",
  "&:hover": { backgroundColor: "#e67600", transform: "translateY(-3px)" },
});

// ===== Protected Box =====
const ProtectedBox = styled(motion.div)({
  padding: "4px 6px", // più piccolo
  borderRadius: "12px",
  backdropFilter: "blur(6px)",
  backgroundColor: "rgba(50,50,50,0.7)",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  cursor: "default",
  maxWidth: "150px", // piccolo badge
  position: "absolute", // posizione assoluta
  top: "5rem", // distanza dal top
  right: "20px", // distanza dal lato destro
  zIndex: 10,
  border: "1px solid #f1c40f",
});

const HeaderText = styled("h2")({
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#FF8A00",
});

// ===== Services Section =====
const ServicesSection = styled("section")({
  padding: "60px 20px",
  textAlign: "center",
});

const ServicesGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: { gridTemplateColumns: "repeat(2, 1fr)" },
  [theme.breakpoints.up("md")]: { gridTemplateColumns: "repeat(3, 1fr)" },
}));

const ServiceCard = styled(motion.div)({
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: "16px",
  padding: "25px",
  cursor: "default",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  border: "3px solid #f1c40f",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 25px rgba(255,165,0,0.3)",
  },
});

const CardTitle = styled("h3")({
  fontSize: "1.3rem",
  color: "#f1c40f",
  marginBottom: "10px",
  fontWeight: 600,
});

const CardText = styled("p")({
  fontSize: "1rem",
  color: "#fff",
  lineHeight: 1.6,
});

// ===== Page Component =====
const SecretPortfolioPage = () => {
  const { state, dispatch } = useGlobalStore();

  const services = [
    {
      title: "Layout Responsive",
      description:
        "Siti ottimizzati per smartphone, tablet e PC, con performance elevate.",
    },
    {
      title: "UX/UI Intuitive",
      description:
        "Design pensato per massimizzare l'engagement e fidelizzare i visitatori.",
    },
    {
      title: "Full Stack",
      description:
        "App moderne con Next.js e React, backend sicuro e performante.",
    },
    {
      title: "SEO Avanzata",
      description:
        "Ottimizzazione tecnica e contenutistica per emergere su Google.",
    },
    {
      title: "Software su misura",
      description:
        "Soluzioni software che trasformano idee in strumenti pratici e performanti",
    },
    {
      title: "Sicurezza continua",
      description:
        "Monitoraggio costante, aggiornamenti periodici e protezione avanzata.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Box
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => {
            dispatch({ type: "SET_HOVER", payload: "profile" });
            dispatch({ type: "SET_CURSOR", payload: "pointer" });
          }}
          onMouseLeave={() => {
            dispatch({ type: "CLEAR_HOVER" });
            dispatch({ type: "SET_CURSOR", payload: "default" });
          }}
        >
          <Title>Braccio Bartolomeo</Title>
          <SubTitle>Ingegnere Informatico - Web Developer Full Stack</SubTitle>
          <Tooltip
            title="🚀 Clicca per accedere al Portfolio!"
            arrow
          >
            <ButtonLink href="/home">Vai al mio Portfolio →</ButtonLink>
          </Tooltip>
        </Box>

        <Tooltip
          title="Benvenuto! Sei autenticato e puoi esplorare l'app! ✨"
          arrow
        >
          <ProtectedBox>
            <HeaderText>🔒 Area Protetta</HeaderText>
          </ProtectedBox>
        </Tooltip>
      </HeroSection>

      {/* Services Section */}
      <ServicesSection>
        <Title>Cosa realizzo?</Title>
        <ServicesGrid>
          {services.map((service, i) => (
            <Animated key={service.title} index={i}>
              <ServiceCard
                onMouseEnter={() =>
                  dispatch({ type: "SET_CURSOR", payload: "pointer" })
                }
                onMouseLeave={() =>
                  dispatch({ type: "SET_CURSOR", payload: "default" })
                }
              >
                <CardTitle>{service.title}</CardTitle>
                <CardText>{service.description}</CardText>
              </ServiceCard>
            </Animated>
          ))}
        </ServicesGrid>
      </ServicesSection>

      {/* Digital Mission Section */}
      <DigitalMission />
    </>
  );
};

export default SecretPortfolioPage;
