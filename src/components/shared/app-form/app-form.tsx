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
  setFieldValue,
  submitForm,
  SubmitFormError,
  submitFormError,
  submitFormSuccess
} from '../../../orchestrators/connected-forms/connected-forms.actions';
import {
  ConnectedForm,
  ConnectedFormField
} from '../../../orchestrators/connected-forms/connected-forms.interface';
import {
  GlobalStoreState
} from '../../../redux/store';

import {
  AppFormError,
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
  public submitSuccess: (data?: any) => void = noop;

  @Prop()
  public submitError: (err?: SubmitFormError[]) => void = noop;

  @State()
  public reduxState: ConnectedForm;

  private registerForm: typeof registerForm;
  private setFieldValue: typeof setFieldValue;
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
      submitForm,
      submitFormSuccess,
      submitFormError
    });
  }

  public componentDidLoad(): void {
    const fields: ConnectedFormField[] = this.internalFields.map((field: HTMLAppFormFieldsElements): ConnectedFormField => {
      field.register(this.reduxState, this.fieldValueChangeHandler);

      const validation: AppFormError = field.validate();

      return {
        name: field.name,
        dirty: false,
        disabled: false,
        value: field.defaultValue,
        error: validation.message.length > 0,
        message: validation.message,
        userDisabled: field.disabled,
        userMessage: field.message,
        userError: field.hasError
      };
    });

    this.registerForm(this.name, fields);

    this.submits.forEach((submits: HTMLAppFormSubmitElements) => {
      submits.register(this.reduxState, this.submitClickHandler);
    });
  }

  @Watch('reduxState')
  public reduxStateChangeHandler(newValue: ConnectedForm): void {
    this.internalFields.forEach((field: HTMLAppFormFieldsElements) => {
      field.register(newValue, this.fieldValueChangeHandler);
    });

    this.submits.forEach((submits: HTMLAppFormSubmitElements) => {
      submits.register(this.reduxState, this.submitClickHandler);
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
  public fieldValueChangeHandler(field: string, value: string | boolean, err: string = ''): void {
    this.setFieldValue(field, value, err, this.name);
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
    const errors: AppFormError[] = this.internalFields.reduce((errorsCollection: AppFormError[], field: HTMLAppFormFieldsElements) => {
      const validation: AppFormError = field.validate();

      return validation.message ? [
        ...errorsCollection,
        validation.message  ? validation : undefined
      ] : errorsCollection;
    }, []);

    if (errors.length > 0) {
      this.submitFormError(this.name, errors);

      this.submitError(errors);
    } else {
      this.submitForm(this.name);

      this.submit(this.reduxState)
        .then((data: any) => {
          this.submitFormSuccess(this.name);
          this.submitSuccess(data);
        })
        .catch((err: AppFormError[]) => {
          this.submitFormError(this.name, err);
          this.submitError(err);
        });
    }
  }

  public render(): JSX.Element {
    return (
      <slot />
    );
  }
}
