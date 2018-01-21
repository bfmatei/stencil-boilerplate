export interface ConnectedFormField {
  name: string;
  value: string;
}

export interface ConnectedForm {
  name: string;
  submitting: boolean;
  fields: {
    [name: string]: ConnectedFormField;
  };
}
