import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId, page: 1 });
  return (
    <>
      {result && result.answers && result.answers.length > 0 ? (
        result.answers.map((answer) => (
          <div key={answer._id} className="mt-2">
            <AnswerCard
              _id={answer._id}
              clerkId={clerkId}
              title={answer.title}
              tags={answer.tags}
              author={answer.author}
              upvotes={answer.upvotes}
              views={answer.views}
              answers={answer.answers}
              createdAt={answer.createdAt}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default AnswerTab;
