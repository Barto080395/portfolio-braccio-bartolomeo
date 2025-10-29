"use client";

import { useGlobalStore } from "@/app/State/GlobalContext";
import { styled } from "@mui/material";

type ProjectCardProps = {
  title: string;
  desc: string;
  link?: string;
};

// 🔹 Griglia flessibile con flex-wrap
export const CardsGrid = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
  width: "100%",
  margin: "0 auto",
  justifyContent: "stretch",
}));

// 🔹 Card responsive
const ProjectCard = styled("div")<{ hovered?: boolean }>(({ hovered, theme }) => ({
  flex: "1 1 0", // occupa tutto lo spazio disponibile nella riga
  minWidth: "250px",
  background: hovered
  ? "linear-gradient(135deg, rgba(40, 55, 70, 1), rgba(74, 101, 114, 1))"
  : "linear-gradient(135deg, rgba(31, 42, 56, 0.7), rgba(58, 80, 107, 0.7))",
  padding: "1.2rem",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 18px rgba(0,0,0,1.5)",
  transform: hovered ? "translateY(-5px)" : "translateY(0)",
  cursor: "pointer",

  [theme.breakpoints.down("sm")]: {
    flex: "1 1 100%", // occupa tutta la larghezza su mobile
    padding: "1rem",
  },
}));

const CardTitle = styled("h3")({
  fontWeight: 800,
  fontSize: "1.1rem",
  color: "#FFD166",
  marginBottom: "0.5rem",
  lineHeight: 1.3,
});

const CardDesc = styled("p")({
  fontSize: "0.9rem",
  color: "#000",
  lineHeight: 1.4,
  marginBottom: "0.8rem",
  flexGrow: 1,
});

const CardButton = styled("button")({
  padding: "0.4rem 0.8rem",
  border: "1px solid black",
  borderRadius: "8px",
  background: "#FFD166",
  color: "#1f2a38",
  fontWeight: 600,
  cursor: "pointer",
  alignSelf: "center",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "#FFC857",
  },
});

const Card = ({ title, desc, link }: ProjectCardProps) => {
  const { state, dispatch } = useGlobalStore();
  const isHovered = state.hoveredId === title;

  const handleClick = () => {
    if (link && link !== "#") {
      window.open(link, "_blank");
    } else {
      alert("PDF non disponibile");
    }
  };

  return (
    <ProjectCard
      hovered={isHovered}
      onMouseEnter={() => {
        dispatch({ type: "SET_HOVER", payload: title });
        dispatch({ type: "SET_CURSOR", payload: "pointer" });
      }}
      onMouseLeave={() => {
        dispatch({ type: "CLEAR_HOVER" });
        dispatch({ type: "SET_CURSOR", payload: "default" });
      }}
      onClick={handleClick}
    >
      <CardTitle>{title}</CardTitle>
      <CardDesc>{desc}</CardDesc>
      <CardButton>Apri PDF</CardButton>
    </ProjectCard>
  );
};

export default Card;
