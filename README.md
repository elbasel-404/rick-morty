# Rick and Morty Characters Browser

A modern, high-performance web application for browsing and exploring characters from the Rick and Morty universe. This project showcases advanced React patterns, server-side rendering, and cutting-edge web technologies to deliver a smooth and responsive user experience.

## Overview

This application fetches character data from the Rick and Morty API and presents it in an engaging, interactive interface. Users can browse through hundreds of characters, search by name, filter by status, and view detailed information about each character. The application features multiple card styles with unique visual effects, infinite scrolling, and auto-refresh capabilities.

## Key Features

### Character Browsing and Discovery

- **Infinite Scroll**: Browse through the entire character database with smooth, virtualized infinite scrolling that maintains performance even with hundreds of items loaded
- **Advanced Search**: Search characters by name with intelligent debounced input (400ms delay) to reduce unnecessary API calls
- **Smart Filtering**: Filter characters by their status (Alive, Dead, Unknown) using an accessible custom dropdown component
- **Flexible Sorting**: Sort characters alphabetically (A to Z or Z to A) or by creation date
- **Multiple Card Styles**: Four distinct card designs to choose from, each with unique visual effects and interactions:
  - Card Style 1: Clean and minimal design
  - Card Style 2: Interactive hover effects
  - Card Style 3: Particle effects and animations
  - Card Style 4: Advanced visual features

### Performance and User Experience

- **Server-Side Rendering**: Initial page load is server-rendered for optimal performance and SEO
- **Virtualized Lists**: Uses React Virtuoso for efficient rendering of large lists, only displaying visible items
- **Lazy Loading Images**: Images are loaded on-demand as they enter the viewport, with skeleton placeholders
- **Debounced Search**: Search input is debounced to prevent excessive API requests while typing
- **Auto-Refresh**: Automatic data refresh every 30 seconds with a countdown timer
- **Pause and Resume**: Control over auto-refresh functionality with manual refresh option
- **Smooth Animations**: Fade-in effects and transitions powered by Tailwind Motion
- **Responsive Design**: Fully responsive layout that works on all device sizes

### Technical Highlights

- **React Compiler**: Leverages the new React Compiler to automatically optimize component re-renders, eliminating the need for manual memoization in most cases
- **Type Safety**: Full TypeScript implementation with Zod schema validation for API responses
- **Server Actions**: Uses Next.js server actions for data fetching with proper error handling
- **Client-Side State**: Efficient state management using React hooks and Jotai for global state
- **Custom Hooks**: Reusable hooks for common patterns like debouncing, image loading, viewport detection, and unmount handling
- **Code Quality**: Configured with Biome for linting and formatting to maintain consistent code style

## Technology Stack

### Frontend Framework

- **Next.js 16.0.1**: Latest version with App Router for file-based routing and server components
- **React 19.2.0**: The newest React version with automatic optimizations from the React Compiler
- **TypeScript 5**: Full type safety across the entire application

### Styling and UI

- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **Tailwind Motion**: Animation utilities for smooth transitions and effects
- **Tailwind Intersect**: Viewport intersection utilities for scroll-based animations
- **Class Variance Authority**: Type-safe variant generation for component styling
- **Lucide React**: Beautiful, customizable icon library

### Data Management

- **Zod 4.1.12**: Runtime type validation and schema parsing for API responses
- **Jotai 2.15.1**: Primitive and flexible state management
- **Unstorage**: Universal storage abstraction layer
- **Server-Only**: Ensures server-side code never leaks to the client

### Performance

- **React Virtuoso 4.14.1**: Virtualized list rendering for handling large datasets
- **React Compiler**: Automatic memoization and optimization at build time
- **Next.js Image Optimization**: Automatic image optimization and lazy loading

### Development Tools

- **Biome 2.2.0**: Fast, modern linter and formatter for JavaScript and TypeScript
- **pnpm 10.20.0**: Efficient package manager with workspace support

## Project Structure

The application follows Next.js App Router conventions with a well-organized structure:

