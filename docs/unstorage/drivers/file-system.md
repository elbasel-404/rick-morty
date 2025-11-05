Filesystem (Node.js)
Store data in the filesystem using Node.js API.
Usage
Driver name: fs or fs-lite

Maps data to the real filesystem using directory structure for nested keys. Supports watching using chokidar.

This driver implements meta for each key including mtime (last modified time), atime (last access time), and size (file size) using fs.stat.

import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

const storage = createStorage({
driver: fsDriver({ base: "./tmp" }),
});
Options:

base: Base directory to isolate operations on this directory
ignore: Ignore patterns for watch
watchOptions: Additional chokidar options.
Node.js Filesystem (Lite)
This driver uses pure Node.js API without extra dependencies.

import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

const storage = createStorage({
driver: fsLiteDriver({ base: "./tmp" }),
});
Options:

base: Base directory to isolate operations on this directory
ignore: Optional callback function (path: string) => boolean
