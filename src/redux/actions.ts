import {
  AppDashboardActionTypes
} from '../components/app-dashboard/app-dashboard.actions';
import {
  AppLoginActionTypes
} from '../components/app-login/app-login.actions';
import {
  AppMenuActionTypes
} from '../components/app-menu/app-menu.actions';
import {
  ConfigActionTypes
} from '../orchestrators/config/config.actions';
import {
  ConnectedRouterActionTypes
} from '../orchestrators/connected-router/connected-router.actions';
import {
  I18nActionTypes
} from '../orchestrators/i18n/i18n.actions';

export type GlobalActionTypes =
  AppDashboardActionTypes |
  AppLoginActionTypes |
  AppMenuActionTypes |
  ConfigActionTypes |
  ConnectedRouterActionTypes |
  I18nActionTypes;
