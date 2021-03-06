import {
  Dispatch,
  Middleware
} from 'redux';

import locales from '~locales/locales';
import {
  updateEntries
} from '~orchestrators/i18n/i18n.actions';
import {
  GlobalStoreState
} from '~redux/store';

import {
  ConfigActions
} from './config.actions';

export default function configMiddleware(): Middleware {
  return (store: any): any => {
    return (next: Dispatch<GlobalStoreState>): any => {
      return (action: any): any => {
        switch (action.type) {
          case ConfigActions.CHANGE_LANGUAGE:
            store.dispatch(updateEntries(locales[action.payload]));
            break;

          default:
        }

        return next(action);
      };
    };
  };
}
