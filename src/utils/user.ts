import type { User } from "../shared/types/user";

export function generateGithubUrl(user: User) {
  return `https://github.com/${user.githubId}`;
}
export function generateQiitaUrl(user: User) {
  return `https://qiita.com/${user.qiitaId}`;
}
export function generateXUrl(user: User) {
  return `https://x.com/${user.xId}`;
}