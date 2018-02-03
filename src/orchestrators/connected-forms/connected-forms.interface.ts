export interface ConnectedFormField {
  name: string;
  dirty: boolean;
  disabled: boolean;
  userDisabled: boolean;
  value: string;
  error: boolean;
  userError: boolean;
  message: string;
  userMessage: string;
}

export interface ConnectedFormFields {
  [name: string]: ConnectedFormField;
}

export interface ConnectedForm {
  name: string;
  success: boolean;
  submitting: boolean;
  error: boolean;
  dirty: boolean;
  fields: ConnectedFormFields;
}
