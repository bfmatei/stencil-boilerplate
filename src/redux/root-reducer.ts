import {
  combineReducers
} from 'redux';

import login from '../components/app-login/app-login.reducer';
import menu from '../components/app-menu/app-menu.reducer';
import config from '../orchestrators/config/config.reducer';
import router from '../orchestrators/connected-router/connected-router.reducer';
import i18n from '../orchestrators/i18n/i18n.reducer';
import user from '../orchestrators/user/user.reducer';

import {
  GlobalStoreState
} from './store';

export default combineReducers<GlobalStoreState>({
  config,
  i18n,
  login,
  menu,
  router,
  user
});
