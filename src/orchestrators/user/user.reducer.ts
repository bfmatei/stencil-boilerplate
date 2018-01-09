import {
  UserActions,
  UserActionTypes
} from './user.actions';
import {
  UserData
} from './user.interface';

export type UserState = UserData;

export function getInitialState(): UserState {
  const localStorageUser: string = window.localStorage ? localStorage.getItem('user') : null;

  if (localStorageUser) {
    return JSON.parse(localStorageUser);
  }

  return {
    id: null,
    user: null,
    name: null,
    lastName: null,
    email: null
  };
}

export default function user(state: UserState = getInitialState(), action: UserActionTypes): UserState {
  switch (action.type) {
    case UserActions.SET_USER: {
      return {
        ...action.payload
      };
    }

    case UserActions.RESET_USER: {
      return {
        ...getInitialState()
      };
    }

    default:
      return state;
  }
}
