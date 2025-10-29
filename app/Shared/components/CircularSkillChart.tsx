import React from "react";
import { styled } from "@mui/system";
import { ISkill } from "@/app/skills/ISkill";
import Animated from "./Animated";
import LazyLoading from "./LazyLoading";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  background:
    "radial-gradient(circle at top left, rgba(255, 255, 255, 0.3), rgba(173, 216, 230, 0.2))",
  backdropFilter: "blur(12px)",
  borderRadius: "12px",
  padding: "8px",
  flex: "1 1 300px",
  minWidth: "300px",
  position: "relative",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 1.5)",
});

const DeleteButton = styled("button")({
  position: "absolute",
  top: "8px",
  right: "2px",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
});

const EditButton = styled("button")({
  position: "absolute",
  top: "8px",
  right: "30px",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
});

const SkillName = styled("div")({
  marginBottom: "8px",
  fontWeight: "bold",
  fontSize: "24px",
});

const SkillBarContainer = styled("div")({
  background: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
});

const SkillBar = styled("div")<{
  percent: number;
  color: string;
  animated: boolean;
}>(({ percent, color, animated }) => ({
  height: "20px",
  background: color,
  width: animated ? `${percent}%` : "0%",
  transition: "width 1.5s ease-in-out",
}));

type CircularSkillChartProps = {
  skill: ISkill;
  animated: boolean;
  onDelete?: (skillName: string) => void;
  onEdit?: (skill: ISkill) => void;
  icon?: string;
};

const GOLD_COLOR = "#ff8a00";
const LIGHT_YELLOW = "#ffe066";

const CircularSkillChart = ({
  skill,
  animated,
  onDelete,
  onEdit,
  icon,
}: CircularSkillChartProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = animated
    ? circumference - (skill.percent / 100) * circumference
    : circumference;
  const color = skill.percent < 75 ? LIGHT_YELLOW : GOLD_COLOR;

  return (
    <Container>
      {onDelete && (
        <DeleteButton onClick={() => onDelete(skill.name)}>
          <img
            src="/icons8-cestino-64.svg"
            alt="Elimina"
            style={{ width: "20px", height: "20px" }}
          />
        </DeleteButton>
      )}

      {onEdit && (
        <EditButton onClick={() => onEdit(skill)}>
          <img
            src="/icons8-edit-64.png"
            alt="Modifica"
            style={{ width: "20px", height: "20px",color: "white" }}
          />
        </EditButton>
      )}

      {icon && (
        <div
          style={{
            fontSize: "2rem",
            position: "absolute",
            top: "20px",
            left: "42%",
            transform: "translateX(-50%)",
          }}
        >
          {icon}
        </div>
      )}

      <svg width="100" height="100">
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset.toString()}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="20"
          fill="white"
          fontWeight="bold"
        >
          {skill.percent}%
        </text>
      </svg>

      <div style={{ flex: 1 }}>
        <SkillName>{skill.name}</SkillName>
        <SkillBarContainer>
          <SkillBar percent={skill.percent} color={color} animated={animated} />
        </SkillBarContainer>
      </div>
    </Container>
  );
};

export default CircularSkillChart;
