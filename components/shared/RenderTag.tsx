import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  _id: number;
  name: string;
  totalQuestions: number;
  showCounts: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCounts }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 cursor-pointer rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {showCounts && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