```
app/
├── (pages)/              # Page routes using Next.js route groups
│   └── cards/
│       └── [cardNumber]/ # Dynamic route for different card styles
├── component/            # React components
│   ├── cards/           # Card-specific components
│   ├── effects/         # Animation and effect components
│   ├── CharacterExplorer.tsx
│   ├── InfiniteCharacterGrid.tsx
│   └── JsonViewer.tsx
├── hooks/               # Custom React hooks
│   ├── useDebounceValue.ts
│   ├── useImageLoad.ts
│   ├── useInViewport.ts
│   └── useCardRotation.ts
├── http/                # HTTP client utilities
├── schema/              # Zod schemas for type validation
│   ├── apiResponseSchema.ts
│   └── characterSchema.ts
├── server/              # Server-side code and actions
│   ├── actions/
│   └── getCharactersList.ts
├── util/                # Utility functions
├── type/                # TypeScript type definitions
├── lib/                 # Library configurations
└── styles/              # Global styles and CSS modules
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 10.20.0 or higher (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/elbasel-404/rick-morty.git
cd rick-morty
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

The application will automatically redirect to `/cards/1` to show the first card style.

### Available Scripts

- `pnpm dev` - Start the development server with hot reload
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run Biome linter to check code quality
- `pnpm format` - Format code using Biome

## API Integration

This application uses the [Rick and Morty API](https://rickandmortyapi.com/), a free, open-source REST API that provides comprehensive data about the show. The API requires no authentication and is CORS-friendly.

### Endpoints Used

- `GET /api/character` - Fetch paginated character list with optional filters
  - Query parameters: `page`, `name`, `status`
  - Returns character data with pagination information

### Data Flow

1. Server-side: Initial page load fetches the first page of characters using Next.js server components
2. Client-side: User interactions trigger client-side fetching through server actions
3. Validation: All API responses are validated using Zod schemas before use
4. Error Handling: Graceful error handling with user-friendly messages

## React Compiler Benefits

This project uses the experimental React Compiler (babel-plugin-react-compiler), which provides several benefits:

1. **Automatic Memoization**: The compiler automatically optimizes component re-renders without manual `useMemo`, `useCallback`, or `React.memo`
2. **Improved Performance**: Reduces unnecessary re-renders by analyzing component dependencies
3. **Cleaner Code**: Less boilerplate code for performance optimization
4. **Future-Ready**: Aligned with the future direction of React

While the compiler handles most optimizations, explicit memoization is still used in a few cases where it provides clarity or is required by specific patterns.

## Custom Hooks

The application includes several custom hooks to encapsulate common patterns:

- **useDebounceValue**: Debounces value changes to reduce API calls during search
- **useDebounceCallback**: Debounces callback execution
- **useImageLoad**: Manages image loading states with error handling
- **useInViewport**: Detects when elements enter or exit the viewport
- **useCardRotation**: Handles 3D card rotation effects based on mouse position
- **useParticles**: Creates particle animation effects for visual enhancement
- **useSkeletonFade**: Controls skeleton loader fade animations
- **useUnmount**: Executes cleanup logic on component unmount

## Performance Optimizations

The application implements several performance optimizations:

1. **Virtualization**: Only renders visible items in the character list
2. **Image Lazy Loading**: Images load only when they enter the viewport
3. **Debounced Search**: Reduces API calls during typing
4. **Server-Side Rendering**: Initial page load is optimized with SSR
5. **Static Generation**: Common routes are statically generated at build time
6. **Code Splitting**: Automatic code splitting through Next.js dynamic imports
7. **React Compiler**: Automatic optimization of component re-renders

## Accessibility

The application follows web accessibility best practices:

- Semantic HTML elements for proper document structure
- ARIA attributes for enhanced screen reader support
- Keyboard navigation support for all interactive elements
- Proper labeling for form inputs and controls
- Color contrast ratios meeting WCAG guidelines
- Focus indicators for keyboard navigation

## Browser Support

This application supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: The application uses modern JavaScript features and may not work in older browsers without polyfills.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is open source and available for educational and personal use.

## Acknowledgments

- Character data provided by the [Rick and Morty API](https://rickandmortyapi.com/)
- Built with Next.js, React, and TypeScript
- Styled with Tailwind CSS

## Future Enhancements

Potential features for future development:

- Character detail pages with episode information
- Favorites system with local storage persistence
- Recently viewed characters history
- More advanced filtering options (species, gender, origin)
- Offline support with service workers
- Dark/light theme toggle
- Character comparison feature
- Export functionality for character data
