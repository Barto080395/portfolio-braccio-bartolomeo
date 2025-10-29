"use client";

import { useState, useEffect } from "react";
import { ISkill } from "./ISkill";
import {
  getSkills,
  createSkill,
  deleteSkill,
  updateSkill,
} from "../api/skills/apiSkill";
import CircularSkillChart from "../Shared/components/CircularSkillChart";
import FilterSearch from "../Shared/components/FilterSearch";
import { keyframes, styled } from "@mui/system";
import { useGlobalStore } from "../State/GlobalContext";
import { DragDropList } from "../Shared/components/DragDrop";
import { mapIcons } from "@/utility/mapIconSkill";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled("div")({
  padding: "5px",
  borderRadius: "16px",
  margin: "1rem",
  background: "rgba(0, 0, 0, 0.35)",
  backdropFilter: "blur(3px) saturate(180%)",
  WebkitBackdropFilter: "blur(15px) saturate(180%)",
  border: "2px solid #374151",
  color: "#f0f0f5",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  animation: `${fadeIn} 0.7s ease-out forwards`,
  "@media (max-width: 768px)": {
    padding: "10px",
    borderRadius: "12px",
  },
});

const Header = styled("h3")({
  display: "flex",
  marginBottom: "20px",
  fontSize: "32px",
  color: "#0b3d91",
  justifyContent: "center",
});

const Input = styled("input")({
  height: "50px",
  padding: "0 30px",
  borderRadius: "12px",
  background: "#f0f0f5",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  backdropFilter: "blur(10px)",
  fontFamily: "'Poppins', sans-serif",
  fontSize: 16,
  outline: "none",
  border: "1px solid #4a4a6a",
  color: "#0f0f10ff",
  "&:focus": {
    boxShadow: "0 0 0 2px rgba(255,215,0,0.6)",
  },
  "&::placeholder": {
    color: "#b0b0c1",
    opacity: 1,
  },
});

const SmallInput = styled("input")({
  height: "50px",
  padding: "0 20px",
  borderRadius: "12px",
  "&:focus": {
    boxShadow: "0 0 0 2px rgba(255,215,0,0.6)",
  },
  "&::placeholder": {
    color: "#b0b0c1",
    opacity: 1,
  },
  flex: "0 0 60px",
});

const Button = styled("button")<{
  hovered: boolean;
  cursor: "default" | "pointer" | "grab" | "grabbing";
}>(({ hovered, cursor }) => ({
  height: "50px",
  padding: "0 20px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #4a90e2, #0070f3)",
  color: "#ffffff",
  fontFamily: "'Poppins', sans-serif",
  fontSize: 16,
  border: "none",
  cursor: cursor ?? "default",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
  transform: hovered ? "scale(1.05)" : "scale(1)",
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
}));

const FormRow = styled("div")({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  "@media (max-width: 768px)": {
    justifyContent: "flex-start",
  },
});

const SkillGrid = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  flex: "1",
});

type Props = {
  initialSkills?: ISkill[];
};

