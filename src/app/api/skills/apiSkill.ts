// apiSkill.ts
import { ISkill } from "@/app/skills/ISkill";

export const getSkills = async () => {
  const res = await fetch("/api/skills");
  if (!res.ok) return { err: true, message: `API error: ${res.status}` };
  return res.json();
};

export const createSkill = async (skill: ISkill) => {
  const res = await fetch("/api/skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skill),
  });
  return res.json();
};

export const updateSkill = async (
  oldName: string,
  newName: string,
  percent: number
) => {
  const res = await fetch("/api/skills", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldName, newName, percent }),
  });
  return res.json();
};

export const deleteSkill = async (skillName: string) => {
  const res = await fetch(
    `/api/skills?skill=${encodeURIComponent(skillName)}`,
    {
      method: "DELETE",
    }
  );
  return res.json();
};
