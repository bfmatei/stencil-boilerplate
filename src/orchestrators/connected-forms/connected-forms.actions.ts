import {
  Dispatch
} from 'redux';

import {
  GlobalStoreState
} from '../../redux/store';

export enum ConnectedFormsActions {
  REGISTER_FORM = 'REGISTER_FORM',
  UNREGISTER_FORM = 'UNREGISTER_FORM',
  SUBMIT_FORM = 'SUBMIT_FORM',
  UNFREEZE_FORM = 'UNFREEZE_FORM',
  SET_FIELD = 'SET_FIELD'
}

export interface RegisterFormAction {
  type: ConnectedFormsActions.REGISTER_FORM;
  payload: string;
}

export function registerForm(name: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<RegisterFormAction> => {
    return dispatch({
      type: ConnectedFormsActions.REGISTER_FORM as ConnectedFormsActions.REGISTER_FORM,
      payload: name
    });
  };
}

export interface UnregisterFormAction {
  type: ConnectedFormsActions.UNREGISTER_FORM;
  payload: string;
}

export function unregisterForm(name: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<UnregisterFormAction> => {
    return dispatch({
      type: ConnectedFormsActions.UNREGISTER_FORM as ConnectedFormsActions.UNREGISTER_FORM,
      payload: name
    });
  };
}

export interface SubmitFormAction {
  type: ConnectedFormsActions.SUBMIT_FORM;
  payload: string;
}

export function submitForm(name: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SubmitFormAction> => {
    return dispatch({
      type: ConnectedFormsActions.SUBMIT_FORM as ConnectedFormsActions.SUBMIT_FORM,
      payload: name
    });
  };
}

export interface UnfreezeFormAction {
  type: ConnectedFormsActions.UNFREEZE_FORM;
  payload: string;
}

export function unfreezeForm(name: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<UnfreezeFormAction> => {
    return dispatch({
      type: ConnectedFormsActions.UNFREEZE_FORM as ConnectedFormsActions.UNFREEZE_FORM,
      payload: name
    });
  };
}

export interface SetFieldAction {
  type: ConnectedFormsActions.SET_FIELD;
  payload: {};
}

export function setField(): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetFieldAction> => {
    return dispatch({
      type: ConnectedFormsActions.SET_FIELD as ConnectedFormsActions.SET_FIELD,
      payload: {}
    });
  };
}

export type ConnectedFormsActionTypes = RegisterFormAction | UnregisterFormAction | SubmitFormAction | UnfreezeFormAction | SetFieldAction;
