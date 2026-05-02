export class Skill {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class User {
  id: string;
  name: string;
  description: string;
  githubId: string | null;
  qiitaId: string | null;
  xId: string | null;
  createdAt: string;
  skills: Skill[];

  constructor(id: string, name: string, description: string, github_id: string | null, qiita_id: string | null, x_id: string | null, created_at: string, skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.githubId = github_id;
    this.qiitaId = qiita_id;
    this.xId = x_id;
    this.createdAt = created_at;
    this.skills = skills;
  }

  generateGithubUrl() {
    return `https://github.com/${this.githubId}`;
  }
  generateQiitaUrl() {
    return `https://qiita.com/${this.qiitaId}`;
  }
  generateXUrl() {
    return `https://x.com/${this.xId}`;
  }
}