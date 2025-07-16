import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

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

export class StringFormatters {
  public static ellipisify(
    txt: string,
    before: number = 4,
    after: number = 4,
  ): string {
    if (txt.length <= before + after) return txt;
    const start = txt.slice(0, before);
    const end = txt.slice(-after);
    return `${start.trim()}...${end.trim()}`;
  }

  public static ellipisifyIfLongerThan(
    txt: string,
    maxUntilEllipsified: number,
    before: number = 4,
    after: number = 4,
  ): string {
    if (txt.length < maxUntilEllipsified) return txt;
    if (txt.length <= before + after) return txt;
    const start = txt.slice(0, before);
    const end = txt.slice(-after);
    return `${start.trim()}...${end.trim()}`;
  }
}

export class DateFormatters {
  static dateTime = "MM/dd/yyyy hh:mm";
  static date = "MM/dd/yyyy";

  public static format(
    date: Date,
    toFormat: string = DateFormatters.dateTime,
  ): string {
    return format(date, toFormat);
  }
}
