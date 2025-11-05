# TypeScript Patterns

Learn TypeScript patterns used in this project for type-safe development.

---

## Overview

Common TypeScript patterns:
- Component props typing
- Zod schema inference
- Generic utilities
- Type guards

---

## Component Props

### Basic Props

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### With Children

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

---

## Zod Schema Inference

Extract types from Zod schemas:

```tsx
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

type User = z.infer<typeof userSchema>;
// { name: string; age: number }
```

---

## Generic Components

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}

// Usage
<List items={characters} renderItem={(char) => <div>{char.name}</div>} />
```

---

## Type Guards

```tsx
function isCharacter(value: unknown): value is Character {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "status" in value
  );
}

if (isCharacter(data)) {
  console.log(data.name); // TypeScript knows data is Character
}
```

---

## Utility Types

```tsx
// Make all properties optional
type PartialCharacter = Partial<Character>;

// Pick specific properties
type CharacterPreview = Pick<Character, "id" | "name" | "image">;

// Omit properties
type CharacterWithoutId = Omit<Character, "id">;

// Extract from union
type Status = Character["status"]; // "Alive" | "Dead" | "unknown"
```

---

## Related Documentation

- [CVA TypeScript](../cva/typescript.md)
- [Zod Define Schemas](../zod/define-schemas.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

