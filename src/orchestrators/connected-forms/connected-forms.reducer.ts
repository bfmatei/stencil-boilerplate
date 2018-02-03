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
          submitting: true,
          fields: {
            ...Object.keys(currentForm.fields)
              .reduce((acc: any, field: string) => {
                return {
                  ...acc,
                  [field]: {
                    ...currentForm.fields[field],
                    error: false,
                    message: ''
                  }
                };
              }, {})
          }
        }
      };

    case ConnectedFormsActions.SUBMIT_FORM_SUCCESS:
      currentForm = state[action.payload.name];

      return {
        ...state,
        [action.payload.name]: {
          ...currentForm,
          success: true,
          submitting: false
        }
      };

    case ConnectedFormsActions.SUBMIT_FORM_ERROR:
      currentForm = state[action.payload.name];

      return {
        ...state,
        [action.payload.name]: {
          ...currentForm,
          error: true,
          submitting: false,
          fields: {
            ...currentForm.fields,
            ...action.payload.errors.reduce((acc: any, currentError: any) => {
              return {
                ...acc,
                [currentError.field]: {
                  ...currentForm.fields[currentError.field],
                  error: true,
                  message: currentError.message
                }
              };
            }, {})
          }
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

    case ConnectedFormsActions.SET_FIELD_PROP:
      currentForm = state[action.payload.formName];

      return {
        ...state,
        [action.payload.formName]: {
          ...currentForm,
          fields: {
            ...currentForm.fields,
            [action.payload.name]: {
              ...currentForm.fields[action.payload.name],
              [action.payload.prop]: action.payload.value
            }
          }
        }
      };

    default:
      return state;
  }
}
