# CVA (Class Variance Authority) Documentation

Type-safe variant API for creating component variants with TypeScript.

---

## Overview

CVA provides:
- Type-safe component variants
- Compound variants for complex conditions
- Default variants
- Seamless TypeScript integration

---

## Quick Links

### Core Concepts
- **[Variants](./varients.md)** - Creating and using variants
- **[Compound Variants](./varients.md#compound-variants)** - Multi-condition variants
- **[TypeScript](./typescript.md)** - Type safety and `VariantProps`

### Advanced
- **[Compose](./compose.md)** - Composing multiple CVA instances
- **[Extend](./extend.md)** - Extending existing variants
- **[Examples](./example.md)** - Real-world usage examples

---

## Quick Start

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-black",
    },
    size: {
      small: "text-sm px-2 py-1",
      large: "text-lg px-4 py-2",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "small",
  },
});

type ButtonProps = VariantProps<typeof button>;

export function Button({ intent, size, className }: ButtonProps & { className?: string }) {
  return <button className={button({ intent, size, className })} />;
}
```

---

## Integration with This Project

CVA can be used for:
- **Component variants** - Different card styles
- **Theme switching** - Light/dark modes
- **Responsive variants** - Mobile/desktop layouts
- **State variants** - Active, disabled, loading states

---

## Related Documentation

### Project Patterns
- [Creating Card Variants Guide](../guides/creating-card-variants.md) - Building new card designs
- [Tailwind Quick Reference](../tailwind/QUICK-REFERENCE.md) - Tailwind utilities

### Similar Tools
- [Tailwind CSS](../tailwind/README.md) - Utility-first CSS
- [Tailwind Motion](../tailwind-motion/tailwind-motion.md) - Animation utilities

---

## External Resources

- [Official CVA Documentation](https://cva.style)
- [CVA GitHub Repository](https://github.com/joe-bell/cva)

---

**Note**: While CVA is documented here for reference, the current project primarily uses direct Tailwind classes and the `cn()` utility. Consider CVA for future complex variant systems.

---

**Last Updated**: November 6, 2025
