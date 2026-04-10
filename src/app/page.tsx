"use client";
import React, { useState } from "react";
import { useGlobalStore } from "./State/GlobalContext";
import { styled } from "@mui/material";
import Rocket from "./Shared/components/Rocket";
import Animated from "./Shared/components/Animated";

const Background = styled("div")({
  minHeight: "100vh",
  width: "100%",
  background:
    "linear-gradient(135deg, rgba(15,32,39,0.9), rgba(32,58,67,0.5), rgba(44,83,100,0.5))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
});

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "'Poppins', sans-serif",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.3)",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 1.5)",
  borderRadius: "14px",
  padding: "25px 10px",
  position: "relative",
  overflow: "hidden",
  zIndex: 1,

  // Effetto glassmorphism leggero per profondità
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    borderRadius: "inherit",
    zIndex: -1,
  },

  "& h1": {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "10px",
    background: "linear-gradient(90deg, #FFD166, #FF8A00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  // Paragrafi informativi
  "& p": {
    maxWidth: "600px",
    margin: "0 auto 15px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.85)",
  },

  // Pulsante di login
  "& button": {
    background: "linear-gradient(90deg, #ff8a00, #e52e71)",
    border: "none",
    padding: "12px 25px",
    fontSize: "1rem",
    color: "#fff",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transition: "all 0.25s ease",
  },
  "& button:hover": {
    boxShadow: "0 6px 25px rgba(255,193,7,1)",
  },
});

export default function LoginPage() {
  const { state, dispatch } = useGlobalStore();
  const [isLaunching, setIsLaunching] = useState(false);

  async function handleLogin() {
    if (isLaunching) return;

    dispatch({
      type: "SHOW_MODAL",
      payload: {
        title: "🔐 Inserisci il token!",
        message: "Inserisci o genera un token di accesso.",
        showInput: true,
        showGenerate: true,
        confirmText: "Conferma",
        cancelText: "Annulla",
        onConfirm: (inputToken?: string) => {
          if (isLaunching) return;

          // ❌ blocco se non c’è nessun token
          if (!inputToken || inputToken.trim() === "") {
            alert("⚠️ Devi inserire un token o generarne uno!");
            return;
          }

          // 🔒 Controllo token valido (es: almeno 10 caratteri alfanumerici)
          const isValidToken = /^[A-Za-z0-9_-]{10,}$/.test(inputToken.trim());
          if (!isValidToken) {
            alert(
              "⚠️ Token non valido! Inserisci o genera un token di almeno 10 caratteri alfanumerici."
            );
            return;
          }

          setIsLaunching(true); // parte il razzo

          const ANIMATION_DURATION = 800;

          setTimeout(() => {
            document.cookie = `token=${inputToken}; path=/`;
            window.location.href = "/secret"; // redirect finale
          }, ANIMATION_DURATION);
        },

        onCancel: () => {
          setIsLaunching(false);
        },
      },
    });
  }

  const isHovered = state.hoveredId === "authentication";
  const cursor = state.cursor;

  return (
    <Background>
      <Animated once amount={0.2}>
        <Container>
          <h1 style={{ fontSize: "1.5rem", marginBottom: 10 }}>
            ✨ Benvenuto ✨
          </h1>
          <p style={{ fontSize: "1rem", marginBottom: 15, opacity: 0.8 }}>
            Accedi per ottenere un token di sicurezza che ti permetterà di
            accedere alle pagine protette dell’app.
          </p>
          <p style={{ fontSize: "0.85rem", marginBottom: 30, opacity: 0.6 }}>
            🔒 Il token viene salvato come cookie e garantisce accesso sicuro e
            autenticato alle funzionalità riservate.
          </p>

          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={handleLogin}
              onMouseEnter={() => {
                dispatch({ type: "SET_HOVER", payload: "authentication" });
                dispatch({ type: "SET_CURSOR", payload: "pointer" });
              }}
              onMouseLeave={() => {
                dispatch({ type: "CLEAR_HOVER" });
                dispatch({ type: "SET_CURSOR", payload: "default" });
              }}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                border: "none",
                padding: "12px 25px",
                fontSize: "1rem",
                color: "white",
                borderRadius: "30px",
                cursor: cursor ?? "default",
                boxShadow: isHovered
                  ? "0 6px 20px rgba(229, 46, 113, 1.5)"
                  : "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                overflow: "visible",
              }}
              aria-disabled={isLaunching}
            >
              <span
                style={{
                  fontSize: "12px",
                  marginRight: isLaunching ? "0px" : "30px",
                  display: "inline-block",
                  transition: "margin 0.2s ease",
                }}
              >
                {isLaunching ? "Caricamento..." : "Accedi in sicurezza"}
              </span>
            </button>
            <Rocket isLaunching={isLaunching} />
          </div>
        </Container>
      </Animated>
    </Background>
  );
}
