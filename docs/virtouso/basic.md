# Getting Started with React Virtuoso

React Virtuoso is a family of React components that display large data sets using virtualized rendering, automatically handling variable item sizes and changes in items' sizes.

## Component Purpose

| Component       | Use Case                                     |
| --------------- | -------------------------------------------- |
| Virtuoso        | Flat lists                                   |
| GroupedVirtuoso | Groups of items with sticky group headers    |
| VirtuosoGrid    | Same-sized items in a responsive grid layout |
| TableVirtuoso   | Tables with virtualized rows                 |
| MessageList     | Human/AI chat interfaces                     |
| Masonry         | Photos/product listings                      |

> **Info:** The VirtuosoMessageList component is newly released and built specifically for human and AI chatbot conversations. See the [live example](https://virtuoso.dev).

## License

- `react-virtuoso`: MIT license
- `@virtuoso.dev/message-list`: Commercial license ([see pricing](https://virtuoso.dev/pricing))

## Feature Highlights

- **Variable Heights**: Automatically handles items with different heights without hard-coding sizes
- **Responsive**: Observes container and viewport changes, works seamlessly in flexbox layouts
- **Endless Scrolling**: Supports bi-directional scrolling and "load more" patterns with `startReached` and `endReached` callbacks
- **Customizable Markup**: Pass custom components for headers, footers, and scrollers
- **UI Library Integration**: Compatible with shadcn/ui, MUI, Mantine, and drag-and-drop libraries

## Installation

### react-virtuoso

```bash
npm install react-virtuoso
```

### VirtuosoMessageList

```bash
npm install @virtuoso.dev/message-list
```

## Hello World Examples

### Virtuoso

The bare minimum requires:

- Container height (explicit or via flexbox)
- `totalCount` prop
- `itemContent` callback

### VirtuosoMessageList

Follow the [Virtuoso Message List guide](https://virtuoso.dev/message-list) for setup.

### GroupedVirtuoso

Key differences from flat Virtuoso:

- Use `groupedCounts: number[]` instead of `totalCount` (e.g., `[20, 30]` = 2 groups)
- Provide `groupContent` prop for group headers
- `itemContent` receives `groupIndex` as second parameter

### TableVirtuoso

Works like Virtuoso but for HTML tables with support for:

- Window scrolling
- Sticky headers
- Fixed columns

### VirtuosoGrid

Displays same-sized items in multiple columns using CSS properties, supporting media queries and responsive sizing.

### Masonry

Renders varying-height columns for product listings and image galleries.

## Performance Optimization

### Viewport Size

Rendering more items reduces frame rate. Test by reducing component width/height.

### React.memo Pattern

```tsx
const InnerItem = React.memo(({ index }) => {
  React.useEffect(() => {
    console.log("inner mounting", index);
    return () => console.log("inner unmounting", index);
  }, [index]);
  return <div style={{ height: 30 }}>Item {index}</div>;
});

const itemContent = (index) => <InnerItem index={index} />;

const App = () => (
  <Virtuoso
    totalCount={100}
    itemContent={itemContent}
    style={{ height: "100%" }}
  />
);
```

### Viewport Buffer

Use `increaseViewportBy` to pre-render additional content. Example: 100px tall component + `increaseViewportBy={150}` renders 250px total.

### Scroll Handling

Hook into `isScrolling` callback to simplify content during scroll and prevent jank.

## Caveats

⚠️ **CSS Margins**: Don't set margins on content or item elements—they break size measurement and prevent scrolling to the bottom.

✅ **Fix**: Ensure margins don't protrude outside item containers:

```tsx
<Virtuoso
  totalCount={100}
  itemContent={(index) => (
    <div>
      <p style={{ margin: 0 }}>Item {index}</p>
    </div>
  )}
/>
```

See the [troubleshooting section](https://virtuoso.dev/troubleshooting) for more common issues.
