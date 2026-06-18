import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

function loadYaml<T>(filename: string): T {
  const filePath = path.resolve('src/data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(content) as T;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  tags: string[];
  year: number;
  highlight?: boolean;
  role?: string;
  type?: string;
  image?: string;
}

export interface CareerEntry {
  period: string;
  organization: string;
  role: string;
  focus: string;
  awards?: string[];
}

export interface Education {
  period: string;
  organization: string;
  department: string;
  focus: string;
}

export interface Research {
  title: string;
  venue: string;
  coauthors?: string[];
}

export interface CareerData {
  current: {
    title: string;
    organization: string;
    affiliation: string;
    since: string;
  };
  history: CareerEntry[];
  education: Education[];
  research: Research[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  year?: number;
  date?: string;
  type?: string;
}

export interface SkillsData {
  technical: SkillCategory[];
  kaggle?: {
    tier: string;
    rank: string;
    medals: { silver: number; bronze: number };
    competitions: number;
  };
  certifications: Certification[];
}

export interface Talk {
  title?: string;
  event: string;
  year?: number;
  type?: string;
  coauthors?: string[];
  url?: string;
}

export interface Article {
  title: string;
  url: string;
  year?: number;
  date?: string;
}

export interface Platform {
  name: string;
  type: string;
  url?: string;
  article_count?: number;
  articles: Article[];
  works?: string[];
}

export interface WritingsData {
  platforms: Platform[];
}

export function loadProjects(): Project[] {
  return loadYaml<Project[]>('projects.yaml');
}

export function loadCareer(): CareerData {
  return loadYaml<CareerData>('career.yaml');
}

export function loadSkills(): SkillsData {
  return loadYaml<SkillsData>('skills.yaml');
}

export function loadTalks(): Talk[] {
  return loadYaml<Talk[]>('talks.yaml');
}

export function loadWritings(): WritingsData {
  return loadYaml<WritingsData>('writings.yaml');
}
