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
    title: "Google Gemini API Developer",
    issuer: "Google",
    date: "Issued: Jan 2024",
    icon: "gemini",
    verified: true,
    link: "#",
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "Issued: Nov 2023",
    icon: "aws",
    verified: true,
    link: "#",
  },
  {
    id: "cisco-ccna",
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    date: "Issued: Mar 2023",
    icon: "cisco",
    verified: true,
    link: "#",
  },
  {
    id: "leetcode",
    title: "LeetCode 500+ Solved",
    issuer: "LeetCode Algorithms",
    date: "Continuous",
    icon: "leetcode",
    verified: true,
    link: "https://leetcode.com/",
  }
];
