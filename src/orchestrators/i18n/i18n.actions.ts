import {
  Dispatch
} from 'redux';

import {
  LocalesMap
} from '../../locales/locales.interface';
import {
  ReduxAction
} from '../../redux/actions';
import {
  GlobalStoreState
} from '../../redux/store';

export enum I18nActions {
  UPDATE_ENTRIES = 'UPDATE_ENTRIES'
}

export interface UpdateEntriesAction {
  type: I18nActions.UPDATE_ENTRIES;
  payload: LocalesMap;
}

export function updateEntries(entries: LocalesMap): ReduxAction<UpdateEntriesAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<UpdateEntriesAction> => {
    return dispatch({
      type: I18nActions.UPDATE_ENTRIES as I18nActions.UPDATE_ENTRIES,
      payload: entries
    });
  };
}

export type I18nActionTypes = UpdateEntriesAction;
