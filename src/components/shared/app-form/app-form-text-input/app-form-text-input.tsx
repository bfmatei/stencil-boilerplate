import {
  Component,
  Element,
  Method,
  Prop,
  State,
  Watch
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
  private formPropChangeHandler: (field: string, prop: string, value: string | boolean, oldValue: string | boolean) => void;

  @Watch('disabled')
  public disabledChangeHandler(newValue: boolean, oldValue: boolean): void {
    this.formPropChangeHandler(this.name, 'userDisabled', newValue, oldValue);
  }

  @Watch('message')
  public messageChangeHandler(newValue: boolean, oldValue: boolean): void {
    this.formPropChangeHandler(this.name, 'userMessage', newValue, oldValue);
  }

  @Watch('hasError')
  public hasErrorChangeHandler(newValue: boolean, oldValue: boolean): void {
    this.formPropChangeHandler(this.name, 'userError', newValue, oldValue);
  }

  public fieldSelector(form: ConnectedForm, fieldName: string): ConnectedFormField {
    const field: ConnectedFormField = form && form.fields[fieldName] ? form.fields[fieldName] : {
      name: fieldName,
      dirty: false,
      disabled: false,
      userDisabled: this.disabled,
      error: false,
      userError: this.hasError,
      value: this.defaultValue,
      message: '',
      userMessage: this.message
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
  public register(reduxState: ConnectedForm, formValueChangeHandler: (field: string, value: string, err: string) => void, formPropChangeHandler: (field: string, prop: string, value: string | boolean, oldValue: string | boolean) => void): void {
    this.reduxState = this.fieldSelector(reduxState, this.name);
    this.submitting = reduxState.submitting;

    this.formValueChangeHandler = formValueChangeHandler;
    this.formPropChangeHandler = formPropChangeHandler;
  }

  @autobind
  private fieldValueChangeHandler(value: string): void {
    const validation: AppFormError = this.validate(value);

    this.formValueChangeHandler(this.name, value, validation ? validation.message : '');

    this.onValueChange(value);
  }

  @Method()
  public validate(value: string = this.reduxState.value): AppFormError {
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

    return (
      <app-text-input
        name={this.name}
        label={this.label}
        fieldType={this.fieldType}
        message={!this.reduxState.dirty || (this.reduxState.value.length === 0 && !this.reduxState.error) ? this.reduxState.userMessage : this.reduxState.message}
        value={this.reduxState.value}
        disabled={this.reduxState.userDisabled || this.reduxState.disabled || this.submitting}
        hasError={this.reduxState.userError || this.reduxState.error}
        onValueChange={this.fieldValueChangeHandler}
      />
    );
  }
}
