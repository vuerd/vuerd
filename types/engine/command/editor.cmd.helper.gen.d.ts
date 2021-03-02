import { CommandType } from './index';
import { Store } from '../store';
import { MoveKey } from '../store/editor.state';
import { addColumn$ } from './column.cmd.helper';

export declare function focusMoveTable$(
  store: Store,
  moveKey: MoveKey,
  shiftKey: boolean
): Generator<
  | CommandType<'editor.focusMoveTable'>
  | CommandType<'editor.focusColumn'>
  | CommandType<'column.add'>
  | ReturnType<typeof addColumn$>
>;