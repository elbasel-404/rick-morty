# Unstorage - Universal Storage Layer

[🏠 Home](../index.md) | [📚 Docs Hub](../README.md)

Universal storage layer with multiple driver support for Node.js, browsers, and edge runtimes.

## Table of Contents

### Getting Started

- **[Basic Usage](./basic.md)** - Installation, setup, and basic operations
- **[Server Usage](./server.md)** - Using unstorage in server environments
- **[Utilities](./util.md)** - Helper functions and utilities

### Advanced

- **[Custom Drivers](./custom-driver.md)** - Creating custom storage drivers
- **[Drivers](./drivers/index.md)** - Built-in storage drivers reference

## Available Drivers

Unstorage supports multiple storage backends:

### Browser

- [Browser Storage](./drivers/browser.md) - localStorage and sessionStorage

### File System

- [File System](./drivers/file-system.md) - Node.js file system driver

### Memory & Cache

- [Memory](./drivers/memory.md) - In-memory storage
- [LRU Cache](./drivers/lru-cache.md) - Least Recently Used cache

### Database

- [MongoDB](./drivers/mongo.md) - MongoDB driver
- [Redis](./drivers/redis.md) - Redis driver
- [SQL](./drivers/sql.md) - SQL database driver

### Cloud Storage

- [AWS S3](./drivers/s3.md) - Amazon S3 compatible storage
- [Vercel KV](./drivers/vercel.md) - Vercel KV storage
- [Upstash](./drivers/upstach.md) - Upstash Redis

### HTTP & Remote

- [HTTP](./drivers/http.md) - HTTP-based storage
- [GitHub](./drivers/github.md) - GitHub repository storage

### Edge & Serverless

- [Deno KV](./drivers/deno.md) - Deno KV storage

### Special Purpose

- [Overlay](./drivers/overlay.md) - Layered storage
- [Null Driver](./drivers/null.md) - No-op driver for testing
- [UploadThing](./drivers/upload-thing.md) - UploadThing integration

## Quick Reference

### Core Operations

```javascript
// Get item
await storage.getItem("key");

// Set item
await storage.setItem("key", "value");

// Remove item
await storage.removeItem("key");

// Get keys
await storage.getKeys();

// Clear all
await storage.clear();
```

### Key Features

- 🔄 Universal API across all platforms
- 🔌 Multiple storage backends (drivers)
- 🎯 Namespace support with prefixes
- 📦 Automatic serialization/deserialization
- 🔒 Type-safe with TypeScript
- ⚡ Async/Promise-based API

---

[🏠 Home](../index.md) | [📚 Docs Hub](../README.md)
