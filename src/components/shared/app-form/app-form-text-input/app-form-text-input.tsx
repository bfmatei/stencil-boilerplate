import {
  Component,
  Element,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import autobind from '../../../../decorators/autobind';
import {
  ConnectedForm,
  ConnectedFormField
} from '../../../../orchestrators/connected-forms/connected-forms.interface';

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
  public validators: any[] = [];

  @State()
  public reduxState: ConnectedFormField = null;

  @State()
  public submitting: boolean = false;

  @Element()
  private $element: HTMLAppFormTextInputElement;

  private formValueChangeHandler: any;
  private formPropChangeHandler: any;

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
    return form && form.fields[fieldName] ? form.fields[fieldName] : {
      name: fieldName,
      disabled: false,
      userDisabled: this.disabled,
      error: false,
      userError: this.hasError,
      value: this.defaultValue,
      message: '',
      userMessage: this.message
    };
  }

  public componentWillLoad(): void {
    (this.$element.closest('app-form') as HTMLAppFormElement).readField(this.$element);
  }

  @Method()
  public register(reduxState: ConnectedForm, formValueChangeHandler: any, formPropChangeHandler: any): void {
    this.reduxState = this.fieldSelector(reduxState, this.name);
    this.submitting = reduxState.submitting;

    this.formValueChangeHandler = formValueChangeHandler;
    this.formPropChangeHandler = formPropChangeHandler;
  }

  @autobind
  private fieldValueChangeHandler(value: string): void {
    const validation: any = this.validate(value);

    this.formValueChangeHandler(this.name, value, validation ? validation.message : '');
  }

  @Method()
  public validate(value: string = this.reduxState.value): any {
    return this.validators.reduce((err: any, validator: any) => {
      if (err) {
        return err;
      }

      const message: string = validator(value);

      return message.length > 0 ? {
        field: this.name,
        message
      } : undefined;
    }, undefined);
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
        message={this.reduxState.userMessage || this.reduxState.message}
        value={this.reduxState.value}
        disabled={this.reduxState.userDisabled || this.reduxState.disabled || this.submitting}
        hasError={this.reduxState.userError || this.reduxState.error}
        onValueChange={this.fieldValueChangeHandler}
      />
    );
  }
}
