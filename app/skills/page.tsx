// app/skills/page.tsx
import { headers } from "next/headers";

import { ISkill } from "./ISkill";
import SkillsClient from "./skillsClient";

export default async function SkillsPage() {
  // Recupero gli header per costruire l'URL base
  const hdrs = headers();
  const baseUrl = `http://${(await hdrs).get("host")}`;

  // Fetch lato server per prendere le skill dal DB
  const res = await fetch(`${baseUrl}/api/skills`, { cache: "no-store" });

  let skills: ISkill[] = [];

  if (res.ok) {
    const data = await res.json();
    skills = data.skills; // supponendo che l'API restituisca { skills: [...] }
  }

  // Passo i dati al componente client
  return <SkillsClient initialSkills={skills} />;
}
