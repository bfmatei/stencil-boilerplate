import {
  UserActions,
  UserActionTypes
} from './user.actions';
import {
  UserData
} from './user.interface';

export type UserState = UserData;

export function getInitialState(): UserState {
  return {
    id: null,
    user: null,
    name: null,
    lastName: null,
    email: null,
    role: null
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
