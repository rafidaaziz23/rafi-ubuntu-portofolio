// src/data/skills.ts
export interface SkillItem {
  name: string;
  category: 'backend' | 'data' | 'frontend' | 'languages' | 'devops_ai';
  experience?: string;
  appliedIn?: string[];
  tag?: string;
}

export const SKILLS_DATA: SkillItem[] = [
  // Backend
  { name: 'NestJS', category: 'backend', experience: '3+ Years Prod', appliedIn: ['Fleet Management', 'Tyre Management (TMS)', 'Chemical Blending'], tag: 'Core Backend' },
  { name: 'Node.js & Express.js', category: 'backend', appliedIn: ['High-throughput APIs'] },
  { name: 'Laravel & CodeIgniter', category: 'backend', appliedIn: ['Unmul Budget', 'MIND ID Audit'] },
  { name: 'Spring Boot', category: 'backend', appliedIn: ['Fleet Management Contracts'] },
  { name: 'GraphQL & REST APIs', category: 'backend', tag: 'API Architecture' },

  // Data & Streaming
  { name: 'PostgreSQL', category: 'data', experience: 'Production', appliedIn: ['Fleet Management', 'Tyre Management (TMS)', 'Elnusa'] },
  { name: 'Apache Kafka', category: 'data', appliedIn: ['Peduli Awak Mobil Tangki', 'Event Pipeline'] },
  { name: 'Elasticsearch', category: 'data', appliedIn: ['Driver Performance Indexing'] },
  { name: 'Redis', category: 'data', tag: 'Caching' },
  { name: 'Prisma ORM', category: 'data', appliedIn: ['Tyre Management (TMS)', 'Elnusa Core Services'] },
  { name: 'MinIO & MySQL', category: 'data', tag: 'Storage' },

  // Frontend & Mobile
  { name: 'React.js & Next.js', category: 'frontend', appliedIn: ['Chemical Blending', 'Elnusa'] },
  { name: 'Remix.js', category: 'frontend', appliedIn: ['Fleet Management', 'Tyre Management (TMS)', 'Peduli Awak'] },
  { name: 'Tailwind CSS', category: 'frontend', tag: 'Styling' },
  { name: 'Flutter', category: 'frontend', tag: 'Mobile' },

  // Languages
  { name: 'TypeScript', category: 'languages', tag: 'Daily Driver' },
  { name: 'JavaScript', category: 'languages', tag: 'ES6+' },
  { name: 'PHP', category: 'languages' },
  { name: 'Python', category: 'languages', tag: 'Data & Clustering' },
  { name: 'Dart', category: 'languages' },
  { name: 'Java & Golang', category: 'languages' },
  { name: 'C++ & C#', category: 'languages' },

  // DevOps, Testing & AI
  { name: 'Docker', category: 'devops_ai' },
  { name: 'AWS & GCP', category: 'devops_ai', tag: 'Cloud Basics' },
  { name: 'Jest', category: 'devops_ai', tag: 'Unit Testing' },
  { name: 'SonarQube', category: 'devops_ai', tag: 'Code Quality' },
  { name: 'Antigravity CLI & Claude Code', category: 'devops_ai', tag: 'AI Engineering' }
];