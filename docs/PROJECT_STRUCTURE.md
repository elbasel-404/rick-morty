# Project Structure After Reorganization

```
rick-morty/
├── app/
│   ├── component/
│   │   ├── cards/                          # 🎴 All character cards
│   │   │   ├── card-i/                    # Card I - Purple 3D Theme
│   │   │   │   ├── CharacterCardI.tsx
│   │   │   │   ├── Card3DEffects.tsx
│   │   │   │   ├── CardImage.tsx
│   │   │   │   ├── CardOverlays.tsx
│   │   │   │   ├── FloatingParticles.tsx
│   │   │   │   ├── StatusBadge.tsx
│   │   │   │   ├── IDBadge.tsx
│   │   │   │   ├── CharacterName.tsx
│   │   │   │   ├── CharacterStats.tsx
│   │   │   │   ├── CharacterLocations.tsx
│   │   │   │   └── index.ts
│   │   │   ├── card-ii/                   # Card II - Cyber Flip Theme
│   │   │   │   ├── CharacterCardII.tsx
│   │   │   │   ├── CyberGrid.tsx
│   │   │   │   ├── ScanLine.tsx
│   │   │   │   ├── CornerAccents.tsx
│   │   │   │   ├── CyberStyles.tsx
│   │   │   │   ├── CyberCardFront.tsx
│   │   │   │   ├── CyberCardBack.tsx
│   │   │   │   ├── CyberCharacterName.tsx
│   │   │   │   ├── CyberIDBadge.tsx
│   │   │   │   ├── CyberImage.tsx
│   │   │   │   ├── CyberLoadingSpinner.tsx
│   │   │   │   ├── CyberLocations.tsx
│   │   │   │   ├── CyberParticles.tsx
│   │   │   │   ├── CyberStats.tsx
│   │   │   │   ├── CyberStatusBadge.tsx
│   │   │   │   └── index.ts
│   │   │   ├── card-iii/                  # Card III - Modern Clean
│   │   │   │   ├── CharacterCardIII.tsx
│   │   │   │   └── index.ts
│   │   │   ├── card-iv/                   # Card IV - Gradient Style
│   │   │   │   ├── CharacterCardIV.tsx
│   │   │   │   └── index.ts
│   │   │   ├── card-v/                    # Card V - Minimal Design
│   │   │   │   ├── CharacterCardV.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts                   # 🎯 Barrel export for all cards
│   │   │
│   │   ├── effects/                        # ✨ Animation components
│   │   │   ├── FadeIn.tsx
│   │   │   ├── FadeOut.tsx
│   │   │   ├── LazyImage.tsx
│   │   │   ├── ViewportDetector.tsx
│   │   │   ├── README.md
│   │   │   └── index.ts
│   │   │
│   │   ├── CardContainer.tsx               # 📦 Main container orchestrator
│   │   ├── SkeletonLoader.tsx              # 💀 Loading skeleton variants
│   │   ├── JsonViewer.tsx                  # 🔍 JSON display component
│   │   ├── SimpleCard.tsx                  # 🃏 Simple card component
│   │   ├── useInViewport.ts                # 👁️ Viewport detection hook
│   │   └── index.ts                        # 🎯 Main component exports
│   │
│   ├── styles/                             # 🎨 Style utilities
│   │   ├── cardStyles.ts                  # Card styling utilities
│   │   ├── cyberStyles.ts                 # Cyber theme utilities
│   │   └── index.ts                       # Barrel export
│   │
│   ├── hooks/                              # 🪝 React hooks
│   │   ├── useCardRotation.ts
│   │   ├── useImageLoad.ts
│   │   ├── useParticles.ts
│   │   ├── useSkeletonFade.ts
│   │   └── index.ts
│   │
│   ├── util/                               # 🛠️ App utilities
│   │   ├── buildFetchUrl.ts
│   │   ├── filterObject.ts
│   │   ├── getApiRootUrl.ts
│   │   ├── logError.ts
│   │   ├── validateJson.ts
│   │   └── index.ts
│   │
│   ├── schema/                             # 📋 Zod schemas
│   │   ├── apiResponseSchema.ts
│   │   ├── characterSchema.ts
│   │   └── index.ts
│   │
│   ├── endpoint/                           # 🌐 API endpoints
│   │   ├── CHARACTER_ENDPOINT.ts
│   │   └── index.ts
│   │
│   ├── http/                               # 🌍 HTTP utilities
│   │   ├── get.ts
│   │   └── index.ts
│   │
│   ├── server/                             # 🖥️ Server actions
│   │   └── getCharactersList.ts
│   │
│   ├── type/                               # 📝 TypeScript types
│   │   ├── Endpoint.ts
│   │   └── index.ts
│   │
│   ├── globals.css                         # 🌈 Global styles
│   ├── layout.tsx                          # 📄 Root layout
│   └── page.tsx                            # 🏠 Home page
│
├── lib/                                     # 📚 Framework-agnostic utilities
│   └── animationConfig.ts                  # ⚙️ Animation timing configuration
│
├── docs/                                    # 📖 Documentation
│   ├── ANIMATION_CONFIG.md                 # Animation system guide
│   ├── ANIMATION_QUICK_REFERENCE.md        # Quick reference for animations
│   ├── ANIMATION_REFACTORING.md            # Animation refactoring summary
│   ├── CARD_CONTAINER.md                   # CardContainer documentation
│   ├── REFACTORING_SUMMARY.md              # Component refactoring notes
│   ├── REORGANIZATION_SUMMARY.md           # This reorganization summary
│   ├── SKELETON_PATTERN.md                 # Skeleton loading patterns
│   └── TAILWIND_MOTION.md                  # Tailwind motion utilities
│
├── public/                                  # 📁 Static assets
├── .github/
│   ├── copilot-instructions.md
│   └── instructions/
│       ├── api.instructions.md
│       └── components.instructions.md
│
├── AGENTS.md                                # 🤖 Agent instructions
├── README.md                                # 📘 Project readme
├── task.md                                  # 📝 Task list
├── package.json                             # 📦 Dependencies
├── tsconfig.json                            # ⚙️ TypeScript config
├── next.config.ts                           # ⚙️ Next.js config
├── tailwind.config.ts                       # ⚙️ Tailwind config
└── biome.json                               # ⚙️ Biome config
```

