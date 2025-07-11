import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/**
 * Recursively replaces all undefined values with null in any nested object or array.
 */
export function replaceUndefinedWithNull<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((item) => replaceUndefinedWithNull(item)) as T;
  } else if (input && typeof input === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(input)) {
      console.log("🚀 - :29 - [key, value]:", [key, value]);
      if (value === undefined) {
        result[key] = null;
      } else {
        result[key] = replaceUndefinedWithNull(value);
      }
    }
    return result;
  } else {
    return input;
  }
}
