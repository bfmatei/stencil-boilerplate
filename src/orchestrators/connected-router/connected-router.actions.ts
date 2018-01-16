import {
  LocationSegments
} from '@stencil/router';
import {
  Dispatch
} from 'redux';

import {
  GlobalStoreState
} from '../../redux/store';

export enum ConnectedRouterActions {
  LOCATION_CHANGE = 'LOCATION_CHANGE',
  PUSH = 'PUSH',
  REPLACE = 'REPLACE',
  GO = 'GO',
  GO_BACK = 'GO_BACK',
  GO_FORWARD = 'GO_FORWARD'
}

export interface LocationChangeAction {
  type: ConnectedRouterActions.LOCATION_CHANGE;
  payload: LocationSegments;
}

export function locationChange(location: LocationSegments): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<LocationChangeAction> => {
    return dispatch({
      type: ConnectedRouterActions.LOCATION_CHANGE as ConnectedRouterActions.LOCATION_CHANGE,
      payload: location
    });
  };
}

export interface PushAction {
  type: ConnectedRouterActions.PUSH;
  payload: {
    location: string;
    state: {};
  };
}

export function push(location: string, state: {} = {}): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<PushAction> => {
    return dispatch({
      type: ConnectedRouterActions.PUSH as ConnectedRouterActions.PUSH,
      payload: {
        location,
        state
      }
    });
  };
}

export interface ReplaceAction {
  type: ConnectedRouterActions.REPLACE;
  payload: {
    location: string;
    state: {};
  };
}

export function replace(location: string, state: {} = {}): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<ReplaceAction> => {
    return dispatch({
      type: ConnectedRouterActions.REPLACE as ConnectedRouterActions.REPLACE,
      payload: {
        location,
        state
      }
    });
  };
}

export interface GoAction {
  type: ConnectedRouterActions.GO;
  payload: number;
}

export function go(step: number): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<GoAction> => {
    return dispatch({
      type: ConnectedRouterActions.GO as ConnectedRouterActions.GO,
      payload: step
    });
  };
}

export interface GoBackAction {
  type: ConnectedRouterActions.GO_BACK;
}

export function goBack(): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<GoBackAction> => {
    return dispatch({
      type: ConnectedRouterActions.GO_BACK as ConnectedRouterActions.GO_BACK
    });
  };
}

export interface GoForwadAction {
  type: ConnectedRouterActions.GO_FORWARD;
}

export function goForward(): any {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<GoForwadAction> => {
    return dispatch({
      type: ConnectedRouterActions.GO_FORWARD as ConnectedRouterActions.GO_FORWARD
    });
  };
}

export type ConnectedRouterActionTypes = LocationChangeAction | PushAction | ReplaceAction | GoAction | GoBackAction | GoForwadAction;
