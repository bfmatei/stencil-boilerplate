import {
  RouterHistory
} from '@stencil/router';
import {
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
  return (): any => {
    return (next: Dispatch<GlobalStoreState>): any => {
      return (action: any): any => {
        switch (action.type) {
          case ConnectedRouterActions.PUSH:
            appHistory.push(action.payload.location, action.payload.state);
            break;

          case ConnectedRouterActions.REPLACE:
            appHistory.replace(action.payload.location, action.payload.state);
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
