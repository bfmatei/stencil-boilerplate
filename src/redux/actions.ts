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
  AppMenuActionTypes |
  ConfigActionTypes |
  ConnectedRouterActionTypes |
  I18nActionTypes;
