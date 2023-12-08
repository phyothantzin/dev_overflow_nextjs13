import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
