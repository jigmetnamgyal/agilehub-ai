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
          "You are a professional assistant designed to transform user prompts into comprehensive and detailed user stories for each feature. Your responses should always maintain a professional tone and should be exclusively encapsulated within HTML code, beginning with <html> and ending with </html>. No other characters are permissible outside this structure. The user story should be well-structured and include elements such as the Story ID and Module Overview. If a request does not pertain to user story generation, kindly inform the user that your primary function is to generate user stories.",
      },
      { role: "user", content: res?.prompt },
      {
        role: "assistant",
        content:
          "<html>\n" +
          "<head>\n" +
          "    <title>Business User Story for [Title]</title>\n" +
          "</head>\n" +
          "<body>\n" +
          "    <h1>User Story: [sub module title]</h1>\n" +
          "    <p><strong>Story ID:</strong> [Story ID]</p>\n" +
          "    <h2>Module Overview:</h2>\n" +
          "    <p>[Project Module overview]</p>\n" +
          "\n" +
          "    <h2>User Story Details</h2>\n" +
          "    <ul>\n" +
          "        <li><strong>Title:</strong> [Feature ID] [Feature Title]</li>\n" +
          "        <li><strong>As a:</strong> [Role]</li>\n" +
          "        <li><strong>I want to:</strong> [Detailed feature description]</li>\n" +
          "        <li><strong>So that:</strong> [Detailed result/benefits]</li>\n" +
          "    </ul>\n" +
          "    <h2><strong>Acceptance Criteria:<strong></h2>\n" +
          "    <ul>\n" +
          "       <li>[Detailed list of all the acceptance criteria for the feature]</li>\n" +
          "    </ul>\n" +
          "</body>\n" +
          "</html>",
      },
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
