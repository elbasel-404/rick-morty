# Working with the API

Learn how to fetch and validate data from the Rick and Morty API.

---

## Overview

This guide covers:
- Fetching data with the `get` utility
- Validating responses with Zod schemas
- Error handling patterns
- Building API URLs

---

## Prerequisites

- Understanding of async/await
- Basic TypeScript knowledge
- Familiarity with REST APIs

**Recommended Reading**:
- [Fetching Data (Next.js)](../next/fetching-data.md)
- [Zod Basic Usage](../zod/basic.md)

---

## Quick Start

### Fetch Characters

```tsx
import { getCharactersList } from "@/app/server/getCharactersList";

// In a Server Component
export default async function Page() {
  const data = await getCharactersList({ page: 1 });
  
  return (
    <div>
      {data.results.map(character => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  );
}
```

---

## Step-by-Step: Creating an API Function

### Step 1: Define the Schema

Create a schema in `app/schema/`:

```tsx
// app/schema/locationSchema.ts
import { z } from "zod";

export const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  dimension: z.string(),
  residents: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export type Location = z.infer<typeof locationSchema>;

export const locationListSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(locationSchema),
});
```

### Step 2: Define the Endpoint

Create endpoint in `app/endpoint/`:

```tsx
// app/endpoint/LOCATION_ENDPOINT.ts
import type { Endpoint } from "@/app/type";

export const LOCATION_ENDPOINT: Endpoint = {
  path: "/location",
  queryParams: ["page", "name", "type", "dimension"],
};
```

### Step 3: Create the Server Function

```tsx
// app/server/getLocationsList.ts
import { get } from "@/app/http";
import { buildFetchUrl, validateJson, logError } from "@/app/util";
import { LOCATION_ENDPOINT } from "@/app/endpoint";
import { locationListSchema } from "@/app/schema";

interface GetLocationsListParams {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export async function getLocationsList(params: GetLocationsListParams = {}) {
  try {
    const url = buildFetchUrl(LOCATION_ENDPOINT, params);
    const response = await get(url);
    const data = await validateJson(response, locationListSchema);
    return data;
  } catch (error) {
    logError("Failed to fetch locations", error);
    throw error;
  }
}
```

### Step 4: Export Everything

```tsx
// app/schema/index.ts
export * from "./locationSchema";

// app/endpoint/index.ts
export { LOCATION_ENDPOINT } from "./LOCATION_ENDPOINT";

// app/server/index.ts (if you have one)
export * from "./getLocationsList";
```

### Step 5: Use It

```tsx
import { getLocationsList } from "@/app/server/getLocationsList";

const locations = await getLocationsList({ page: 1, type: "Planet" });
```

---

## Utility Functions

### buildFetchUrl

Builds URLs with query parameters:

```tsx
import { buildFetchUrl } from "@/app/util";
import { CHARACTER_ENDPOINT } from "@/app/endpoint";

const url = buildFetchUrl(CHARACTER_ENDPOINT, {
  page: 1,
  status: "alive",
  species: "human",
});
// Result: "https://rickandmortyapi.com/api/character?page=1&status=alive&species=human"
```

### validateJson

Validates API responses:

```tsx
import { validateJson } from "@/app/util";
import { characterSchema } from "@/app/schema";

const response = await fetch(url);
const character = await validateJson(response, characterSchema);
// Throws if validation fails
```

### logError

Logs errors consistently:

```tsx
import { logError } from "@/app/util";

try {
  // ... operation
} catch (error) {
  logError("Operation failed", error);
  throw error;
}
```

---

## Error Handling

### Handle Validation Errors

```tsx
import { ZodError } from "zod";

try {
  const data = await validateJson(response, schema);
} catch (error) {
  if (error instanceof ZodError) {
    console.log("Validation errors:", error.issues);
    // Handle validation failure
  }
  throw error;
}
```

### Handle Network Errors

```tsx
try {
  const data = await getCharactersList({ page: 1 });
} catch (error) {
  // Network error, API error, or validation error
  return <div>Failed to load characters</div>;
}
```

---

## Common Patterns

### Fetch with Loading State (Client)

```tsx
"use client";

import { useState, useEffect } from "react";

export function CharacterList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/characters")
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{/* render data */}</div>;
}
```

### Parallel Fetching (Server)

```tsx
const [characters, locations] = await Promise.all([
  getCharactersList({ page: 1 }),
  getLocationsList({ page: 1 }),
]);
```

### Conditional Fetching

```tsx
const character = id ? await getCharacter(id) : null;
```

---

## Rick and Morty API Reference

### Base URL
```
https://rickandmortyapi.com/api
```

### Endpoints

- `/character` - Get all characters
- `/character/:id` - Get a single character
- `/location` - Get all locations
- `/episode` - Get all episodes

### Query Parameters

**Characters**:
- `page` - Page number
- `name` - Filter by name
- `status` - `alive`, `dead`, or `unknown`
- `species` - Filter by species
- `type` - Filter by type
- `gender` - `female`, `male`, `genderless`, or `unknown`

**Locations**:
- `page` - Page number
- `name` - Filter by name
- `type` - Filter by type
- `dimension` - Filter by dimension

---

## Next Steps

- [State Management Guide](./state-management.md) - Managing fetched data
- [Performance Optimization](./performance-optimization.md) - Caching strategies
- [TypeScript Patterns](./typescript-patterns.md) - Type-safe data handling

---

## Related Documentation

- [Fetching Data](../next/fetching-data.md)
- [Caching Overview](../next/cache.md)
- [Zod Documentation](../zod/)

---

**API Documentation**: [Rick and Morty API Docs](https://rickandmortyapi.com/documentation)
