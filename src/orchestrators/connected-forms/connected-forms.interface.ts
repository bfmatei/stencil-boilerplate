export interface ConnectedFormField {
  name: string;
  dirty: boolean;
  disabled: boolean;
  value: string | boolean;
  error: boolean;
  message: string;
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
