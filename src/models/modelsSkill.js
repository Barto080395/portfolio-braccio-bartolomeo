import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percent: { type: Number, required: true },
  iconName: { type: String },
  color: { type: String }, // <-- opzionale
});

export const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
