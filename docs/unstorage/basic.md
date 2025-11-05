Getting Started
Learn how to setup and use unstorage in your project.
Introduction
We usually choose one or more storage backends based on our use cases, such as the filesystem, a database, or LocalStorage for browsers. It soon starts to create troubles when supporting and combining multiple options or switching between them. For JavaScript library authors, this usually means that they have to decide how many platforms they are going to support and implement storage for each of them.

Installation
Install unstorage npm package:

npm

yarn

pnpm

bun

deno

npm i unstorage
Usage
my-storage.js

import { createStorage } from "unstorage";

const storage = createStorage(/_ opts _/);

await storage.getItem("foo:bar"); // or storage.getItem('/foo/bar')
Options:

driver: Default driver, using memory if not provided
Interface
hasItem(key, opts?)
Checks if storage contains a key. Resolves to either true or false.

await storage.hasItem("foo:bar");
You can also use the has alias:

await storage.has("foo:bar");
getItem(key, opts?)
Gets the value of a key in storage. Resolves to either a JavaScript primitive value or null.

await storage.getItem("foo:bar");
You can also use the get alias:

await storage.get("foo:bar");
getItems(items, opts)
(Experimental) Gets the value of multiple keys in storage in parallel.

Each item in the array can either be a string or an object with { key, options? } format.

Returned value is a Promise resolving to an array of objects with { key, value } format.

getItemRaw(key, opts?)
Note: This is an experimental feature. Please check unjs/unstorage#142 for more information.

Gets the value of a key in storage in raw format.

// Value can be a Buffer, Array or Driver's raw format
const value = await storage.getItemRaw("foo:bar.bin");
setItem(key, value, opts?)
Add/Update a value to the storage.

If the value is not a string, it will be stringified.

If the value is undefined, it is same as calling removeItem(key).

await storage.setItem("foo:bar", "baz");
You can also use the set alias:

await storage.set("foo:bar", "baz");
setItems(items, opts)
(Experimental) Add/Update items in parallel to the storage.

Each item in items array should be in { key, value, options? } format.

Returned value is a Promise resolving to an array of objects with { key, value } format.

setItemRaw(key, value, opts?)
Note: This is an experimental feature. Please check unjs/unstorage#142 for more information.

Add/Update a value to the storage in raw format.

If value is undefined, it is the same as calling removeItem(key).

await storage.setItemRaw("data/test.bin", new Uint8Array([1, 2, 3]));
removeItem(key, opts = { removeMeta = false })
Remove a value (and it's meta) from storage.

await storage.removeItem("foo:bar", { removeMeta: true });
// same as await storage.removeItem("foo:bar", true);
You can also use the del or remove aliases:

await storage.remove("foo:bar");
await storage.del("foo:bar");
getMeta(key, opts = { nativeOnly? })
Get metadata object for a specific key.

This data is fetched from two sources:

Driver native meta (like file creation time)
Custom meta set by storage.setMeta (overrides driver native meta)

await storage.getMeta("foo:bar"); // For fs driver returns an object like { mtime, atime, size }
setMeta(key, opts?)
Set custom meta for a specific key by adding a $ suffix.

await storage.setMeta("foo:bar", { flag: 1 });
// Same as storage.setItem('foo:bar$', { flag: 1 })
removeMeta(key, opts?)
Remove meta for a specific key by adding a $ suffix.

await storage.removeMeta("foo:bar");
// Same as storage.removeItem('foo:bar$')
getKeys(base?, opts?)
Get all keys. Returns an array of strings.

Meta keys (ending with $) will be filtered.

If a base is provided, only keys starting with the base will be returned and only mounts starting with base will be queried. Keys still have a full path.

await storage.getKeys();
You can also use the keys alias:

await storage.keys();
clear(base?, opts?)
Removes all stored key/values. If a base is provided, only mounts matching base will be cleared.

await storage.clear();
dispose()
Disposes all mounted storages to ensure there are no open-handles left. Call it before exiting process.

Note: Dispose also clears in-memory data.

await storage.dispose();
mount(mountpoint, driver)
By default, everything is stored in memory. We can mount additional storage space in a Unix-like fashion.

When operating with a key that starts with mountpoint, instead of default storage, mounted driver will be called.

In addition to base, you can set readOnly and noClear to disable write and clear operations.

import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

// Create a storage container with default memory storage
const storage = createStorage({});

storage.mount("/output", fsDriver({ base: "./output" }));

// Writes to ./output/test file
await storage.setItem("/output/test", "works");

// Adds value to in-memory storage
await storage.setItem("/foo", "bar");
unmount(mountpoint, dispose = true)
Unregisters a mountpoint. Has no effect if mountpoint is not found or is root.

await storage.unmount("/output");
watch(callback)
Starts watching on all mountpoints. If driver does not support watching, only emits even when storage.\* methods are called.

const unwatch = await storage.watch((event, key) => {});
// to stop this watcher
await unwatch();
unwatch()
Stop all watchers on all mountpoints.

await storage.unwatch();
getMount(key)
Gets the mount point (driver and base) for a specific key in storage.

storage.mount("cache" /_ ... _/);
storage.mount("cache:routes" /_ ... _/);

storage.getMount("cache:routes:foo:bar");
// => { base: "cache:routes:", driver: "..." }
getMounts(base?, { parents: boolean }?)
Gets the mount points on a specific base.

storage.mount("cache" /_ ... _/);
storage.mount("cache:sub" /_ ... _/);

storage.getMounts("cache:sub");
// => [{ base: "cache:sub", driver }]

storage.getMounts("cache:");
// => [{ base: "cache:sub", driver }, { base: "cache:", driver }]

storage.getMounts("");
storage.getMounts("cache:sub", { parents: true });
// => [{ base: "cache:sub", driver }, { base: "cache:", driver }, { base: "", driver }]
Generic types
Type getItem return value:

await storage.getItem<string>("k"); // => <string>

await storage.getItemRaw<Buffer>("k"); // => <Buffer>
Type check setItem parameters:

storage.setItem<string>("k", "val"); // check ok
storage.setItemRaw<string>("k", "val"); // check ok

storage.setItem<string>("k", 123); // ts error
storage.setItemRaw<string>("k", 123); // ts error
Typed storage instance:

const storage = createStorage<string>();

await storage.getItem("k"); // => <string>

storage.setItem("k", "val"); // Check ok
storage.setItem("k", 123); // TS error
Forward references use inheritance instead of overriding types.

const storage = createStorage<string>();

storage.setItem<number>("k", 123); // TS error: <number> is not compatible with <string>
Typing a sub set using prefixStorage:

const storage = createStorage();

const htmlStorage = prefixStorage<string>(storage, "assets:html");

await htmlStorage.getItem("foo.html"); // => <string>

type Post = {
title: string;
content: string;
};

const postStorage = prefixStorage<Post>(storage, "assets:posts");

await postStorage.getItem("foo.json"); // => <Post>
In strict mode, it will also return the null type to help you handle the case when getItem is missing.

"use strict";

await storage.getItem<string>("k"); // => <string | null>
Specifying namespace:

type StorageDefinition = {
items: {
foo: string;
baz: number;
};
};

const storage = createStorage<StorageDefinition>();
await storage.has("foo"); // Ts will prompt you that there are two optional keys: "foo" or "baz"
await storage.getItem("baz"); // => string
await storage.setItem("foo", 12); // TS error: <number> is not compatible with <string>
await storage.setItem("foo", "val"); // Check ok
await storage.remove("foo");
