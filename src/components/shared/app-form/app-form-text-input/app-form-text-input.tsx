import {
  Component,
  Element,
  Method,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../../../decorators/autobind';
import {
  registerField,
  setFieldValue
} from '../../../../orchestrators/connected-forms/connected-forms.actions';
import {
  ConnectedForm,
  ConnectedFormField
} from '../../../../orchestrators/connected-forms/connected-forms.interface';
import {
  GlobalStoreState
} from '../../../../redux/store';

@Component({
  tag: 'app-form-text-input'
})
export class AppFormTextInput {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public name: string = '';

  @Prop()
  public label: string = '';

  @Prop()
  public type: 'text' | 'password' = 'text';

  @Prop()
  public message: string = '';

  @Prop()
  public defaultValue: string = '';

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public hasError: boolean = false;

  @State()
  public reduxState: ConnectedFormField;

  @State()
  public submitting: boolean;

  @Element()
  private $element: HTMLAppFormTextInputElement;

  private registerField: typeof registerField;
  private setFieldValue: typeof setFieldValue;

  private formName: string;

  public fieldSelector(form: ConnectedForm, fieldName: string): ConnectedFormField {
    return form && form.fields[fieldName] ? form.fields[fieldName] : {
      name: fieldName,
      disabled: this.disabled,
      error: this.hasError,
      value: this.defaultValue,
      message: this.message
    };
  }

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        forms
      } = state;

      return {
        reduxState: this.fieldSelector(forms[this.formName], this.name),
        submitting: forms[this.formName] ? forms[this.formName].submitting : false
      };
    });

    this.store.mapDispatchToProps(this, {
      registerField,
      setFieldValue
    });

    (this.$element.closest('app-form') as HTMLAppFormElement).registerField(this.$element);
  }

  @Method()
  public register(formName: string): void {
    this.formName = formName;

    this.registerField(this.name, this.formName, {
      defaultValue: this.defaultValue,
      message: this.message,
      error: this.hasError
    });
  }

  @autobind
  private fieldValueChangeHandler(value: string): void {
    this.setFieldValue(this.name, value, this.formName);
  }

  public render(): JSX.Element {
    return (
      <app-text-input
        name={this.name}
        label={this.label}
        type={this.type}
        message={this.message}
        value={this.reduxState.value}
        disabled={this.reduxState.disabled || this.submitting}
        hasError={this.hasError}
        onValueChange={this.fieldValueChangeHandler}
      />
    );
  }
}
