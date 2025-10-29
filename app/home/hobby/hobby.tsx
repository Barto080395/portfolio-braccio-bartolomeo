"use client";

import React, { useMemo, useState } from "react";
import { ISkill } from "@/app/skills/ISkill";
import CircularSkillChart from "@/app/Shared/components/CircularSkillChart";
import { DragDropList } from "@/app/Shared/components/DragDrop";
import Animated from "@/app/Shared/components/Animated";
import { styled } from "@mui/styles";

const HobbyContainer = styled("section")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "1rem 1rem",
  background: "rgba(63, 81, 181, 0.3)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,1)",
  color: "#000",
});

const HobbyTitle = styled("h2")({
  fontSize: "2.2rem",
  fontWeight: 800,
  background: "linear-gradient(90deg, #FFD166, #FF8A00)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textTransform: "uppercase",
  letterSpacing: "1px",
});

const HobbySubtitle = styled("p")({
  maxWidth: "700px",
  fontSize: "1.2rem",
  lineHeight: 1.6,
  color: "#555",
  marginTop: "0.5rem",
});

const HobbyGrid = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1.5rem",
  marginTop: "2rem",
});

type IHobby = ISkill & { icon: string };

const hobbies: IHobby[] = [
  { name: "Coding", percent: 40, icon: "💻" },
  { name: "Crescita", percent: 15, icon: "📈" },
  { name: "Tech", percent: 15, icon: "💡" },
  { name: "Fitness", percent: 10, icon: "🏋️‍♂️" },
  { name: "Lettura", percent: 10, icon: "📚" },
  { name: "Cucina", percent: 10, icon: "🍳" },
];



const HobbySection = React.memo(() => {
  const hobbiesMemo = useMemo(() => hobbies, []);
  const [hobbyList, setHobbyList] = useState<IHobby[]>(hobbiesMemo);

  return (
    <HobbyContainer>
      <Animated>
        <HobbyTitle>Le mie passioni quotidiane</HobbyTitle>
      </Animated>

      <Animated>
        <HobbySubtitle>
          Le mie passioni non si fermano al lavoro: sono ciò che lo rende vivo.
          Ogni attività, dallo sport alla cucina, mi aiuta a mantenere equilibrio
          e ispirazione per dare sempre il meglio nei progetti che realizzo.
        </HobbySubtitle>
      </Animated>

      <HobbyGrid>
        <DragDropList
          items={hobbyList}
          onChange={setHobbyList}
          renderItem={(hobby) => (
            <CircularSkillChart
              key={hobby.name}
              skill={hobby}
              animated={true}
              icon={hobby.icon}
              
            />
          )}
        />
      </HobbyGrid>
    </HobbyContainer>
  );
});

export default HobbySection;
