# Grid with Responsive Columns

The `VirtuosoGrid` component displays equally-sized items while supporting multiple items per row.

## Styling

The component provides no styling out of the box. Specify styling and layout by passing:

- `itemClassName` and `listClassName` properties, or
- Styled components as `components.Item` and `components.List`

Implement the layout using flexbox or CSS Grid with plain CSS or CSS-in-JS.

## Responsive Layout

Use media queries, `min-width`, percentages, and other responsive techniques in item layout definitions. The grid observes container/item dimensions and recalculates scroll size accordingly.

**Note:** Define component objects outside the component to prevent remounting on each render.

### Example

```tsx
import { VirtuosoGrid } from "react-virtuoso";
import { forwardRef } from "react";

const gridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        padding: "0.5rem",
        width: "33%",
        display: "flex",
        flex: "none",
        alignContent: "stretch",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  ),
};

const ItemWrapper = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      display: "flex",
      flex: 1,
      textAlign: "center",
      padding: "1rem",
      border: "1px solid gray",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

export default function App() {
  return (
    <>
      <VirtuosoGrid
        style={{ height: 500 }}
        totalCount={1000}
        components={gridComponents}
        itemContent={(index) => <ItemWrapper>Item {index}</ItemWrapper>}
      />
      <style>{`html, body, #root { margin: 0; padding: 0 }`}</style>
    </>
  );
}
```
