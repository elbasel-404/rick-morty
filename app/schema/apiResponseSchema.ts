import z from "zod";

export const apiResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.url().nullable(),
    prev: z.url().nullable(),
  }),
  results: z.array(z.unknown()),
});
