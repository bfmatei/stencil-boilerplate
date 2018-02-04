export type HTMLAppFormFieldsElements = HTMLAppFormTextInputElement | HTMLAppFormCheckboxElement;

export type HTMLAppFormSubmitElements = HTMLAppFormSubmitElement;

export interface AppFormError {
  field: string;
  message: string;
}

export type AppFormValidator = (value: string | boolean) => string;
