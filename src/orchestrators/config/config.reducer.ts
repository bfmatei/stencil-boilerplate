import {
  ConfigActions,
  ConfigActionTypes
} from './config.actions';

export interface ConfigState {
  language: string;
}

export function getInitialState(): ConfigState {
  return {
    language: 'en'
  };
}

export default function config(state: ConfigState = getInitialState(), action: ConfigActionTypes): ConfigState {
  switch (action.type) {
    case ConfigActions.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload
      };
    }

    default:
      return state;
  }
}
