import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  const intervals: Record<string, number> = {
    year: 31536000, // seconds in a non-leap year
    month: 2592000, // 30 days
    day: 86400, // 24 hours
    hour: 3600, // 60 minutes
    minute: 60, // 60 seconds
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const timeDiff = Math.floor(diffInSeconds / secondsInUnit);

    if (timeDiff >= 1) {
      return `${timeDiff} ${unit}${timeDiff !== 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

// export const formatNumberWithExtension = (number: number): string => {
//   let result: string;

//   if (Math.abs(number) >= 1e6) {
//     result = (number / 1e6).toFixed(1) + "M";
//   } else if (Math.abs(number) >= 1e3) {
//     result = (number / 1e3).toFixed(1) + "K";
//   } else {
//     result = number.toString();
//   }

//   return result;
// };

export const formatNumberWithExtension = (number: number): string => {
  let result: string;

  if (typeof number !== "undefined") {
    if (Math.abs(number) >= 1e6) {
      result = (number / 1e6).toFixed(1) + "M";
    } else if (Math.abs(number) >= 1e3) {
      result = (number / 1e3).toFixed(1) + "K";
    } else {
      result = number.toString();
    }
  } else {
    // Handle the case when number is undefined
    result = "N/A"; // Or any other default value or appropriate error handling
  }

  return result;
};

export function getMonthAndYear(dateObject: Date): string {
  // Ensure the input is a Date object
  if (!(dateObject instanceof Date)) {
    throw new Error("Invalid input. Please provide a Date object.");
  }

  // Get the month and year from the Date object
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();

  // Format the month and year and return the result
  const joinedDate = `${month} ${year}`;
  return joinedDate;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParams) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;

    const badgeLevels = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      // @ts-ignore
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
};
