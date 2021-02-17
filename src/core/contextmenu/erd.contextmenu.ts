import { Menu, MenuOptions } from '@@types/core/contextmenu';
import { ERDEditorContext } from '@@types/core/ERDEditorContext';
import { keymapOptionToString, keymapOptionsToString } from '@/core/keymap';
import { createShowMenus } from './show.contextmenu';
import { createDatabaseMenus } from './database.contextmenu';
import { createDrawRelationshipMenus } from './drawRelationship.contextmenu';
import { createImportMenus } from './import.contextmenu';
import { createExportMenus } from './export.contextmenu';

const defaultOptions: MenuOptions = {
  nameWidth: 75,
  keymapWidth: 45,
};

export function createERDMenus(context: ERDEditorContext): Menu[] {
  const { store, keymap, command } = context;
  return [
    {
      icon: {
        prefix: 'fas',
        name: 'table',
      },
      name: 'New Table',
      keymap: keymapOptionToString(keymap.addTable[0]),
      keymapTooltip: keymapOptionsToString(keymap.addTable),
      execute() {
        store.dispatch(command.table.addTable$(store));
      },
    },
    {
      icon: {
        prefix: 'fas',
        name: 'sticky-note',
      },
      name: 'New Memo',
      keymap: keymapOptionToString(keymap.addMemo[0]),
      keymapTooltip: keymapOptionsToString(keymap.addMemo),
      execute() {
        store.dispatch(command.memo.addMemo$(store));
      },
    },
    {
      name: 'Relationship',
      children: createDrawRelationshipMenus(context),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'eye',
      },
      name: 'View Option',
      children: createShowMenus(context),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'database',
      },
      name: 'Database',
      children: createDatabaseMenus(context),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'file-import',
      },
      name: 'Import',
      children: createImportMenus(context),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'file-export',
      },
      name: 'Export',
      children: createExportMenus(context),
    },
  ].map(menu => ({ ...menu, options: { ...defaultOptions } }));
}