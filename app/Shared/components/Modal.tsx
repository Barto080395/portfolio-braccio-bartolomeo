"use client";

import React, { ReactNode, useState } from "react";
import { styled } from "@mui/system";
import { useGlobalStore } from "@/app/State/GlobalContext";

const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
});

const ModalBox = styled("div")({
  background:
    "linear-gradient(135deg, rgba(155, 183, 212, 0.9), rgba(227, 227, 238, 0.85))",
  backdropFilter: "blur(6px) saturate(180%)",
  WebkitBackdropFilter: "blur(12px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  padding: 15,
  borderRadius: 20,
  width: "90%",
  maxWidth: 420,
  textAlign: "center",
  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
  color: "#333",
  fontFamily: "'Poppins', sans-serif",
});

const Title = styled("h3")({
  marginBottom: 16,
  fontSize: "20px",
});

const Message = styled("div")({
  marginBottom: 24,
  fontSize: "16px",
});

const Actions = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  gap: "10px",
});

const Button = styled("button")<{
  variant?: "confirm" | "cancel" | "generate";
}>(({ variant }) => ({
  padding: "10px 12px",
  borderRadius: 8,
  border: "none",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  minWidth: "100px",
  ...(variant === "cancel" && {
    background: "#ccc",
    color: "#333",
    "&:hover": { background: "#bbb" },
  }),
  ...(variant === "confirm" && {
    background: "#e74c3c",
    color: "#fff",
    "&:hover": { background: "#c0392b" },
  }),
  ...(variant === "generate" && {
    background: "#3498db",
    color: "#fff",
    "&:hover": { background: "#2980b9" },
  }),
}));

export type ModalOptions = {
  title?: string;
  message: string | ReactNode;
  showInput?: boolean;
  showGenerate?: boolean;
  editSkill?: boolean; // 🔹 nuova prop opzionale per modificare skill
  onConfirm: (inputValue?: string) => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { state, dispatch } = useGlobalStore();

  const [inputValue, setInputValue] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skillPercent, setSkillPercent] = useState<number>(50);

  const hideModal = () => {
    dispatch({ type: "HIDE_MODAL" });
    setInputValue("");
    setSkillName("");
    setSkillPercent(50);
  };

  const handleConfirm = () => {
    if (state.modal?.editSkill) {
      // 🔹 In modalità modifica skill, passiamo JSON con name e percent
      const data = JSON.stringify({
        name: skillName,
        percent: skillPercent,
      });
      
      state.modal?.onConfirm(data);
    } else {
      // 🔹 Altrimenti, uso classico inputValue
      state.modal?.onConfirm(inputValue);
    }
    hideModal();
  };

  const handleCancel = () => {
    state.modal?.onCancel?.();
    hideModal();
  };

  const handleGenerate = () => {
    const randomToken = Math.random().toString(36).substring(2, 16);
    setInputValue(randomToken);
  };

  return (
    <>
      {children}
      {state.modal && (
        <Overlay>
          <ModalBox>
            {state.modal.title && <Title>{state.modal.title}</Title>}
            <Message>
              {state.modal.message}

              {/* 🔹 Caso 1: input classico */}
              {state.modal.showInput && !state.modal.editSkill && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Token..."
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    marginTop: "10px",
                    width: "60%",
                  }}
                  autoFocus
                />
              )}

              {/* 🔹 Caso 2: modifica skill */}
              {state.modal.editSkill && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="text"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    placeholder="Nome skill..."
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                    }}
                  />
                  <input
                    type="number"
                    value={skillPercent}
                    onChange={(e) => setSkillPercent(Number(e.target.value))}
                    min={0}
                    max={100}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                    }}
                  />
                </div>
              )}
            </Message>

            <Actions>
              <Button variant="cancel" onClick={handleCancel}>
                {state.modal.cancelText || "Annulla"}
              </Button>

              {state.modal.showGenerate && (
                <Button variant="generate" onClick={handleGenerate}>
                  Generate Token
                </Button>
              )}

              <Button variant="confirm" onClick={handleConfirm}>
                {state.modal.confirmText || "Conferma"}
              </Button>
            </Actions>
          </ModalBox>
        </Overlay>
      )}
    </>
  );
};

export default ModalProvider;
