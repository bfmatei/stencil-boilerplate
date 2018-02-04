import {
  combineReducers
} from 'redux';

import menu from '../components/app-menu/app-menu.reducer';
import projects from '../components/app-projects/app-projects.reducer';
import config from '../orchestrators/config/config.reducer';
import forms from '../orchestrators/connected-forms/connected-forms.reducer';
import router from '../orchestrators/connected-router/connected-router.reducer';
import i18n from '../orchestrators/i18n/i18n.reducer';
import user from '../orchestrators/user/user.reducer';

import {
  GlobalStoreState
} from './store';

export default combineReducers<GlobalStoreState>({
  config,
  forms,
  i18n,
  menu,
  projects,
  router,
  user
});
