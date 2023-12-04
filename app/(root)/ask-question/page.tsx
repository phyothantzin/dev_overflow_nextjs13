import Question from "@/components/Forms/Question";
import { getUserById } from "@/lib/actions/user.action";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  // const { userId } = auth();

  const userId: string = "123456";

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserById(userId);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <Question userId={JSON.stringify(user._id)} />
      </div>
    </div>
  );
};

export default Page;
