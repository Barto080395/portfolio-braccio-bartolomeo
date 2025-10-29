// ISkill.ts
export type ISkill = {
  name: string;
  percent: number;
  icon?: any;       // solo lato frontend
  iconName?: string; // nome dell'icona da salvare su Mongo
  color?: string;
};
