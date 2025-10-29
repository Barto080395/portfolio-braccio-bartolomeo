// scripts/seedSkills.js
import { connectDB } from "../lib/lib.mongodb.js";
import { Skill } from "../models/modelsSkill.js";
import 'dotenv/config';

export const defaultSkills = [
  { name: "React", percent: 90, iconName: "SiReact", color: "#61DAFB" },
  { name: "Next.js", percent: 85, iconName: "SiNextdotjs", color: "#000000" },
  { name: "Angular", percent: 75, iconName: "SiAngular", color: "#DD0031" },
  { name: "CSS/SCSS", percent: 85, iconName: "SiCss3", color: "#264de4" },
  { name: "HTML5", percent: 85, iconName: "SiHtml5", color: "#E34C26" },
  { name: "JavaScript", percent: 90, iconName: "SiJavascript", color: "#F7DF1E" },
  { name: "TypeScript", percent: 90, iconName: "SiTypescript", color: "#3178C6" },
  { name: "MUI", percent: 75, iconName: "SiMui", color: "#007FFF" },
  { name: "Styled", percent: 75, iconName: "SiStyledcomponents", color: "#DB7093" },
  { name: "MongoDB", percent: 70, iconName: "SiMongodb", color: "#47A248" },
  { name: "SQL", percent: 65, iconName: "SiMysql", color: "#00758F" },
  { name: "Git", percent: 90, iconName: "SiGit", color: "#F1502F" },
  { name: "Jest", percent: 70, iconName: "SiJest", color: "#99425B" },
];


const seed = async () => {
  await connectDB();
  for (const s of defaultSkills) {
    const exists = await Skill.findOne({ name: s.name });
    if (!exists) {
      await Skill.create(s);
    }
  }
  console.log("Skills seeded!");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
