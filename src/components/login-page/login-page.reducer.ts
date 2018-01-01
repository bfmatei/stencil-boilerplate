import {
  LoginPageActions,
  LoginPageActionTypes
} from './login-page.actions';

export interface LoginPageState {
  username: string;
  password: string;
  pending: boolean;
  error: string;
}

export function getInitialState(): LoginPageState {
  return {
    username: '',
    password: '',
    pending: false,
    error: ''
  };
}

export default function login(state: LoginPageState = getInitialState(), action: LoginPageActionTypes): LoginPageState {
  switch (action.type) {
    case LoginPageActions.CHANGE_USERNAME: {
      return {
        ...state,
        username: action.payload
      };
    }

    case LoginPageActions.CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.payload
      };
    }

    case LoginPageActions.LOGIN: {
      return {
        ...state,
        error: '',
        pending: true
      };
    }

    case LoginPageActions.LOGIN_SUCCESS: {
      return {
        ...state,
        password: '',
        pending: false
      };
    }

    case LoginPageActions.LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    }

    default:
      return state;
  }
}
