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
          success: false,
          error: false,
          submitting: false,
          dirty: false,
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
          success: false,
          error: false,
          submitting: true
        }
      };

    case ConnectedFormsActions.SUBMIT_FORM_SUCCESS:
      currentForm = state[action.payload];

      return {
        ...state,
        [action.payload]: {
          ...currentForm,
          success: true,
          submitting: true
        }
      };

    case ConnectedFormsActions.SUBMIT_FORM_ERROR:
      currentForm = state[action.payload];

      return {
        ...state,
        [action.payload]: {
          ...currentForm,
          error: true,
          submitting: true
        }
      };

    case ConnectedFormsActions.REGISTER_FIELD:
      currentForm = state[action.payload.formName];

      const options: any = action.payload.options;

      return {
        ...state,
        [action.payload.formName]: {
          ...currentForm,
          fields: {
            ...currentForm.fields,
            [action.payload.name]: {
              name: action.payload.name,
              ...options
            }
          }
        }
      };

    case ConnectedFormsActions.SET_FIELD_VALUE:
      currentForm = state[action.payload.formName];

      return {
        ...state,
        [action.payload.formName]: {
          ...currentForm,
          dirty: true,
          fields: {
            ...currentForm.fields,
            [action.payload.name]: {
              ...currentForm.fields[action.payload.name],
              value: action.payload.value
            }
          }
        }
      };

    default:
      return state;
  }
}
