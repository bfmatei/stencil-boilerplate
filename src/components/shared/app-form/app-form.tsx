import {
  Component,
  Method,
  Prop,
  State,
  Watch
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
  submitForm
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

  private internalFields: HTMLAppFormFieldsElements[] = [];

  private submits: HTMLAppFormSubmitElements[] = [];

  @Watch('reduxState')
  public pendingChangeHandler(newValue: ConnectedForm, oldValue: ConnectedForm): void {
    if (newValue && oldValue) {
      if (oldValue.submitting !== newValue.submitting) {
        if (newValue.submitting === true) {
          this.submit(this.reduxState)
            .then(this.submitError)
            .catch(this.submitError);
        } else if (newValue.error === true) {
          this.submitError(this.reduxState);
        } else {
          this.submitSuccess(this.reduxState);
        }
      } else {
        if (oldValue.success !== newValue.success) {
          if (newValue.success === true) {
            this.submitSuccess(this.reduxState);
          }
        }

        if (oldValue.error !== newValue.error) {
          if (newValue.error === true) {
            this.submitError(this.reduxState);
          }
        }
      }
    }
  }

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
      submitForm
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
  }

  public render(): JSX.Element {
    return (
      <slot />
    );
  }
}
