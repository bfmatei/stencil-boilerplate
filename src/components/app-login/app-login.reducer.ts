import {
  AppLoginActions,
  AppLoginActionTypes
} from './app-login.actions';
import {
  AppLoginError
} from './app-login.interface';

export interface AppLoginState {
  username: string;
  password: string;
  pending: boolean;
  error: AppLoginError;
}

export function getInitialState(): AppLoginState {
  return {
    username: '',
    password: '',
    pending: false,
    error: {
      field: '',
      message: ''
    }
  };
}

export default function login(state: AppLoginState = getInitialState(), action: AppLoginActionTypes): AppLoginState {
  switch (action.type) {
    case AppLoginActions.LOGIN: {
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        pending: true,
        error: {
          field: '',
          message: ''
        }
      };
    }

    case AppLoginActions.LOGIN_SUCCESS: {
      return {
        ...state,
        pending: false,

        password: ''
      };
    }

    case AppLoginActions.LOGIN_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
