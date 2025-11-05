# Zod Documentation

[🏠 Home](../index.md) | [Zod](./index.md)


TypeScript-first schema validation library for runtime type checking and data validation.

---

## Overview

Zod provides:

- Runtime type validation
- Static type inference
- Composable schemas
- Detailed error messages

---

## Quick Links

### Getting Started

- **[Basic Usage](./basic.md)** - Schemas, parsing, and type inference
- **[Defining Schemas](./define-schemas.md)** - Complete schema API reference

### Advanced Topics

- **[Error Handling](./errors.md)** - Working with validation errors
- **[JSON Validation](./json.md)** - Validating JSON data
- **[Meta Information](./meta.md)** - Schema metadata and descriptions
- **[Tools & Utilities](./tools.md)** - Helper functions and utilities

---

## Common Use Cases

### API Response Validation

```tsx
import { z } from "zod";
import { validateJson } from "@/app/util";

const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
});

const response = await fetch("/api/character/1");
const character = await validateJson(response, characterSchema);
// Fully typed and validated!
```

### Form Validation

```tsx
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18),
});

type FormData = z.infer<typeof formSchema>;
```

---

## Integration with This Project

Zod is used throughout the project for:

- **API validation** - Validating Rick and Morty API responses
- **Type safety** - Inferring TypeScript types from schemas
- **Error handling** - Catching malformed data early

**Example**: Character schema validation in `app/schema/characterSchema.ts`

---

## Related Documentation

### Project Guides

- [Working with API Guide](../guides/working-with-api.md) - Using Zod with API calls
- [TypeScript Patterns Guide](../guides/typescript-patterns.md) - Type inference patterns

### Technical Docs

- [Project Utilities](../project/utilities-quick-reference.md) - `validateJson` utility
- [Next.js Fetching Data](../next/fetching-data.md) - Data validation in Server Components

---

## External Resources

- [Official Zod Documentation](https://zod.dev)
- [Zod GitHub Repository](https://github.com/colinhacks/zod)

---

**Last Updated**: November 6, 2025
