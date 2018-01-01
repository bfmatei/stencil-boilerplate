import {
  RouterHistory
} from '@stencil/router';
import {
  AnyAction,
  Dispatch,
  Middleware
} from 'redux';

import {
  GlobalStoreState
} from '../../redux/store';

import {
  ConnectedRouterActions
} from './connected-router.actions';

export default function connectedRouterMiddleware(appHistory: RouterHistory): Middleware {
  return <S = GlobalStoreState>(): any => {
    return (next: Dispatch<S>): any => {
      return <A extends AnyAction>(action: A): any => {
        switch (action.type) {
          case ConnectedRouterActions.PUSH:
            appHistory.push(action.payload, {});
            break;

          case ConnectedRouterActions.REPLACE:
            appHistory.replace(action.payload, {});
            break;

          case ConnectedRouterActions.GO:
            appHistory.go(action.payload);
            break;

          case ConnectedRouterActions.GO_BACK:
            appHistory.goBack();
            break;

          case ConnectedRouterActions.GO_FORWARD:
            appHistory.goForward();
            break;

          default:
        }

        return next(action);
      };
    };
  };
}
