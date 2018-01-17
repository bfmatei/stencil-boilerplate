import {
  RouterHistory
} from '@stencil/router';
import {
  applyMiddleware,
  createStore,
  Store
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

import {
  AppLoginState,
  getInitialState as getLoginInitialState
} from '../components/app-login/app-login.reducer';
import {
  AppMenuState,
  getInitialState as getAppMenuInitialState
} from '../components/app-menu/app-menu.reducer';
import configMiddleware from '../orchestrators/config/config.middleware';
import {
  ConfigState,
  getInitialState as getConfigInitialState
} from '../orchestrators/config/config.reducer';
import connectedRouterMiddleware from '../orchestrators/connected-router/connected-router.middleware';
import {
  ConnectedRouterState,
  getInitialState as getConnectedRouterInitialState
} from '../orchestrators/connected-router/connected-router.reducer';
import {
  getInitialState as getI18nInitialState,
  I18nState
} from '../orchestrators/i18n/i18n.reducer';
import {
  getInitialState as getUserInitialState,
  UserState
} from '../orchestrators/user/user.reducer';

import rootReducer from './root-reducer';

export interface GlobalStoreState {
  config: ConfigState;
  i18n: I18nState;
  login: AppLoginState;
  menu: AppMenuState;
  router: ConnectedRouterState;
  user: UserState;
}

export function getInitialState(appHistory: RouterHistory): GlobalStoreState {
  return {
    config: getConfigInitialState(),
    i18n: getI18nInitialState(),
    login: getLoginInitialState(),
    menu: getAppMenuInitialState(),
    router: getConnectedRouterInitialState(appHistory),
    user: getUserInitialState()
  };
}

export function configureStore(appHistory: RouterHistory): Store<GlobalStoreState> {
  return createStore<GlobalStoreState>(
    rootReducer,
    getInitialState(appHistory),
    composeWithDevTools(
      applyMiddleware(
        connectedRouterMiddleware(appHistory),
        configMiddleware()
      )
    )
  );
}
