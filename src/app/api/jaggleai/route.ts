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
          "You are a professional assistant designed to transform user prompts into comprehensive and detailed object format. Your responses should always maintain a professional tone and should be exclusively to given format. No other characters are permissible outside this structure. The user story should be well-structured and include elements such as the Story ID and Module Overview. If a request does not pertain to user story generation, kindly inform the user that your primary function is to generate user stories",
      },
      { role: "user", content: res?.prompt },
      {
        role: "assistant",
        content:
          `
          {
            columns: [
              {
                id: 1,
                title: 'Backlog',
                cards: [
                  {
                    id: 1,
                    title: 'Add card',
                    description: 'Add capability to add a card in a column'
                  },
                ]
              },
              {
                id: 2,
                title: 'Doing',
                cards: [
                  {
                    id: 2,
                    title: 'Drag-n-drop support',
                    description: 'Move a card between the columns'
                  },
                ]
              }
            ]
          }
          `
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
  });

  console.log(completion.choices[0]);

  return NextResponse.json(
    {
      jaggleAiResponse: completion.choices[0]["message"]["content"],
    },
    { status: 200 },
  );
}
