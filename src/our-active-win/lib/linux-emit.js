'use strict';
import {join} from 'path';
import {spawn} from 'child_process';

const bin = join(__dirname, '../getFrontWindow.sh');

export function launch() {
  const positionDataReader = spawn(bin);
  return positionDataReader;
}
