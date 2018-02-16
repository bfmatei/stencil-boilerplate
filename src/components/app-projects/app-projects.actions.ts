import {
  Dispatch
} from 'redux';

import {
  ReduxAction
} from '~redux/actions';
import {
  GlobalStoreState
} from '~redux/store';

export enum AppProjectsActions {
  DELETE_PROJECT = 'DELETE_PROJECT',
  REFRESH_PROJECTS = 'REFRESH_PROJECTS'
}

export interface DeleteProjectAction {
  type: AppProjectsActions.DELETE_PROJECT;
  payload: number;
}

export function deleteProject(payload: number): ReduxAction<DeleteProjectAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<DeleteProjectAction> => {
    return dispatch({
      type: AppProjectsActions.DELETE_PROJECT as AppProjectsActions.DELETE_PROJECT,
      payload
    });
  };
}

export interface RefreshProjectsAction {
  type: AppProjectsActions.REFRESH_PROJECTS;
}

export function refreshProjects(): ReduxAction<RefreshProjectsAction> {
  return async (dispatch: Dispatch<GlobalStoreState>): Promise<RefreshProjectsAction> => {
    return dispatch({
      type: AppProjectsActions.REFRESH_PROJECTS as AppProjectsActions.REFRESH_PROJECTS
    });
  };
}

export type AppProjectsActionTypes = DeleteProjectAction | RefreshProjectsAction;
