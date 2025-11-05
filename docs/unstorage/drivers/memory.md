# Memory Driver

[🏠 Home](../../index.md) | [Unstorage](../index.md) | [Drivers](./index.md)

Keep data in memory using Map. (default storage)

## Overview

Keeps data in memory using JavaScript's `Map` data structure. This is the default storage driver used when no other driver is specified.

## Usage

**Driver name**: `memory`

By default, it is mounted at the top level, so it's unlikely that you will need to mount it again.

```javascript
import { createStorage } from "unstorage";
```

## Use Cases

- Development and testing
- Temporary caching
- Default fallback storage
- Fast, ephemeral data storage

## Characteristics

- ⚡ Very fast (in-memory)
- 🔄 Data is lost on process restart
- 📦 No external dependencies
- 🎯 Synchronous operations internally

---

[🏠 Home](../../index.md) | [Unstorage](../index.md) | [Drivers](./index.md)
import memoryDriver from "unstorage/drivers/memory";

const storage = createStorage({
driver: memoryDriver(),
});
