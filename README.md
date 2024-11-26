# browser-id [![Node.js CI](https://github.com/CatChen/browser-id/workflows/Node.js%20CI/badge.svg)](https://github.com/CatChen/browser-id/actions) [![codecov](https://codecov.io/gh/CatChen/browser-id/branch/main/graph/badge.svg)](https://codecov.io/gh/CatChen/browser-id)

`browserID()` function always gives you the same ID for the same browser. You can use it as a key to store user preferences on server side.

```JavaScript
import { browserID } from 'browser-id';
const id = browserID();
```

The return value is always a `string` when using TypeScript.

Use package name with scope when used in Deno with JSR.

```TypeScript
import { browserID } from '@catchen/browser-id';
```
