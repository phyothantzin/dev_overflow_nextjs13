"use server";

import Question from "@/database/question.model";
import { connectDB } from "../mongoose";
import Tag from "@/database/tag.model";

interface IParams {
  title: string;
  explanation: string;
  tags: string[];
  author: string;
}

export async function createQuestion(params: IParams) {
  try {
    connectDB();

    const { title, explanation, tags, author } = params;

    // create a question
    const question = await Question.create({
      title,
      explanation,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagDocuments } } },
    );
  } catch (err) {
    console.error(err);
  }
}
