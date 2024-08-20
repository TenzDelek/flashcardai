import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function POST(req: NextRequest) {
  const model: GenerativeModel = genAI.getGenerativeModel({
    model: "gemini-pro",
  });
  const data = await req.text();
  const systemprompt = `You are a flashcard creator. Your task is to generate 9 concise and effective flashcards based on the given information: ${data}. Follow these guidelines:
1. Create clear and concise questions for the front of each flashcard.
2. Provide accurate and informative answers for the back of each flashcard.
3. Ensure that each flashcard focuses on a simple concept or piece of information.
4. Include a variety of question types such as definitions, examples, comparisons, and applications.
5. Avoid overly complex or ambiguous phrasing in both questions and answers.
6. When appropriate, use mnemonics or memory aids to help reinforce the information.
7. Use simple language to make the flashcards accessible to a wide range of learners.
8. If given a body of text, extract the most important and relevant information for the flashcards.
9. Aim to create a balanced set of flashcards that covers the topic comprehensively.

Return ONLY a JSON object in the following format, with no additional text before or after:
{
  "flashcards": [
    { "front": "Question 1", "back": "Answer 1" },
    { "front": "Question 2", "back": "Answer 2" },
    ...
  ]
}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: systemprompt }] }],
    });

    const response = await result.response;
    const text = response.text();

    // Attempt to parse the JSON
    try {
      const parsedFlashcards = JSON.parse(text);
      return NextResponse.json(parsedFlashcards);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      
      // If parsing fails, attempt to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const extractedJson = JSON.parse(jsonMatch[0]);
          return NextResponse.json(extractedJson);
        } catch (extractError) {
          console.error("Error parsing extracted JSON:", extractError);
        }
      }
      
      // If all parsing attempts fail, return an error
      return NextResponse.json(
        { error: "Failed to parse flashcards", rawResponse: text },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate flashcards" },
      { status: 500 }
    );
  }
}