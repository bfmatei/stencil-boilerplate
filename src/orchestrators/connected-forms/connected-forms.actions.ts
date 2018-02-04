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
  ConnectedFormField
} from './connected-forms.interface';

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
  payload: {
    name: string;
    fields: ConnectedFormField[];
  };
}

export function registerForm(name: string, fields: ConnectedFormField[] = []): ReduxAction<RegisterFormAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<RegisterFormAction> => {
    return dispatch({
      type: ConnectedFormsActions.REGISTER_FORM as ConnectedFormsActions.REGISTER_FORM,
      payload: {
        name,
        fields
      }
    });
  };
}

export interface UnregisterFormAction {
  type: ConnectedFormsActions.UNREGISTER_FORM;
  payload: string;
}

export function unregisterForm(name: string): ReduxAction<UnregisterFormAction> {
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

export function submitForm(name: string): ReduxAction<SubmitFormAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SubmitFormAction> => {
    return dispatch({
      type: ConnectedFormsActions.SUBMIT_FORM as ConnectedFormsActions.SUBMIT_FORM,
      payload: name
    });
  };
}

export interface SubmitFormSuccessAction {
  type: ConnectedFormsActions.SUBMIT_FORM_SUCCESS;
  payload: string;
}

export function submitFormSuccess(name: string): ReduxAction<SubmitFormSuccessAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SubmitFormSuccessAction> => {
    return dispatch({
      type: ConnectedFormsActions.SUBMIT_FORM_SUCCESS as ConnectedFormsActions.SUBMIT_FORM_SUCCESS,
      payload: name
    });
  };
}

export interface SubmitFormError {
  field: string;
  message: string;
}

export interface SubmitFormErrorAction {
  type: ConnectedFormsActions.SUBMIT_FORM_ERROR;
  payload: {
    name: string;
    errors: SubmitFormError[];
  };
}

export function submitFormError(name: string, errors: SubmitFormError[]): ReduxAction<SubmitFormErrorAction> {
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
    formName: string;
    field: ConnectedFormField;
  };
}

export function registerField(formName: string, field: ConnectedFormField): ReduxAction<RegisterFieldAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<RegisterFieldAction> => {
    return dispatch({
      type: ConnectedFormsActions.REGISTER_FIELD as ConnectedFormsActions.REGISTER_FIELD,
      payload: {
        formName,
        field
      }
    });
  };
}

export interface SetFieldValueAction {
  type: ConnectedFormsActions.SET_FIELD_VALUE;
  payload: {
    name: string;
    value: string | boolean;
    err: string;
    formName: string;
  };
}

export function setFieldValue(name: string, value: string | boolean, err: string, formName: string): ReduxAction<SetFieldValueAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<SetFieldValueAction> => {
    return dispatch({
      type: ConnectedFormsActions.SET_FIELD_VALUE as ConnectedFormsActions.SET_FIELD_VALUE,
      payload: {
        name,
        value,
        err,
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
    value: string | boolean;
    formName: string;
  };
}

export function setFieldProp(name: string, prop: string, value: string | boolean, formName: string): ReduxAction<SetFieldPropAction> {
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
