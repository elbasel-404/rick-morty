### Public API

No auth required; CORS-friendly

- **Base:** https://rickandmortyapi.com/api
- **Characters:** `GET /character?page=1&name=rick&status=alive` (supports pagination, filtering, images)
- **Episodes:** `GET /episode/:id`
- **Locations:** `GET /location/:id`

## Core User Stories (must-have)

### 1. Browse & Search Characters

- Paginated list of characters (image, name, status, species, origin)
  - It's an accumulated list. Ex: firstly show 20 items of characters then next will show 40 items (old 20 and the new 20) and so on (20, 40, 60…)
  - The list should remain smooth with 500+ items
- Search by name with debounced input (300–500ms) (no external debounce libs)
- Filter by status (Alive/Dead/Unknown) and species via a small form (controlled components)
- Sort results (A→Z / Z→A) using array manipulation (map/filter/sort)

### 2. Character Details (Route)

- Clicking an item opens a detailed view (name, image, status, species, gender, origin, last known location)
- Show first 5 episode names (fetch episode IDs from the character, then fetch details)

### 3. Fetching & Data Layer

- Use Axios for network requests to the API

### 4. Timer / Auto-Refresh

- Add a timer that shows a countdown (e.g., 30s) to the next auto-refresh of the current result set
- Provide Pause/Resume and manual Refresh

### 5. Performance and Accessibility

- Use memoization (React.memo, useMemo, useCallback)
- Proper labels for inputs, semantic HTML, and ARIA attributes

## Nice-to-haves (stretch, if time allows)

- **Create a custom hook** (e.g., `useAxios` or `useCharacters`) that:
  - Accepts query params (page, name, status, species)
  - Returns `{ data, isLoading, error, refetch }`
- **Recently Viewed:** Keep a "recently viewed characters" section (store last 5 in localStorage)
- **Error Boundary:** Add a simple error boundary around lazily-loaded routes
- **Skeletons:** Suspense fallback + lightweight skeleton UIs
- **Offline Hint:** If fetch fails, show a retry with exponential backoff (in the custom hook)
  >

## Technical Requirements & Constraints

- React 18+, TypeScript preferred (JS is fine if you'd rather)
- Router, lazy-load the route component
- **Allowed libs:** axios, a virtualization library
- Do not use a UI kit; basic CSS or CSS-in-JS is fine
- No global state library required; local state + hooks only
- Keep bundle size & rerenders in mind; show that memoization is intentional
