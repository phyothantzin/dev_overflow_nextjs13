import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "What is Next.js, What is React, What is Angular?",
    tags: [
      { _id: "1", name: "next" },
      { _id: "2", name: "js" },
    ],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "url_to_johns_picture",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2023-01-01T00:00:00.000Z"),
  },
  {
    _id: "2",
    title: "What is React.js?",
    tags: [
      { _id: "3", name: "react" },
      { _id: "4", name: "js" },
    ],
    author: {
      _id: "author2",
      name: "Jane Doe",
      picture: "url_to_janes_picture",
    },
    upvotes: 81200,
    views: 140244,
    answers: [],
    createdAt: new Date("2022-02-02T00:00:00.000Z"),
  },
  {
    _id: "3",
    title: "What is Angular?",
    tags: [
      { _id: "5", name: "angular" },
      { _id: "6", name: "js" },
    ],
    author: {
      _id: "author3",
      name: "John Jane",
      picture: "url_to_john_janes_picture",
    },
    upvotes: 5000,
    views: 1400000,
    answers: [],
    createdAt: new Date("2021-09-01T00:00:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} {...question} />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
