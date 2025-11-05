Memory
Keep data in memory.
Keeps data in memory using Map. (default storage)

Usage
Driver name: memory

By default, it is mounted at the top level, so it's unlikely that you will need to mount it again.

import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";

const storage = createStorage({
driver: memoryDriver(),
});
