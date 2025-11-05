Browser
Store data in localStorage, sessionStorage or IndexedDB
LocalStorage / SessionStorage
Usage
Driver name: localstorage or sessionstorage

Store data in localStorage or sessionStorage

import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";

const storage = createStorage({
driver: localStorageDriver({ base: "app:" }),
});
Options:

base: Add base to all keys to avoid collision
storage: (optional) provide localStorage or sessionStorage compatible object.
windowKey: (optional) Can be "localStorage" (default) or "sessionStorage"
window: (optional) provide window object
IndexedDB
Store key-value in IndexedDB.

Usage
Driver name: indexeddb

Learn more about IndexedDB.
To use it, you will need to install idb-keyval in your project:

npm

yarn

pnpm

bun

deno

npm i idb-keyval
Usage:

import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";

const storage = createStorage({
driver: indexedDbDriver({ base: "app:" }),
});
By default, unstorage will JSON.stringify the value before passing to IndexedDB. If you want objects to be stored "as-is", you can use storage.setItemRaw.
Options:

base: Add ${base}: to all keys to avoid collision
dbName: Custom name for database. Defaults to keyval-store
storeName: Custom name for store. Defaults to keyval
IndexedDB is a browser database. Avoid using this preset on server environments.
