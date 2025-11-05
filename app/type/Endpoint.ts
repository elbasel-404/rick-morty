import type { ZodType } from "zod";

export interface Endpoint<T> {
  url: string;
  schema: ZodType<T>;
}