const SkillsClient = ({ initialSkills = [] }: Props) => {
  const [skills, setSkills] = useState<ISkill[]>(mapIcons(initialSkills));
  const [searchInput, setSearchInput] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newSkillPercent, setNewSkillPercent] = useState("50");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useGlobalStore();

  const isHovered = state.hoveredId === "button";
  const cursor = state.cursor;

  // 🔹 Carica le skill da MongoDB
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkills();
        if (res.skills) setSkills(mapIcons(res.skills));
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (!newSkill.trim()) return;

    // 🔹 Controllo token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const isOwner = token === process.env.NEXT_PUBLIC_OWNER_TOKEN;

    if (!isOwner) {
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          title: "Inserimento Skill Negato!",
          message:
            "Le skill possono essere inserite solo dall'amministratore del sito.",
          onConfirm: () => {},
          confirmText: "Ok",
        },
      });
      return;
    }

    setLoading(true);
    try {
      const created = await createSkill({
        name: newSkill,
        percent: Number(newSkillPercent),
        iconName: `Si${newSkill.replace(/\s+/g, "")}`,
      });
      setSkills((prev) => mapIcons([...prev, created.skill]));
      setNewSkill("");
      setNewSkillPercent("50");
    } catch (err) {
      console.error("Error creating skill:", err);
    } finally {
      setLoading(false);
    }
  };

  const editSkill = (skill: ISkill) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: {
        title: `Aggiorna Skill: ${skill.name}`,
        message:
          "Puoi aggiornare il nome della skill e la percentuale di competenza.",
        editSkill: true,
        onConfirm: async (data) => {
          if (!data) return;
          const { name: newName, percent: newPercent } = JSON.parse(data);

          try {
            const res = await updateSkill(skill.name, newName, newPercent);
            if (res.skill) {
              setSkills((prev) =>
                prev.map((s) =>
                  s.name === skill.name
                    ? { ...s, name: res.skill.name, percent: res.skill.percent }
                    : s
                )
              );
            }
          } catch (err) {
            console.error("Error updating skill:", err);
          }
        },
        confirmText: "Aggiorna",
        cancelText: "Annulla",
      },
    });
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const isOwner = token === process.env.NEXT_PUBLIC_OWNER_TOKEN;

    if (!isOwner) {
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          title: "Modifica Skill Negato!",
          message:
            "Le skill possono essere modificate solo dall'amministratore del sito.",
          onConfirm: () => {},
          confirmText: "Ok",
        },
      });
      return;
    }
  };

  const removeSkill = async (skillName: string) => {
    try {
      await deleteSkill(skillName);
      setSkills((prev) => prev.filter((s) => s.name !== skillName));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const confirmDeleteSkill = (skillName: string) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const isOwner = token === process.env.NEXT_PUBLIC_OWNER_TOKEN;

    dispatch({
      type: "SHOW_MODAL",
      payload: {
        title: isOwner ? "Elimina Skill" : "Eliminazione Negata!",
        message: isOwner
          ? `Sei sicuro di voler eliminare "${skillName}"?`
          : "Non puoi eliminare questa skill. Contatta l'amministratore del sito.",
        onConfirm: isOwner
          ? () => removeSkill(skillName)
          : () => dispatch({ type: "HIDE_MODAL" }),
        onCancel: isOwner ? () => dispatch({ type: "HIDE_MODAL" }) : undefined,
        confirmText: isOwner ? "Elimina" : "Ok",
        cancelText: isOwner ? "Annulla" : undefined,
      },
    });
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Container>
      <Header>📚 Le mie Competenze</Header>
      <span style={{ color: "#E6E2C8" }}>
        Le percentuali indicano quanto ho effettivamente utilizzato ciascuna
        tecnologia nell'ultimo anno, riflettendo la mia esperienza pratica e
        familiarità con ciascuno strumento.
      </span>

      <FormRow>
        <FilterSearch
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Input
          value={newSkill}
          placeholder="Aggiungi skill"
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <SmallInput
          value={newSkillPercent}
          type="number"
          min={0}
          max={100}
          onChange={(e) => setNewSkillPercent(e.target.value)}
        />
        <Button
          onClick={addSkill}
          cursor={cursor}
          hovered={isHovered}
          disabled={loading}
          onMouseEnter={() => {
            dispatch({ type: "SET_HOVER", payload: "button" });
            dispatch({ type: "SET_CURSOR", payload: "pointer" });
          }}
          onMouseLeave={() => {
            dispatch({ type: "CLEAR_HOVER" });
            dispatch({ type: "SET_CURSOR", payload: "default" });
          }}
        >
          {loading ? "..." : "Inserisci"}
        </Button>
      </FormRow>

      <SkillGrid>
        <DragDropList
          items={filteredSkills}
          onChange={setSkills}
          renderItem={(skill) => (
            <CircularSkillChart
              key={skill.name}
              skill={skill}
              icon={skill.icon}
              animated={true}
              onDelete={() => confirmDeleteSkill(skill.name)}
              onEdit={() => editSkill(skill)}
            />
          )}
        />
      </SkillGrid>
    </Container>
  );
};

export default SkillsClient;
