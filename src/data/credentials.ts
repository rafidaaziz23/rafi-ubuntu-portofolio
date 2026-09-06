export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  verified: boolean;
  link: string;
}

export const CREDENTIALS_DATA: Credential[] = [
  {
    id: "gcp-gemini",
    title: "Gemini Certified Student",
    issuer: "Google For Education",
    date: "Issued: Jul 2026",
    icon: "gemini",
    verified: true,
    link: "#",
  },
  {
    id: "aws-ai",
    title: "Cloud & Generative AI Fundamentals on AWS",
    issuer: "AWS x Dicoding Indonesia",
    date: "Issued: Aug 2026",
    icon: "aws",
    verified: true,
    link: "#",
  },
  {
    id: "aws-spec",
    title: "Spec-Driven Dev & AI-Assisted Engineering",
    issuer: "AWS x Dicoding Indonesia",
    date: "Issued: Aug 2026",
    icon: "aws",
    verified: true,
    link: "#",
  },
  {
    id: "cisco-cpa",
    title: "CPA: Programming Essentials in C++",
    issuer: "Cisco Networking Academy",
    date: "Issued: Jan 2020",
    icon: "cisco",
    verified: true,
    link: "#",
  },
  {
    id: "hackerrank",
    title: "Problem Solving (Basic)",
    issuer: "Hackerrank",
    date: "Issued: Oct 2022",
    icon: "leetcode",
    verified: true,
    link: "https://www.hackerrank.com/",
  },
  {
    id: "hackathon-semesta",
    title: "Top 10 Winner (Programmer) - Hackathon Semesta",
    issuer: "PT. Sentra Vidya Utama",
    date: "Issued: Jul 2022",
    icon: "award",
    verified: true,
    link: "#",
  }
];
