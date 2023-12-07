"use server";

import Answer from "@/database/answer.model";
import { connectDB } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectDB();

    const { answer, author, question, path } = params;

    const newAnswer = await Answer.create({
      answer,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
