import {
  combineReducers
} from 'redux';

import router from '../components/connected-router/connected-router.reducer';
import login from '../components/login-page/login-page.reducer';
import config from '../orchestrators/config/config.reducer';
import i18n from '../orchestrators/i18n/i18n.reducer';
import user from '../orchestrators/user/user.reducer';

import {
  GlobalStoreState
} from './store';

export default combineReducers<GlobalStoreState>({
  config,
  i18n,
  login,
  router,
  user
});
