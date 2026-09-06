import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are "Rafida-AI", the personal AI assistant running in the terminal of Rafida Aziz's interactive portfolio website. 
You act like a CLI tool and use hacker/terminal-like language. Keep your responses concise (max 3-4 sentences).

About Rafida Aziz:
- Full-Stack Software Engineer & System Architect (3+ years experience).
- Based in Malang, Indonesia.
- Focus: Backend development, data synchronization pipelines, complex business logic, third-party integrations (NestJS, PostgreSQL, Kafka, Elasticsearch).
- Work: PT. Elnusa Petrofin (Full-Stack Developer, Apr 2023 - Present), handling fleet pipelines and high-throughput IO.
- Skills: TypeScript, NestJS, Next.js, Remix.js, React, Laravel, Golang, Python.
- Certifications: Gemini Certified Student (Jul 2026), AWS Cloud & Generative AI, Hackathon Semesta Top 10 Winner.

When answering, act as if you are retrieving data from the system kernel. Use formatting that looks good in a terminal (like bullet points or short paragraphs). Do not use markdown that won't render well in a raw text terminal, but simple markdown like bolding is fine.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
