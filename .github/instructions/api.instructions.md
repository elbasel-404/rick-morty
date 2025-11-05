---
applyTo: "app/schema/**/*.ts,app/endpoint/**/*.ts,app/http/**/*.ts,app/util/**/*.ts"
---

# API and Schema Development Instructions

## Schema Validation

When working with API schemas:

- **Always use Zod** for runtime validation of API responses
- Define schemas in `app/schema/` directory
- Export schemas and infer TypeScript types from them:
  ```tsx
  export const mySchema = z.object({ ... });
  export type MyType = z.infer<typeof mySchema>;
  ```

## API Endpoints

When defining new endpoints in `app/endpoint/`:

- Use the `Endpoint` type from `app/type/Endpoint.ts`
- Define endpoints as constants with clear naming
- Include all query parameters in the type definition

Example:

```tsx
import type { Endpoint } from "@/app/type";

export const MY_ENDPOINT: Endpoint = {
  path: "/api/path",
  params: ["param1", "param2"] as const,
};
```

## HTTP Utilities

When making API calls:

- Use the `get` function from `app/http/get.ts`
- Always validate responses with Zod schemas
- Use `validateJson` utility for type-safe validation
- Handle errors with the `logError` utility

Example:

```tsx
import { get } from "@/app/http";
import { mySchema } from "@/app/schema";
import { validateJson, logError } from "@/app/util";

try {
  const response = await get(url);
  const data = await validateJson(response, mySchema);
  // Use validated data
} catch (error) {
  logError("Failed to fetch data", error);
}
```

## Utility Functions

When creating utilities in `app/util/`:

- Keep functions pure (no side effects)
- Use descriptive names that indicate what the function does
- Add TypeScript type definitions
- Document complex logic with comments
- Export from `app/util/index.ts`

## Rick and Morty API

When working with the Rick and Morty API:

- Base URL: https://rickandmortyapi.com/api
- Use `getApiRootUrl()` to get the base URL
- Use `buildFetchUrl()` to construct URLs with query parameters
- Character schema is defined in `app/schema/characterSchema.ts`
- API response schema is in `app/schema/apiResponseSchema.ts`

## Error Handling

- Wrap API calls in try-catch blocks
- Use `logError` utility for consistent error logging
- Provide meaningful error messages
- Consider fallback strategies for failed requests

## Type Safety

- Never use `any` - use `unknown` if the type is truly unknown
- Validate all external data (API responses) with Zod
- Use type guards when necessary
- Prefer type inference from Zod schemas over manual type definitions
