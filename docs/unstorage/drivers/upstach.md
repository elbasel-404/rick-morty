Upstash
Store data in an Upstash Redis database.
Usage
Driver name: upstash

Learn more about Upstash.
Unstorage uses @upstash/redis internally to connect to Upstash Redis.
To use it, you will need to install @upstash/redis in your project:

npm

yarn

pnpm

bun

deno

npm i @upstash/redis
Usage with Upstash Redis:

import { createStorage } from "unstorage";
import upstashDriver from "unstorage/drivers/upstash";

const storage = createStorage({
driver: upstashDriver({
base: "unstorage",
// url: "", // or set UPSTASH_REDIS_REST_URL env
// token: "", // or set UPSTASH_REDIS_REST_TOKEN env
}),
});
Options:

base: Optional prefix to use for all keys. Can be used for namespacing.
url: The REST URL for your Upstash Redis database. Find it in the Upstash Redis console. Driver uses UPSTASH_REDIS_REST_URL environment by default.
token: The REST token for authentication with your Upstash Redis database. Find it in the Upstash Redis console. Driver uses UPSTASH_REDIS_REST_TOKEN environment by default.
ttl: Default TTL for all items in seconds.
scanCount: How many keys to scan at once.
See @upstash/redis documentation for all available options.

Transaction options:

ttl: Supported for setItem(key, value, { ttl: number /_ seconds _/ })
