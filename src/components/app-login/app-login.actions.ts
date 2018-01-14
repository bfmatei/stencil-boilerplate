import {
  Dispatch
} from 'redux';

import {
  GlobalStoreState
} from '../../redux/store';

import {
  AppLoginError
} from './app-login.interface';

export enum AppLoginActions {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR'
}

export interface LoginAction {
  type: AppLoginActions.LOGIN;
  payload: {
    username: string;
    password: string;
  };
}

export function login(username: string, password: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LoginAction> => {
    return dispatch({
      type: AppLoginActions.LOGIN as AppLoginActions.LOGIN,
      payload: {
        username,
        password
      }
    });
  };
}

export interface LoginSuccessAction {
  type: AppLoginActions.LOGIN_SUCCESS;
}

export function loginSuccess(): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LoginSuccessAction> => {
    return dispatch({
      type: AppLoginActions.LOGIN_SUCCESS as AppLoginActions.LOGIN_SUCCESS
    });
  };
}

export interface LoginErrorAction {
  type: AppLoginActions.LOGIN_ERROR;
  payload: AppLoginError;
}

export function loginError(error: AppLoginError): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LoginErrorAction> => {
    return dispatch({
      type: AppLoginActions.LOGIN_ERROR as AppLoginActions.LOGIN_ERROR,
      payload: error
    });
  };
}

export type AppLoginActionTypes = LoginAction | LoginSuccessAction | LoginErrorAction;
