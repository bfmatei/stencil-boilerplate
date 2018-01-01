import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI
} from 'redux';

import locales from '../../locales';
import {
  GlobalStoreState
} from '../../redux/store';
import {
  updateEntries
} from '../i18n/i18n.actions';

import {
  ConfigActions
} from './config.actions';

export default function configMiddleware(): Middleware {
  return <S = GlobalStoreState>(store: MiddlewareAPI<S>): any => {
    return (next: Dispatch<S>): any => {
      return <A extends AnyAction>(action: A): any => {
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
