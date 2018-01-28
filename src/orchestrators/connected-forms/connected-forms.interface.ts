export interface ConnectedFormField {
  name: string;
  disabled: boolean;
  value: string;
  error: boolean;
  message: string;
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
