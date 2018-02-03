export type HTMLAppFormFieldsElements = HTMLAppFormTextInputElement;

export type HTMLAppFormSubmitElements = HTMLAppFormSubmitElement;

export interface AppFormError {
  field: string;
  message: string;
}

export type AppFormValidator = (value: string) => string;
