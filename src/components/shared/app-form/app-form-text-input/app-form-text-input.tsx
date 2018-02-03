import {
  Component,
  Element,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../../../decorators/autobind';
import {
  registerField,
  setFieldProp,
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
  public fieldType: 'text' | 'password' = 'text';

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
  private setFieldProp: typeof setFieldProp;

  private formName: string;

  @Watch('disabled')
  public disabledChangeHandler(newValue: boolean, oldValue: boolean): void {
    if (newValue !== oldValue) {
      this.setFieldProp(this.name, 'userDisabled', newValue, this.formName);
    }
  }

  @Watch('message')
  public messageChangeHandler(newValue: boolean, oldValue: boolean): void {
    if (newValue !== oldValue) {
      this.setFieldProp(this.name, 'userMessage', newValue, this.formName);
    }
  }

  @Watch('hasError')
  public hasErrorChangeHandler(newValue: boolean, oldValue: boolean): void {
    if (newValue !== oldValue) {
      this.setFieldProp(this.name, 'userError', newValue, this.formName);
    }
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
      setFieldValue,
      setFieldProp
    });

    (this.$element.closest('app-form') as HTMLAppFormElement).registerField(this.$element);
  }

  @Method()
  public register(formName: string): void {
    this.formName = formName;

    this.registerField(this.name, this.formName, {
      defaultValue: this.defaultValue,
      userDisabled: this.disabled,
      userMessage: this.message,
      userError: this.hasError
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