## Key Changes Summary

### ✅ What Changed

1. **Cards Organized** → Each card in its own folder with its parts
2. **Styles Centralized** → `app/styles/` for all style utilities
3. **Docs Centralized** → All `.md` files in `docs/`
4. **Lib Created** → Framework-agnostic code in `lib/`
5. **Clean Imports** → Barrel exports for easy imports

### 🎯 Import Aliases

```typescript
@component  → app/component
@styles     → app/styles
@hooks      → app/hooks
@util       → app/util
@lib        → lib
@schema     → app/schema
@endpoint   → app/endpoint
@http       → app/http
@server     → app/server
@type       → app/type
```

### 📦 Barrel Exports

```typescript
// Import any card
import { CharacterCardI } from "@component";

// Import styles
import { getStatusColor } from "@styles";

// Import hooks
import { useCardRotation } from "@hooks";

// Import animation config
import { DEFAULT_ANIMATION_TIMINGS } from "@util";
// or
import { DEFAULT_ANIMATION_TIMINGS } from "@lib/animationConfig";
```

### 🗂️ Card Organization

Each card folder contains:

- Main component file
- All parts used exclusively by that card
- Index file for barrel export

**Benefits:**

- ✅ Easy to find related files
- ✅ Clear dependencies
- ✅ Easy to add new cards
- ✅ Parts co-located with usage

### 📚 Documentation

All documentation in `docs/`:

- Animation guides
- Component patterns
- Refactoring notes
- Quick references

**Benefits:**

- ✅ Centralized documentation
- ✅ Easy to find information
- ✅ Clean repository root
- ✅ Better organization
