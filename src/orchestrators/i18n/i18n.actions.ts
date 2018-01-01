import {
  Dispatch
} from 'redux';

import {
  GlobalStoreState
} from '../../redux/store';

import {
  I18nObject
} from './i18n.interface';

export enum I18nActions {
  UPDATE_ENTRIES = 'UPDATE_ENTRIES'
}

export interface UpdateEntriesAction {
  type: I18nActions.UPDATE_ENTRIES;
  payload: I18nObject;
}

export function updateEntries(entries: I18nObject): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<UpdateEntriesAction> => {
    return dispatch({
      type: I18nActions.UPDATE_ENTRIES as I18nActions.UPDATE_ENTRIES,
      payload: entries
    });
  };
}

export type I18nActionTypes = UpdateEntriesAction;
