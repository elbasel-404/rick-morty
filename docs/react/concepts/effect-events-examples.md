# Effect Events - Usage Examples

Practical examples demonstrating how to use `useEffectEvent` in real-world scenarios.

## Example 1: Reading Latest Props Without Re-running

### The Problem

You want to log page visits with the current number of shopping cart items, but you don't want to create a new log entry every time the cart changes.

### Solution

```javascript
import { useEffect, useContext, useEffectEvent } from "react";

function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onNavigate = useEffectEvent((visitedUrl) => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onNavigate(url);
  }, [url]); // Only re-runs when URL changes

  return <PageContent />;
}
```

### How It Works

- The Effect re-runs only when `url` changes (new page navigation)
- `numberOfItems` is read fresh each time `onNavigate` is called
- No extra log entries when cart items change
- Each log entry still has the accurate current cart count

## Example 2: Analytics with Latest User Data

### Scenario

Track user interactions with the most recent user profile data without re-initializing tracking on every profile update.

### Implementation

```javascript
function AnalyticsTracker({ eventName, eventData, userProfile }) {
  const trackWithUserContext = useEffectEvent((name, data) => {
    analytics.track(name, {
      ...data,
      userId: userProfile.id,
      userName: userProfile.name,
      userTier: userProfile.tier,
      timestamp: Date.now(),
    });
  });

  useEffect(() => {
    trackWithUserContext(eventName, eventData);
  }, [eventName, eventData]); // Re-track only when event changes

  return null;
}
```

### Benefits

- User profile updates don't retrigger tracking
- Events always include latest user information
- Avoids duplicate analytics events
- Cleaner dependency management

## Example 3: Chat Room with Theme

### Complete Example

```javascript
import { useState, useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, theme }) {
  const [isConnected, setIsConnected] = useState(false);

  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme);
    setIsConnected(true);
  });

  const onDisconnected = useEffectEvent(() => {
    showNotification("Disconnected", theme);
    setIsConnected(false);
  });

  const onMessage = useEffectEvent((message) => {
    showNotification(`New message: ${message}`, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);

    connection.on("connected", onConnected);
    connection.on("disconnected", onDisconnected);
    connection.on("message", onMessage);

    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId]); // Only reconnect when room changes

  return (
    <div>
      <h1>Welcome to {roomId}</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
    </div>
  );
}
```

### Why This Works

- Changing `theme` doesn't disconnect and reconnect the chat
- All notifications use the current theme color
- Only `roomId` changes trigger actual reconnection
- Clean separation of reactive (connection) and non-reactive (notifications) logic

## Example 4: Debounced Search with Current Filters

### Scenario

Search as user types, but include current filter values without resetting the debounce on filter changes.

### Implementation

```javascript
function SearchWithFilters({ query, filters }) {
  const [results, setResults] = useState([]);

  const performSearch = useEffectEvent(async (searchQuery) => {
    const data = await searchAPI({
      query: searchQuery,
      filters: filters, // Always uses latest filters
    });
    setResults(data);
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]); // Only debounce resets on query change

  return <SearchResults results={results} />;
}
```

### Benefits

- Typing doesn't reset when filters change
- Search always includes current filter state
- Single debounce timer for better UX
- Filters update instantly in results

## Example 5: Form Auto-Save with Latest Values

### Use Case

Auto-save a form periodically, but don't restart the timer when form values change.

### Code

```javascript
function AutoSaveForm({ formId }) {
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const saveForm = useEffectEvent(async () => {
    setIsSaving(true);
    try {
      await saveToServer(formId, formData); // Latest formData
      console.log("Saved:", formData);
    } finally {
      setIsSaving(false);
    }
  });

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveForm();
    }, 30000);

    return () => clearInterval(interval);
  }, [formId]); // Only restart interval if formId changes

  return (
    <div>
      <input
        value={formData.title || ""}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      {isSaving && <span>Saving...</span>}
    </div>
  );
}
```

### Advantages

- Interval doesn't reset on every keystroke
- Always saves the most recent form data
- Predictable save timing for users
- No performance issues with frequent updates

## Example 6: WebSocket with Dynamic Handler

### Problem

WebSocket connection with message handler that needs current app state.

### Solution

