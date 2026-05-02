import { supabase } from "../libs/supabase";
import { Skill, User } from "../types/user";

export const fetchUser = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const skills = await getUserSkills(id);

  return new User(
    data.id,
    data.name,
    data.description,
    data.github_id,
    data.qiita_id,
    data.x_id,
    data.created_at,
    skills
  );
};

async function getUserSkills(id: string): Promise<Skill[]> {
  const { data: userSkills } = await supabase
  .from("user_skill")
  .select("user_id, skill_id")
  .eq("user_id", id)

  if (!userSkills) return []

  const { data: skills } = await supabase
    .from("skills")
    .select("id, name")
    .in("id", userSkills.map(skill => skill.skill_id));

  return skills?.map(skill => new Skill(skill.id, skill.name)) ?? [];
}