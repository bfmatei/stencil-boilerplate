export interface ConnectedFormField {
  name: string;
  disabled: boolean;
  userDisabled: boolean;
  value: string;
  error: boolean;
  userError: boolean;
  message: string;
  userMessage: string;
}

export interface ConnectedForm {
  name: string;
  success: boolean;
  submitting: boolean;
  error: boolean;
  dirty: boolean;
  fields: {
    [name: string]: ConnectedFormField;
  };
}
