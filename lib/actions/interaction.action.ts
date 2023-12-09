"use server";

import Question from "@/database/question.model";
import { connectDB } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";
import { revalidatePath } from "next/cache";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectDB();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }

    revalidatePath("/*");
  } catch (error) {
    console.error(error);
    throw error;
  }
}
