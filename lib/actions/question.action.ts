"use server";

import { connectDB } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    connectDB();
  } catch (err) {
    console.error(err);
  }
}
