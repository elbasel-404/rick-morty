LRU Cache
Keeps cached data in memory using LRU Cache.
Usage
Driver name: lru-cache

Keeps cached data in memory using LRU Cache.

See lru-cache for supported options.

By default, max setting is set to 1000 items.

A default behavior for sizeCalculation option is implemented based on buffer size of both key and value.

import { createStorage } from "unstorage";
import lruCacheDriver from "unstorage/drivers/lru-cache";

const storage = createStorage({
driver: lruCacheDriver(),
});
