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
  SET_USERNAME = 'SET_USERNAME',
  SET_PASSWORD = 'SET_PASSWORD',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR'
}

export interface SetUsernameAction {
  type: AppLoginActions.SET_USERNAME;
  payload: string;
}

export function setUsername(username: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetUsernameAction> => {
    return dispatch({
      type: AppLoginActions.SET_USERNAME as AppLoginActions.SET_USERNAME,
      payload: username
    });
  };
}

export interface SetPasswordAction {
  type: AppLoginActions.SET_PASSWORD;
  payload: string;
}

export function setPassword(password: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetPasswordAction> => {
    return dispatch({
      type: AppLoginActions.SET_PASSWORD as AppLoginActions.SET_PASSWORD,
      payload: password
    });
  };
}

export interface LoginAction {
  type: AppLoginActions.LOGIN;
}

export function login(): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LoginAction> => {
    return dispatch({
      type: AppLoginActions.LOGIN as AppLoginActions.LOGIN
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

export type AppLoginActionTypes = SetUsernameAction | SetPasswordAction | LoginAction | LoginSuccessAction | LoginErrorAction;
