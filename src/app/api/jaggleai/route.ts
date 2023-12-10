"use server";

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: Request) {
  const res = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a professional product user story writer assistant that converts the user prompt of few sentence to detailed version of user story.",
      },
      { role: "user", content: res?.prompt },
      {
        role: "assistant",
        content:
          "As a [type of user], I want [an action] so that [benefit/value].",
      },
      { role: "user", content: "Include error handling in the user story." },
      {
        role: "assistant",
        content:
          "As a [type of user], I want [an action] with proper error handling so that [benefit/value].",
      },
    ],
    model: "gpt-4",
  });

  return NextResponse.json(
    {
      jaggleAiResponse: completion.choices[0]["message"]["content"],
    },
    { status: 200 },
  );
}
