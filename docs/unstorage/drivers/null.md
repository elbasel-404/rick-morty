Null
Discards all data.
This driver does NOT store any data. It will discard any data written to it and will always return null similar to /dev/null
Usage
Driver name: null

import { createStorage } from "unstorage";
import nullDriver from "unstorage/drivers/null";

const storage = createStorage({
driver: nullDriver(),
});
