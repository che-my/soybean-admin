import type { KeyHandler } from 'hotkeys-js';
import hotkeys from 'hotkeys-js';

export function f5Listen(callback: KeyHandler) {
  hotkeys('f5', callback);
}

export function escListen(callback: KeyHandler) {
  hotkeys('esc', callback);
}

export function enterListen(callback: KeyHandler) {
  hotkeys('enter', callback);
}
