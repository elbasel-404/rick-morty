Vercel
Vercel Runtime Cache
Cache data within Vercel Functions using the Runtime Cache API.

Learn more about Vercel Functions and Runtime Cache.
Usage
Driver name: vercel-runtime-cache

import { createStorage } from "unstorage";
import vercelRuntimeCacheDriver from "unstorage/drivers/vercel-runtime-cache";

const storage = createStorage({
driver: vercelRuntimeCacheDriver({
// base: "app",
// ttl: 60, // seconds
// tags: ["v1"],
}),
});
Optional step: To allow using outside of vercel functions, install @vercel/functions in your project:

npm

yarn

pnpm

bun

deno

npm i @vercel/functions
Options
base: Optional prefix to use for all keys (namespacing).
ttl: Default TTL for all items in seconds.
tags: Default tags to apply to all cache entries (Note: Will be merged with per-call option tags).
Per-call options
ttl: Add TTL (in seconds) for this setItem call.
tags: Apply tags to this setItem call.
Example:

await storage.setItem("user:123", JSON.stringify({ name: "Ana" }), {
ttl: 3600,
tags: ["user:123"],
});
To expire by tags:

await storage.clear("", { tags: ["user:123"] });
Limitations
getKeys: The runtime cache API does not support listing keys; this returns [].
clear: The runtime cache API does not support clearing by base; only tag-based expiration is supported.
Metadata: Runtime cache does not expose metadata; getMeta is not implemented.
Persistence: This is not a persistent store; it’s intended for request-time caching inside Vercel Functions.
The Unstorage driver does not hash keys by default. To replicate the same behavior in @vercel/functions when using getCache, set the keyHashFunction: (key) => key option.
Vercel KV
Store data in a Vercel KV Store.

Learn more about Vercel KV.
Usage
Driver name: vercel-kv

Please check Vercel KV Limits.

import { createStorage } from "unstorage";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

const storage = createStorage({
driver: vercelKVDriver({
// url: "https://<your-project-slug>.kv.vercel-storage.com", // KV_REST_API_URL
// token: "<your secret token>", // KV_REST_API_TOKEN
// base: "test",
// env: "KV",
// ttl: 60, // in seconds
}),
});
To use, you will need to install @vercel/kv dependency in your project:

{
"dependencies": {
"@vercel/kv": "latest"
}
}
Note: For driver options type support, you might need to install @upstash/redis dev dependency as well.

Options:

url: Rest API URL to use for connecting to your Vercel KV store. Default is KV_REST_API_URL.
token: Rest API Token to use for connecting to your Vercel KV store. Default is KV_REST_API_TOKEN.
base: optional Prefix to use for all keys. Can be used for namespacing.
env: optional Flag to customize environment variable prefix (Default is KV). Set to false to disable env inference for url and token options.
scanCount: How many keys to scan at once.
See @upstash/redis for all available options.

Vercel Blob
Store data in a Vercel Blob Store.

Learn more about Vercel Blob.
Currently Vercel Blob stores all data with public access.
Usage
Driver name: vercel-blob

To use, you will need to install @vercel/blob dependency in your project:

npm

yarn

pnpm

bun

deno

npm i @vercel/blob

import { createStorage } from "unstorage";
import vercelBlobDriver from "unstorage/drivers/vercel-blob";

const storage = createStorage({
driver: vercelBlobDriver({
access: "public", // Required! Beware that stored data is publicly accessible.
// token: "<your secret token>", // or set BLOB_READ_WRITE_TOKEN
// base: "unstorage",
// envPrefix: "BLOB",
}),
});
Options:

access: Whether the blob should be publicly accessible. (required, must be public)
base: Prefix to prepend to all keys. Can be used for namespacing.
token: Rest API token to use for connecting to your Vercel Blob store. If not provided, it will be read from the environment variable BLOB_READ_WRITE_TOKEN.
envPrefix: Prefix to use for token environment variable name. Default is BLOB (env name = BLOB_READ_WRITE_TOKEN).
