import {
  ConnectedFormsActions,
  ConnectedFormsActionTypes
} from './connected-forms.actions';
import {
  ConnectedForm
} from './connected-forms.interface';

export interface ConnectedFormsState {
  [name: string]: ConnectedForm;
}

export function getInitialState(): ConnectedFormsState {
  return {};
}

export default function forms(state: ConnectedFormsState = getInitialState(), action: ConnectedFormsActionTypes): ConnectedFormsState {
  let currentForm: ConnectedForm = null;

  switch (action.type) {
    case ConnectedFormsActions.REGISTER_FORM:
      return {
        ...state,
        [action.payload]: {
          name: action.payload,
          submitting: false,
          fields: {}
        }
      };

    case ConnectedFormsActions.UNREGISTER_FORM:
      return {
        ...state,
        [action.payload]: undefined
      };

    case ConnectedFormsActions.SUBMIT_FORM:
      currentForm = state[action.payload];

      return {
        ...state,
        [action.payload]: {
          ...currentForm,
          submitting: true
        }
      };

    case ConnectedFormsActions.UNFREEZE_FORM:
      currentForm = state[action.payload];

      return {
        ...state,
        [action.payload]: {
          ...currentForm,
          submitting: true
        }
      };

    case ConnectedFormsActions.SET_FIELD:
      return {
        ...state
      };

    default:
      return state;
  }
}
