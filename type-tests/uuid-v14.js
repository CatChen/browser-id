// @flow

import { v4 } from 'uuid';

const uuid: string = v4();
const bytes: Uint8Array = v4(undefined, new Uint8Array(16));

void uuid;
void bytes;
