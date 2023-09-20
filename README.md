# Tar Extract

`tar-extract` is a Node.js package for extracting `.tar` and `.tar.gz` files.
It provides a simple and easy-to-use API for decompressing these common archive file formats.

## Installation

```shell
npm install tar-extract
```

Or use pnpm:

```shell
pnpm add tar-extract
```

## Usage Example

```ts
import { extract } from "tar-extract";

extract("./00.tar.gz", "./").catch((err) =>
  console.error("extract failed: ", err)
);
```

## API Documentation

### `extract(path: string, dest: string)`

Extracts a `.tar` or `.tar.gz` file to the specified directory.

- `path` path of the archive file
- `dest` path to extract to
