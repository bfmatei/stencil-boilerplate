import {
  AppDashboardActions,
  AppDashboardActionTypes
} from './app-dashboard.actions';

export interface AppDashboardState {
  text: string;
}

export function getInitialState(): AppDashboardState {
  return {
    text: ''
  };
}

export default function login(state: AppDashboardState = getInitialState(), action: AppDashboardActionTypes): AppDashboardState {
  switch (action.type) {
    case AppDashboardActions.SET_TEXT: {
      return {
        ...state,
        text: action.payload
      };
    }

    default:
      return state;
  }
}
