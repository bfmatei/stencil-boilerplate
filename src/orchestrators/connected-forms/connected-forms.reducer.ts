import {
  AppFormError
} from '~components/shared/app-form/app-form.interface';

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

function convertArrayToObject(arr: any[], key: string): {} {
  return arr.reduce((acc: {}, item: {}[]) => {
    return {
      ...acc,
      [item[key]]: {
        ...item
      }
    };
  }, {});
}

function computeErrorFlag(fields: ConnectedFormFields): boolean {
  return !Object.keys(fields)
    .every((field: string): boolean => {
      return fields[field].error === false;
    });
}

export default function forms(state: ConnectedFormsState = getInitialState(), action: ConnectedFormsActionTypes): ConnectedFormsState {
  let currentFormName: string = '';
  let currentForm: ConnectedForm = null;
  let currentFormFields: ConnectedFormFields = {};
  let currentFieldName: string = '';
  let currentField: ConnectedFormField = null;

  switch (action.type) {
    case ConnectedFormsActions.REGISTER_FORM:
      currentFormName = action.payload.name;
      currentFormFields = convertArrayToObject(action.payload.fields, 'name');

      return {
        ...state,
        [currentFormName]: {
          name: currentFormName,
          success: false,
          error: computeErrorFlag(currentFormFields),
          submitting: false,
          dirty: false,
          fields: currentFormFields
        }
      };

    case ConnectedFormsActions.UNREGISTER_FORM:
      currentFormName = action.payload;

      return {
        ...state,
        [currentFormName]: undefined
      };

    case ConnectedFormsActions.SUBMIT_FORM:
      currentFormName = action.payload;
      currentForm = state[currentFormName];
      currentFormFields = currentForm.fields;

      return {
        ...state,
        [currentFormName]: {
          ...currentForm,
          success: false,
          error: false,
          submitting: true,
          fields: {
            ...Object.keys(currentFormFields)
              .reduce((acc: ConnectedFormFields, field: string) => {
                return {
                  ...acc,
                  [field]: {
                    ...currentFormFields[field],
                    error: false,
                    message: ''
                  }
                };
              }, {})
          }
        }
      };

    case ConnectedFormsActions.SUBMIT_FORM_SUCCESS:
      currentFormName = action.payload;
      currentForm = state[currentFormName];

      return {
        ...state,
        [currentFormName]: {
          ...currentForm,
          success: true,
          submitting: false
        }
      };

    case ConnectedFormsActions.SUBMIT_FORM_ERROR:
      currentFormName = action.payload.name;
      currentForm = state[currentFormName];
      currentFormFields = currentForm.fields;

      return {
        ...state,
        [currentFormName]: {
          ...currentForm,
          error: true,
          submitting: false,
          fields: {
            ...currentFormFields,
            ...action.payload.errors.reduce((acc: ConnectedFormFields, currentError: AppFormError) => {
              currentFieldName = currentError.field;

              return {
                ...acc,
                [currentFieldName]: {
                  ...currentFormFields[currentFieldName],
                  error: true,
                  message: currentError.message
                }
              };
            }, {})
          }
        }
      };

    case ConnectedFormsActions.REGISTER_FIELD:
      currentFormName = action.payload.formName;
      currentForm = state[currentFormName];
      currentFormFields = currentForm.fields;
      currentFieldName = action.payload.field.name;

      return {
        ...state,
        [currentFormName]: {
          ...currentForm,
          fields: {
            ...currentFormFields,
            [currentFieldName]: {
              ...action.payload.field
            }
          }
        }
      };

    case ConnectedFormsActions.SET_FIELD_VALUE:
      currentFormName = action.payload.formName;
      currentForm = state[currentFormName];
      currentFormFields = currentForm.fields;
      currentFieldName = action.payload.name;
      currentField = currentFormFields[currentFieldName];

      currentFormFields = {
        ...currentFormFields,
        [currentFieldName]: {
          ...currentField,
          error: !!action.payload.err,
          message: action.payload.err || currentField.message,
          value: action.payload.value
        }
      };

      return {
        ...state,
        [currentFormName]: {
          ...currentForm,
          dirty: true,
          error: computeErrorFlag(currentFormFields),
          fields: currentFormFields
        }
      };

    case ConnectedFormsActions.SET_FIELD_PROP:
      currentFormName = action.payload.formName;
      currentForm = state[currentFormName];
      currentFormFields = currentForm.fields;
      currentFieldName = action.payload.name;
      currentField = currentFormFields[currentFieldName];

      return {
        ...state,
        [currentFormName]: {
          ...currentForm,
          fields: {
            ...currentFormFields,
            [currentFieldName]: {
              ...currentField,
              [action.payload.prop]: action.payload.value
            }
          }
        }
      };

    default:
      return state;
  }
}
