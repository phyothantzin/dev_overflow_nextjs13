"use server";

import User from "@/database/user.model";
import { connectDB } from "../mongoose";

export async function getUserById(userId: string) {
  try {
    connectDB();
    const user = await User.findOne({ clerkId: userId });
    // if (!user) {
    //   throw new Error("User not found");
    // }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
