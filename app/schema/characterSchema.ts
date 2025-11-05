import z from "zod";

const locationSchema = z.object({
  name: z.string(),
  url: z.url().or(z.string()),
});

const originSchema = z.object({
  name: z.string(),
  url: z.url().or(z.string()),
});

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  image: z.url(),
  episode: z.array(z.url()),
  origin: originSchema,
  location: locationSchema,
});

export type Character = z.infer<typeof characterSchema>;
