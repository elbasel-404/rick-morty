# Unstorage Drivers

[🏠 Home](../../index.md) | [Unstorage](../index.md)

Built-in storage drivers for various platforms and backends.

## Browser Drivers

- **[Browser Storage](./browser.md)** - localStorage, sessionStorage, and indexedDB

## File System Drivers

- **[File System](./file-system.md)** - Node.js file system driver

## Memory & Cache Drivers

- **[Memory](./memory.md)** - In-memory storage
- **[LRU Cache](./lru-cache.md)** - Least Recently Used cache

## Database Drivers

- **[MongoDB](./mongo.md)** - MongoDB driver
- **[Redis](./redis.md)** - Redis driver
- **[SQL](./sql.md)** - SQL database driver

## Cloud Storage Drivers

- **[AWS S3](./s3.md)** - Amazon S3 compatible storage
- **[Vercel KV](./vercel.md)** - Vercel KV storage
- **[Upstash](./upstach.md)** - Upstash Redis

## HTTP & Remote Drivers

- **[HTTP](./http.md)** - HTTP-based storage
- **[GitHub](./github.md)** - GitHub repository storage (readonly)

## Edge & Serverless Drivers

- **[Deno KV](./deno.md)** - Deno KV storage

## Special Purpose Drivers

- **[Overlay](./overlay.md)** - Multi-layer overlay driver for combining storage backends
- **[Null Driver](./null.md)** - No-op driver for testing
- **[UploadThing](./upload-thing.md)** - UploadThing integration

## Driver Selection Guide

### For Development

- **Memory** - Fast, temporary storage
- **File System** - Persistent local storage

### For Production Web Apps

- **Redis** - High-performance caching
- **MongoDB** - Document storage
- **S3** - Large file storage

### For Edge/Serverless

- **Vercel KV** - Edge-optimized storage
- **Upstash** - Serverless Redis
- **Deno KV** - Deno Deploy storage

### For Browser Apps

- **Browser Storage** - localStorage/sessionStorage/indexedDB

### For Testing

- **Null Driver** - Mock storage without side effects
- **Memory** - Isolated test storage

---

[🏠 Home](../../index.md) | [Unstorage](../index.md)
