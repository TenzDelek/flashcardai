import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI=new GoogleGenerativeAI(process.env.API_KEY!)

export async function POST(req:NextRequest)
{
    const model=genAI.getGenerativeModel({model:"gemini-pro"}); //model that takes simple input and output
    const data=await req.text()
    const systemprompt=`you are a flashcard creator, your task is to generate concise and effective flashcards based on the given  ${data}. follow this guideline
1. create clear and concise question for the front of the flashcard.
2. provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a simple concept or piece of information.
4. Include a variety of question types. such as definitions, examples, comparision, and application.
5. Avoid overly complex or ambiguous phrasing in both question and answers.
6. when appropriate, use mnemonic or memory aids to help reinforce the information.
7. tailor the difficulty level of the flashcards to the user's specified preference.
8. use simple language to make the flashcards accessible to a wide range of learner.
9. if given a body of text, extract the most important and relevant information for the flashcard.
10. aim to create a balanced set of flashcard that covers the topic comprehensively.

Remember the goal is to facilitate effective learning and rentention of information through these flashcards

return in the following JSON format
{
    "flashcard":[{
        "front":str,
        "back":str
    }]
}
`
    const prompt=systemprompt
    const result=await model.generateContent({
        contents:[
            {
                role:'model',
                parts:[{text:prompt}]
            },
            {
                role:'user',
                parts:[{text:data}]
            }
        ]
    });
    const flashcard=JSON.parse(result.response)
    return NextResponse.json(flashcard.flashcard)
}

