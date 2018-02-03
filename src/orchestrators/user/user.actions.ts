import {
  Dispatch
} from 'redux';

import {
  ReduxAction
} from '../../redux/actions';
import {
  GlobalStoreState
} from '../../redux/store';

import {
  UserData
} from './user.interface';

export enum UserActions {
  SET_USER = 'SET_USER',
  RESET_USER = 'RESET_USER'
}

export interface SetUserAction {
  type: UserActions.SET_USER;
  payload: UserData;
}

export function setUser(user: UserData): ReduxAction<SetUserAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetUserAction> => {
    return dispatch({
      type: UserActions.SET_USER as UserActions.SET_USER,
      payload: user
    });
  };
}

export interface ResetUserAction {
  type: UserActions.RESET_USER;
}

export function resetUser(): ReduxAction<ResetUserAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<ResetUserAction> => {
    return dispatch({
      type: UserActions.RESET_USER as UserActions.RESET_USER
    });
  };
}

export type UserActionTypes = SetUserAction | ResetUserAction;