```javascript
function LiveDataFeed({ feedId, currentUser, preferences }) {
  const [messages, setMessages] = useState([]);

  const handleMessage = useEffectEvent((message) => {
    // Process message with current user preferences
    const processed = processMessage(message, {
      userId: currentUser.id,
      language: preferences.language,
      timezone: preferences.timezone,
    });

    setMessages((prev) => [...prev, processed]);
  });

  useEffect(() => {
    const ws = new WebSocket(`wss://api.example.com/feed/${feedId}`);

    ws.onmessage = (event) => {
      handleMessage(JSON.parse(event.data));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [feedId]); // Only reconnect when feed changes

  return <MessageList messages={messages} />;
}
```

### Key Points

- WebSocket doesn't reconnect when preferences change
- Messages always processed with current preferences
- Efficient connection management
- Latest user context in every message

## Example 7: Combining Multiple Effect Events

### Complex Scenario

Manage multiple event types with different reactivity requirements.

### Full Implementation

```javascript
function DataDashboard({ dashboardId, userId, theme, locale }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const logError = useEffectEvent((errorMsg) => {
    logger.error({
      dashboard: dashboardId,
      user: userId,
      error: errorMsg,
      timestamp: Date.now(),
    });
  });

  const showNotification = useEffectEvent((message, type) => {
    notify(message, {
      type,
      theme,
      locale,
    });
  });

  const trackLoad = useEffectEvent((success) => {
    analytics.track("dashboard_load", {
      dashboardId,
      userId,
      success,
      theme,
    });
  });

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        showNotification("Loading...", "info");
        const result = await fetchDashboard(dashboardId);

        if (!cancelled) {
          setData(result);
          showNotification("Loaded successfully!", "success");
          trackLoad(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          logError(err.message);
          showNotification("Failed to load", "error");
          trackLoad(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [dashboardId]); // Only reload when dashboard changes

  if (error) return <ErrorDisplay error={error} />;
  if (!data) return <LoadingSpinner />;
  return <Dashboard data={data} />;
}
```

### Why This Pattern Works

- Single Effect manages data loading
- Multiple Effect Events for different concerns
- Theme/locale changes don't reload data
- All events use current context values
- Clean separation of concerns

## Common Mistakes to Avoid

### ❌ Mistake 1: Passing Effect Events as Props

```javascript
// DON'T DO THIS
function Parent() {
  const handleClick = useEffectEvent(() => {
    console.log("clicked");
  });

  return <Child onClick={handleClick} />; // ❌ Wrong!
}
```

**Fix**: Use regular `useCallback` for props:

```javascript
// ✅ Correct
function Parent() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <Child onClick={handleClick} />;
}
```

### ❌ Mistake 2: Using Outside Effects

```javascript
// DON'T DO THIS
function Component() {
  const doSomething = useEffectEvent(() => {
    // ...
  });

  function handleClick() {
    doSomething(); // ❌ Wrong! Outside Effect
  }

  return <button onClick={handleClick}>Click</button>;
}
```

**Fix**: Use Effect Events only inside Effects:

```javascript
// ✅ Correct
function Component() {
  const doSomething = useEffectEvent(() => {
    // ...
  });

  useEffect(() => {
    doSomething(); // ✅ Inside Effect
  }, []);
}
```

### ❌ Mistake 3: Hiding Legitimate Dependencies

```javascript
// DON'T DO THIS - Bad intent
function Component({ apiUrl }) {
  const fetchData = useEffectEvent(() => {
    fetch(apiUrl); // ❌ apiUrl should be reactive!
  });

  useEffect(() => {
    fetchData();
  }, []); // ❌ Should re-fetch when apiUrl changes
}
```

**Fix**: Keep reactive values in dependencies:

```javascript
// ✅ Correct
function Component({ apiUrl }) {
  useEffect(() => {
    fetch(apiUrl);
  }, [apiUrl]); // ✅ Re-fetch on URL change
}
```

## Testing Effect Events

### Test Example

```javascript
import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";

test("uses latest theme in notifications", async () => {
  const notify = vi.fn();

  const { rerender } = render(
    <ChatRoom roomId="general" theme="dark" notify={notify} />
  );

  // Wait for connection
  await waitFor(() => {
    expect(notify).toHaveBeenCalledWith("Connected!", "dark");
  });

  // Change theme
  rerender(<ChatRoom roomId="general" theme="light" notify={notify} />);

  // Should not reconnect (no new notification)
  expect(notify).toHaveBeenCalledTimes(1);
});
```

## Performance Considerations

Effect Events help performance by:

1. **Reducing Effect re-runs** - Fewer dependency changes
2. **Avoiding reconnections** - WebSocket/subscriptions stay alive
3. **Preventing unnecessary renders** - Stable Effect boundaries
4. **Cleaner cleanup** - Fewer cleanup/setup cycles

---

**Related**: [Effect Events Overview](./effect-events.md) | [useEffectEvent API](./useEffectEvent.md)
