import { TeamMember } from "@/interfaces/team-member";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const teamDirectory = join(process.cwd(), "_team");

export function getTeamMemberSlugs() {
  return fs.readdirSync(teamDirectory);
}

export function getTeamMemberBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(teamDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as TeamMember;
}

export function getAllTeamMembers(): TeamMember[] {
  const slugs = getTeamMemberSlugs();
  const teamMembers = slugs
    .map((slug) => getTeamMemberBySlug(slug))
    // sort team members by name
    .sort((member1, member2) => member1.name.localeCompare(member2.name));
  return teamMembers;
} 