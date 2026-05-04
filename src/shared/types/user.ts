export interface Skill {
  id: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
  description: string;
  githubId: string | null;
  qiitaId: string | null;
  xId: string | null;
  createdAt: string;
  skills: Skill[];
}