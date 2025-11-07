# initialTopMostItemIndex

The `initialTopMostItemIndex` property sets the initial scroll position of the list to display the item at the specified index. You can pass an object to achieve additional effects similar to `scrollToIndex`.

**Note:** This property only applies when the component mounts. To change the list position after mounting, use the `scrollToIndex` method instead.

## Example

```tsx
import { Virtuoso } from "react-virtuoso";

export default function App() {
  return (
    <Virtuoso
      style={{ height: "100%" }}
      totalCount={1000}
      initialTopMostItemIndex={800}
      itemContent={(index) => <div style={{ height: 30 }}>Item {index}</div>}
    />
  );
}
```
