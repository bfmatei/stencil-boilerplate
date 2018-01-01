import {
  Dispatch
} from 'redux';

import {
  GlobalStoreState
} from '../../redux/store';

export enum LoginPageActions {
  CHANGE_USERNAME = 'CHANGE_USERNAME',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR'
}

export interface ChangeUsernameAction {
  type: LoginPageActions.CHANGE_USERNAME;
  payload: string;
}

export function changeUsername(username: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<ChangeUsernameAction> => {
    return dispatch({
      type: LoginPageActions.CHANGE_USERNAME as LoginPageActions.CHANGE_USERNAME,
      payload: username
    });
  };
}

export interface ChangePasswordAction {
  type: LoginPageActions.CHANGE_PASSWORD;
  payload: string;
}

export function changePassword(password: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<ChangePasswordAction> => {
    return dispatch({
      type: LoginPageActions.CHANGE_PASSWORD as LoginPageActions.CHANGE_PASSWORD,
      payload: password
    });
  };
}

export interface LoginAction {
  type: LoginPageActions.LOGIN;
}

export function login(): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LoginAction> => {
    return dispatch({
      type: LoginPageActions.LOGIN as LoginPageActions.LOGIN
    });
  };
}

export interface LoginSuccessAction {
  type: LoginPageActions.LOGIN_SUCCESS;
}

export function loginSuccess(): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LoginSuccessAction> => {
    return dispatch({
      type: LoginPageActions.LOGIN_SUCCESS as LoginPageActions.LOGIN_SUCCESS
    });
  };
}

export interface LoginErrorAction {
  type: LoginPageActions.LOGIN_ERROR;
  payload: string;
}

export function loginError(error: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LoginErrorAction> => {
    return dispatch({
      type: LoginPageActions.LOGIN_ERROR as LoginPageActions.LOGIN_ERROR,
      payload: error
    });
  };
}

export type LoginPageActionTypes = ChangeUsernameAction | ChangePasswordAction | LoginAction | LoginSuccessAction | LoginErrorAction;
