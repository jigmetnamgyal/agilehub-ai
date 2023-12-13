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
        content: `You are an assistant helping to generate a Bpmn flowchart about a topic. Only return the bpmn flowchart in mermaid JS format with no other text.
          Each node has to have a type, which is one of the following: 
          - startEvent
          - endEvent
          - activity
          You should include the node type in it's label, like this "Start ¡!startEvent!¡" or "Do something ¡!activity!¡".
          The diagram direction should be LR, left right.
          Only return the Bpmn flowchart in mermaid JS format with no markdown markers. The edge should be animated.
          `,
      },
      { role: "user", content: res?.prompt },
    ],
    model: "gpt-4-1106-preview",
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
