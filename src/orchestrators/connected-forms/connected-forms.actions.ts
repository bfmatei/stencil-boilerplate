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
  SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS',
  SUBMIT_FORM_ERROR = 'SUBMIT_FORM_ERROR',
  REGISTER_FIELD = 'REGISTER_FIELD',
  SET_FIELD_VALUE = 'SET_FIELD_VALUE',
  SET_FIELD_PROP = 'SET_FIELD_PROP'
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

export interface SubmitFormSuccessAction {
  type: ConnectedFormsActions.SUBMIT_FORM_SUCCESS;
  payload: {
    name: string;
    data?: any;
  };
}

export function submitFormSuccess(name: string, data?: any): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SubmitFormSuccessAction> => {
    return dispatch({
      type: ConnectedFormsActions.SUBMIT_FORM_SUCCESS as ConnectedFormsActions.SUBMIT_FORM_SUCCESS,
      payload: {
        name,
        data
      }
    });
  };
}

export interface SubmitFormErrorAction {
  type: ConnectedFormsActions.SUBMIT_FORM_ERROR;
  payload: {
    name: string;
    errors: any[];
  };
}

export function submitFormError(name: string, errors: any[]): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SubmitFormErrorAction> => {
    return dispatch({
      type: ConnectedFormsActions.SUBMIT_FORM_ERROR as ConnectedFormsActions.SUBMIT_FORM_ERROR,
      payload: {
        name,
        errors
      }
    });
  };
}

export interface RegisterFieldAction {
  type: ConnectedFormsActions.REGISTER_FIELD;
  payload: {
    name: string;
    formName: string;
    options: {
      value: string;
      disabled: boolean;
      userDisabled: boolean;
      error: boolean;
      userError: boolean;
      message: string;
      userMessage: string;
    };
  };
}

export function registerField(name: string, formName: string, options: any = {}): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<RegisterFieldAction> => {
    return dispatch({
      type: ConnectedFormsActions.REGISTER_FIELD as ConnectedFormsActions.REGISTER_FIELD,
      payload: {
        name,
        formName,
        options: {
          value: options.defaultValue || '',
          disabled: false,
          userDisabled: options.userDisabled || false,
          error: false,
          userError: options.userError || false,
          message: '',
          userMessage: options.userMessage || ''
        }
      }
    });
  };
}

export interface SetFieldValueAction {
  type: ConnectedFormsActions.SET_FIELD_VALUE;
  payload: {
    name: string;
    value: string;
    formName: string;
  };
}

export function setFieldValue(name: string, value: string, formName: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetFieldValueAction> => {
    return dispatch({
      type: ConnectedFormsActions.SET_FIELD_VALUE as ConnectedFormsActions.SET_FIELD_VALUE,
      payload: {
        name,
        value,
        formName
      }
    });
  };
}

export interface SetFieldPropAction {
  type: ConnectedFormsActions.SET_FIELD_PROP;
  payload: {
    name: string;
    prop: string;
    value: any;
    formName: string;
  };
}

export function setFieldProp(name: string, prop: string, value: any, formName: string): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetFieldPropAction> => {
    return dispatch({
      type: ConnectedFormsActions.SET_FIELD_PROP as ConnectedFormsActions.SET_FIELD_PROP,
      payload: {
        name,
        prop,
        value,
        formName
      }
    });
  };
}

export type ConnectedFormsActionTypes = RegisterFormAction | UnregisterFormAction | SubmitFormAction | SubmitFormSuccessAction | SubmitFormErrorAction | RegisterFieldAction | SetFieldValueAction | SetFieldPropAction;
