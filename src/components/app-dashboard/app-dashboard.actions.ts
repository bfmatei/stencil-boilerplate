import {
  Dispatch
} from 'redux';

import {
  GlobalStoreState
} from '../../redux/store';

export enum AppDashboardActions {
  SET_TEXT = 'SET_TEXT'
}

export interface SetTextAction {
  type: AppDashboardActions.SET_TEXT;
  payload: string;
}

export function setText(text: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetTextAction> => {
    return dispatch({
      type: AppDashboardActions.SET_TEXT as AppDashboardActions.SET_TEXT,
      payload: text
    });
  };
}

export type AppDashboardActionTypes = SetTextAction;
