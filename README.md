# browser-id [![Node](https://github.com/CatChen/browser-id/actions/workflows/node.yml/badge.svg)](https://github.com/CatChen/browser-id/actions/workflows/node.yml) [![Deno](https://github.com/CatChen/browser-id/actions/workflows/deno.yml/badge.svg)](https://github.com/CatChen/browser-id/actions/workflows/deno.yml) [![codecov](https://codecov.io/gh/CatChen/browser-id/branch/main/graph/badge.svg)](https://codecov.io/gh/CatChen/browser-id)

`getBrowserId()` always gives you the same ID for the same browser. You can use it as a key to store user preferences on server side.

```JavaScript
import { getBrowserId } from 'browser-id';

const id = getBrowserId();
```

For backward compatibility, `browserId()` remains available as an alias of `getBrowserId()`.

## Lifecycle controls

The package now provides explicit lifecycle controls for common flows like logout, consent withdrawal, and account switching.

- `getBrowserId(): string` - read the current browser ID or create a new one.
- `hasBrowserId(): boolean` - check whether an ID exists without generating one.
- `deleteBrowserId(): void` - remove any persisted browser ID.
- `rotateBrowserId(): string` - force-generate and persist a new browser ID.

The return value is always a `string` when using TypeScript.

Use package name with scope when used in Deno with JSR.

```TypeScript
import {
  deleteBrowserId,
  getBrowserId,
  hasBrowserId,
  rotateBrowserId,
} from '@catchen/browser-id';
```
