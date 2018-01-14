import {
  LocationSegments,
  RouterHistory
} from '@stencil/router';

import {
  ConnectedRouterActions,
  ConnectedRouterActionTypes
} from './connected-router.actions';

export type ConnectedRouterState = LocationSegments;

export function getInitialState(appHistory: RouterHistory = null): ConnectedRouterState {
  return appHistory ? appHistory.location : {
    pathname: '',
    search: '',
    state: {},
    hash: ''
  };
}

export default function router(state: ConnectedRouterState = getInitialState(), action: ConnectedRouterActionTypes): ConnectedRouterState {
  switch (action.type) {
    case ConnectedRouterActions.LOCATION_CHANGE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}
