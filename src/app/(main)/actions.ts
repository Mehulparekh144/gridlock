'use server'

import { auth } from "@/lib/auth";
import { openai } from "@/lib/openai"
import prisma from "@/lib/prisma";
import { logger, someThingWentWrong } from "@/lib/utils";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import z from 'zod'

const GameGridItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  grid: z.array(
    z.object({
      question: z.string(),
      category: z.string(),
      points: z.number(),
      answer: z.string(),
    })
  )
});

type GameGridItem = z.infer<typeof GameGridItemSchema>;

const SYSTEM_PROMPT = `You are an AI assistant tasked with creating a Jeopardy-style trivia game board based on a user-provided idea or topic.\nGenerate a SINGLE VALID JSON object containing a name, description, and grid for the game. Output ONLY the JSON object, with no surrounding text or markdown.\n\nThe JSON object MUST have the following top-level fields:\n- \"name\": A short, catchy title for the game based on the idea.\n- \"description\": A brief (1-2 sentence) description of the game/topic.\n- \"grid\": An array containing EXACTLY 25 trivia question objects related to the given topic.\n\nEach question object within the \"grid\" array MUST have the following fields: \"question\", \"category\", \"points\", and \"answer\".\n\nCRITICAL STRUCTURE REQUIREMENTS:\n1.  There MUST be EXACTLY 5 distinct categories relevant to the topic.\n2.  Each of the 5 categories MUST contain EXACTLY 5 questions.\n3.  Within EACH category, the 5 questions MUST have the unique point values: 100, 200, 300, 400, and 500. ONE question per point value per category.\n4.  The \"grid\" array MUST contain a total of EXACTLY 25 question objects (5 categories * 5 questions).\n\nEnsure all answers are factual, concise, and unambiguous. Avoid subjective, conceptual, or multi-part answers. Answers should ideally be single words, names, places, dates, or very short phrases.\n\nPoint value difficulty scale within each category:\n- 100 points: Easy / Common knowledge\n- 200 points: Not too bad / Slightly less common\n- 300 points: Good to know / Moderately specific\n- 400 points: Nerd / Quite specific or detailed\n- 500 points: Hardcore fans / Deep knowledge or obscure facts\n\nREMEMBER: Output ONLY the raw JSON object. Ensure it's valid and strictly adheres to the 5 categories x 5 unique points structure, totaling 25 items.`

export const generateBoard = async (idea: string) => {
  try {
    logger(`Generating board for idea: ${idea}`);
    const gameCount = await getGameCount();

    if (gameCount && gameCount >= 3) {
      someThingWentWrong("You have reached the maximum number of games.");
      return [];
    }

    const reinforcedIdea = `${idea}\n\nIMPORTANT: Remember to generate the JSON with exactly 5 categories, each having exactly 5 questions with unique point values (100, 200, 300, 400, 500), for a total of 25 grid items.`;

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        }, {
          role: "user",
          content: reinforcedIdea
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "JeopardyBoardData",
          description: "Schema for a full Jeopardy board including name, description, and grid.",
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "A short, catchy title for the game based on the idea."
              },
              description: {
                type: "string",
                description: "A brief (1-2 sentence) description of the game/topic."
              },
              grid: {
                type: "array",
                description: "The array of 25 Jeopardy questions.",
                items: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    category: { type: "string" },
                    points: { type: "number" },
                    answer: { type: "string" }
                  },
                  required: ["question", "category", "points", "answer"]
                }
              }
            },
            required: ["name", "description", "grid"]
          }
        }
      }
    });

    let jsonContent = response.choices[0].message.content;

    if (!jsonContent) {
      console.error("No content received from the API.");
      return [];
    }

    if (jsonContent.includes("```json")) {
      jsonContent = jsonContent.replace("```json", "").replace("```", "");
    }

    if (jsonContent.includes("```")) {
      jsonContent = jsonContent.replace("```", "");
    }
    logger(`Received JSON content: ${jsonContent}`);
    const parsedJson = JSON.parse(jsonContent.trim());

    const validatedJson = GameGridItemSchema.parse(parsedJson);

    const game = await createGame(validatedJson);

    logger(`Game created: ${game}`);
    revalidatePath("/dashboard");

    return game;
  } catch (error) {
    someThingWentWrong(error as string);
    return [];
  }
}

const createGame = async (gridItem: GameGridItem) => {
  const { name, description, grid } = gridItem;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not found");
  }

  const game = await prisma.game.create({
    data: {
      userId: session.user.id,
      name: name,
      description: description,
      grid: {
        createMany: {
          data: grid,
        },
      },
    },
  });

  return game;
}


export const deleteGame = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    someThingWentWrong("User not found");
    return;
  }

  await prisma.game.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/dashboard");
};


export const getGameCount = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    someThingWentWrong("User not found");
    return;
  }

  const gameCount = await prisma.game.count({
    where: { userId: session.user.id },
  });

  return gameCount;
};
