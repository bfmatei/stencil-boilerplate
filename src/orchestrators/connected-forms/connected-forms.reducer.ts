import {
  AppFormError
} from '../../components/shared/app-form/app-form.interface';

import {
  ConnectedFormsActions,
  ConnectedFormsActionTypes
} from './connected-forms.actions';
import {
  ConnectedForm,
  ConnectedFormField,
  ConnectedFormFields
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
        [action.payload.name]: {
          name: action.payload.name,
          success: false,
          error: !action.payload.fields.every((field: ConnectedFormField): boolean => {
            return field.error === false;
          }),
          submitting: false,
          dirty: false,
          fields: action.payload.fields.reduce((acc: ConnectedFormFields, item: ConnectedFormField): ConnectedFormFields => {
            return {
              ...acc,
              [item.name]: {
                ...item,
                disabled: false
              }
            };
          }, {})
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
              .reduce((acc: ConnectedFormFields, field: string) => {
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
      currentForm = state[action.payload];

      return {
        ...state,
        [action.payload]: {
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
            ...action.payload.errors.reduce((acc: ConnectedFormFields, currentError: AppFormError) => {
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

      return {
        ...state,
        [action.payload.formName]: {
          ...currentForm,
          fields: {
            ...currentForm.fields,
            [action.payload.field.name]: {
              ...action.payload.field
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
          error: currentForm.error || !!action.payload.err,
          fields: {
            ...currentForm.fields,
            [action.payload.name]: {
              ...currentForm.fields[action.payload.name],
              error: !!action.payload.err,
              message: action.payload.err || currentForm.fields[action.payload.name].message,
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
