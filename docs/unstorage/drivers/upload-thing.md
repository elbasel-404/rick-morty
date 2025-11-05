UploadThing
Store data using UploadThing.
Learn more about UploadThing.
UploadThing support is currently experimental!
There is a known issue that same key, if deleted cannot be used again tracker issue.
Usage
Driver name: uploadthing

To use, you will need to install uploadthing dependency in your project:

npm

yarn

pnpm

bun

deno

npm i uploadthing

import { createStorage } from "unstorage";
import uploadthingDriver from "unstorage/drivers/uploadthing";

const storage = createStorage({
driver: uploadthingDriver({
// token: "<your token>", // UPLOADTHING_SECRET environment variable will be used if not provided.
}),
});
Options:

token: Your UploadThing API key. Will be automatically inferred from the UPLOADTHING_SECRET environment variable if not provided.
