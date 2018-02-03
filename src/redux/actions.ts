import {
  ThunkAction
} from 'redux-thunk';

import {
  AppMenuActionTypes
} from '~components/app-menu/app-menu.actions';
import {
  ConfigActionTypes
} from '~orchestrators/config/config.actions';
import {
  ConnectedFormsActionTypes
} from '~orchestrators/connected-forms/connected-forms.actions';
import {
  ConnectedRouterActionTypes
} from '~orchestrators/connected-router/connected-router.actions';
import {
  I18nActionTypes
} from '~orchestrators/i18n/i18n.actions';

import {
  GlobalStoreState
} from './store';

export type ReduxAction<T> = ThunkAction<Promise<T>, GlobalStoreState, void>;

export type GlobalActionTypes =
  AppMenuActionTypes |
  ConfigActionTypes |
  ConnectedFormsActionTypes |
  ConnectedRouterActionTypes |
  I18nActionTypes;
