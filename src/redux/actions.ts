import {
  ConnectedRouterActionTypes
} from '../components/connected-router/connected-router.actions';
import {
  LoginPageActionTypes
} from '../components/login-page/login-page.actions';
import {
  ConfigActionTypes
} from '../orchestrators/config/config.actions';
import {
  I18nActionTypes
} from '../orchestrators/i18n/i18n.actions';

export type GlobalActionTypes = LoginPageActionTypes | ConnectedRouterActionTypes | I18nActionTypes | ConfigActionTypes;
