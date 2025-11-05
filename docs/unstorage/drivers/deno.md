Deno KV
Store data in Deno KV
Learn more about Deno KV.
Usage (Deno)
Driver name: deno-kv

deno-kv driver requires Deno deploy or Deno runtime with --unstable-kv CLI flag. See Node.js section for other runtimes.
The driver automatically maps Unstorage keys to Deno. For example, "test:key" key will be mapped to ["test", "key"] and vice versa.

import { createStorage } from "unstorage";
import denoKVdriver from "unstorage/drivers/deno-kv";

const storage = createStorage({
driver: denoKVdriver({
// path: ":memory:",
// base: "",
// ttl: 60, // in seconds
}),
});
Options:

path: (optional) File system path to where you'd like to store your database, otherwise one will be created for you based on the current working directory of your script by Deno. You can pass :memory: for testing.
base: (optional) Prefix key added to all operations.
openKV: (advanced) Custom method that returns a Deno KV instance.
ttl: (optional) Default TTL for all items in seconds.
Per-call options:

ttl: Add TTL (in seconds) for this setItem call.
Expiration is not strictly enforced by Deno: keys may persist after their expire time. For strict expiry, store the timestamp in your value and check it after retrieval. See Deno KV Key Expiration for more information.
Usage (Node.js)
Driver name: deno-kv-node

Deno provides @deno/kv npm package, A Deno KV client library optimized for Node.js.

Access Deno Deploy remote databases (or any endpoint implementing the open KV Connect protocol) on Node 18+.
Create local KV databases backed by SQLite, using optimized native NAPI packages for Node - compatible with databases created by Deno itself.
Create ephemeral in-memory KV instances backed by SQLite memory files or by a lightweight JS-only implementation for testing.
Install @deno/kv peer dependency:

npm

yarn

pnpm

bun

deno

npm i @deno/kv

import { createStorage } from "unstorage";
import denoKVNodedriver from "unstorage/drivers/deno-kv-node";

const storage = createStorage({
driver: denoKVNodedriver({
// path: ":memory:",
// base: "",
}),
});
Options:

path: (same as deno-kv)
base: (same as deno-kv)
openKvOptions: Check docs for available options.
ttl: (same as deno-kv)
