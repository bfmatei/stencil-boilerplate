import {
  Dispatch
} from 'redux';

import {
  ReduxAction
} from '../../redux/actions';
import {
  GlobalStoreState
} from '../../redux/store';

export enum AppMenuActions {
  OPEN_MENU = 'OPEN_MENU',
  CLOSE_MENU = 'CLOSE_MENU',
  TOGGLE_MENU = 'TOGGLE_MENU'
}

export interface OpenMenuAction {
  type: AppMenuActions.OPEN_MENU;
}

export function openMenu(): ReduxAction<OpenMenuAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<OpenMenuAction> => {
    return dispatch({
      type: AppMenuActions.OPEN_MENU as AppMenuActions.OPEN_MENU
    });
  };
}

export interface CloseMenuAction {
  type: AppMenuActions.CLOSE_MENU;
}

export function closeMenu(): ReduxAction<CloseMenuAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<CloseMenuAction> => {
    return dispatch({
      type: AppMenuActions.CLOSE_MENU as AppMenuActions.CLOSE_MENU
    });
  };
}

export interface ToggleMenuAction {
  type: AppMenuActions.TOGGLE_MENU;
}

export function toggleMenu(): ReduxAction<ToggleMenuAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<ToggleMenuAction> => {
    return dispatch({
      type: AppMenuActions.TOGGLE_MENU as AppMenuActions.TOGGLE_MENU
    });
  };
}

export type AppMenuActionTypes = OpenMenuAction | CloseMenuAction | ToggleMenuAction;
