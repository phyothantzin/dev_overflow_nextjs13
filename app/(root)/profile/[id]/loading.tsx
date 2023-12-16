import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="h-28 w-28 rounded-full" />

          <div className="mt-12 flex flex-col gap-5">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Skeleton className="h-7 w-24 rounded-md" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <Skeleton className="h-28 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <div className="flex flex-1 flex-col">
          <div className="mb-3 flex">
            <Skeleton className="h-11 w-24 rounded-r-none" />
            <Skeleton className="h-11 w-24 rounded-r-none" />
          </div>

          <div className="mb-3 flex w-full flex-col gap-6">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
