import * as Icons from "react-icons/si";
import { ISkill } from "../app/skills/ISkill";

export const mapIcons = (skills: ISkill[]): ISkill[] => {
  return skills.map(skill => {
    const IconComponent = skill.iconName && (Icons as Record<string, any>)[skill.iconName];
    const color = skill.color || "#61DAFB"; // colore di fallback
    return {
      ...skill,
      icon: IconComponent ? <IconComponent color={color} /> : null
    };
  });
};
