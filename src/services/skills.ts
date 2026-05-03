import { supabase } from "../libs/supabase";
import { Skill } from "../types/user";

export async function fetchAllSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("id, name")
    .order("name", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.map(skill => new Skill(skill.id, skill.name)) ?? [];
}