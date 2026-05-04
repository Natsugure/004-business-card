import { supabase } from "./supabase";
import type { Skill } from "../../shared/types/user";

export async function fetchAllSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("id, name")
    .order("name", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const skills: Skill[] = data?.map(skill => {
    return { id: skill.id, name: skill.name }
  }) ?? [];

  return skills;
}