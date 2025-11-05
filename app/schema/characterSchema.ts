import z from "zod";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
});
export type Character = z.infer<typeof characterSchema>;
