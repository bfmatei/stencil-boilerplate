import {
  Component,
  Element,
  Method,
  Prop,
  State
} from '@stencil/core';

import {
  AppFormError,
  AppFormValidator
} from '~components/shared/app-form/app-form.interface';
import autobind from '~decorators/autobind';
import noop from '~helpers/noop';
import {
  ConnectedForm,
  ConnectedFormField
} from '~orchestrators/connected-forms/connected-forms.interface';

@Component({
  tag: 'app-form-text-input'
})
export class AppFormTextInput {
  @Prop()
  public name: string = '';

  @Prop()
  public label: string = '';

  @Prop()
  public fieldType: 'text' | 'password' = 'text';

  @Prop()
  public message: string = '';

  @Prop()
  public defaultValue: string = '';

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public hasError: boolean = false;

  @Prop()
  public validators: AppFormValidator[] = [];

  @Prop()
  public onValueChange: (value: string) => void = noop;

  @State()
  public reduxState: ConnectedFormField = null;

  @State()
  public submitting: boolean = false;

  @Element()
  private $element: HTMLAppFormTextInputElement;

  private formValueChangeHandler: (field: string, value: string, err: string) => void;

  public fieldSelector(form: ConnectedForm, fieldName: string): ConnectedFormField {
    const field: ConnectedFormField = form && form.fields[fieldName] ? form.fields[fieldName] : {
      name: fieldName,
      dirty: false,
      disabled: false,
      error: false,
      value: this.defaultValue,
      message: ''
    };

    const validation: AppFormError = this.validate(field.value);

    field.error = validation.message.length > 0;
    field.message = validation.message;

    return field;
  }

  public componentWillLoad(): void {
    // tslint:disable-next-line:no-unnecessary-type-assertion
    (this.$element.closest('app-form') as HTMLAppFormElement).readField(this.$element);
  }

  @Method()
  public register(reduxState: ConnectedForm, formValueChangeHandler: (field: string, value: string | boolean, err: string) => void): void {
    this.reduxState = this.fieldSelector(reduxState, this.name);
    this.submitting = reduxState.submitting;

    this.formValueChangeHandler = formValueChangeHandler;
  }

  @autobind
  private fieldValueChangeHandler(value: string): void {
    const validation: AppFormError = this.validate(value);

    this.formValueChangeHandler(this.name, value, validation ? validation.message : '');

    this.onValueChange(value);
  }

  @Method()
  public validate(value: string | boolean = this.reduxState.value): AppFormError {
    return {
      field: this.name,
      message: this.validators.reduce((err: string, validator: AppFormValidator) => {
        if (err.length > 0) {
          return err;
        }

        return validator(value);
      }, '')
    };
  }

  public render(): JSX.Element {
    if (this.reduxState === null) {
      return null;
    }

    const value: string = this.reduxState.value as string;

    return (
      <app-text-input
        name={this.name}
        label={this.label}
        fieldType={this.fieldType}
        message={!this.reduxState.dirty || (value.length === 0 && !this.reduxState.error) ? this.message : this.reduxState.message}
        value={value}
        disabled={this.disabled || this.reduxState.disabled || this.submitting}
        hasError={this.hasError || (this.reduxState.dirty && this.reduxState.error)}
        onValueChange={this.fieldValueChangeHandler}
      />
    );
  }
}
