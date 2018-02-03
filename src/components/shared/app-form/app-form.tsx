import {
  Component,
  Method,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../../decorators/autobind';
import noop from '../../../helpers/noop';
import promisedNoop from '../../../helpers/promisedNoop';
import {
  registerField,
  registerForm,
  setFieldProp,
  setFieldValue,
  submitForm,
  submitFormError,
  submitFormSuccess
} from '../../../orchestrators/connected-forms/connected-forms.actions';
import {
  ConnectedForm
} from '../../../orchestrators/connected-forms/connected-forms.interface';
import {
  GlobalStoreState
} from '../../../redux/store';

import {
  HTMLAppFormFieldsElements,
  HTMLAppFormSubmitElements
} from './app-form.interface';

@Component({
  tag: 'app-form'
})
export class AppForm {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public name: string = '';

  @Prop()
  public submit: (form: ConnectedForm) => Promise<any> = promisedNoop;

  @Prop()
  public submitSuccess: (form: ConnectedForm) => void = noop;

  @Prop()
  public submitError: (form: ConnectedForm) => void = noop;

  @State()
  public reduxState: ConnectedForm;

  private registerForm: typeof registerForm;
  private setFieldValue: typeof setFieldValue;
  private setFieldProp: typeof setFieldProp;
  private submitForm: typeof submitForm;
  private submitFormSuccess: typeof submitFormSuccess;
  private submitFormError: typeof submitFormError;

  private internalFields: HTMLAppFormFieldsElements[] = [];

  private submits: HTMLAppFormSubmitElements[] = [];

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        forms
      } = state;

      return {
        reduxState: forms && forms[this.name] ? forms[this.name] : {
          name: this.name,
          success: false,
          error: false,
          submitting: false,
          dirty: false,
          fields: {}
        }
      };
    });

    this.store.mapDispatchToProps(this, {
      registerForm,
      registerField,
      setFieldValue,
      setFieldProp,
      submitForm,
      submitFormSuccess,
      submitFormError
    });
  }

  public componentDidLoad(): void {
    const fields: any = this.internalFields.map((field: HTMLAppFormFieldsElements) => {
      field.register(this.name, this.fieldValueChangeHandler, this.fieldPropChangeHandler);

      return {
        name: field.name,
        value: field.defaultValue,
        userDisabled: field.disabled,
        userMessage: field.message,
        userError: field.hasError
      };
    });

    this.registerForm(this.name, fields);

    this.submits.forEach((submits: HTMLAppFormSubmitElements) => {
      submits.register(this.name, this.submitClickHandler);
    });
  }

  @Method()
  public readField(field: HTMLAppFormFieldsElements): void {
    this.internalFields = [
      ...this.internalFields,
      field
    ];
  }

  @autobind
  public fieldValueChangeHandler(field: string, value: string): void {
    // TODO: add validation

    this.setFieldValue(field, value, this.name);
  }

  @autobind
  public fieldPropChangeHandler(field: string, prop: string, value: any, oldValue: any): void {
    if (value !== oldValue) {
      this.setFieldProp(field, prop, value, this.name);
    }
  }

  @Method()
  public registerSubmit(submit: HTMLAppFormSubmitElements): void {
    this.submits = [
      ...this.submits,
      submit
    ];
  }

  @autobind
  public submitClickHandler(): void {
    this.submitForm(this.name);

    // TODO: add validation

    this.submit(this.reduxState)
      .then((data: any) => {
        this.submitFormSuccess(this.name);
        this.submitSuccess(data);
      })
      .catch((err: any) => {
        this.submitFormError(this.name, err);
        this.submitError(err);
      });
  }

  public render(): JSX.Element {
    return (
      <slot />
    );
  }
}
