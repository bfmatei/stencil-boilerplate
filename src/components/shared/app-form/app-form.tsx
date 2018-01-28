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

import noop from '../../../helpers/noop';
import {
  registerForm
} from '../../../orchestrators/connected-forms/connected-forms.actions';
import {
  ConnectedForm
} from '../../../orchestrators/connected-forms/connected-forms.interface';
import {
  GlobalStoreState
} from '../../../redux/store';

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
  public onSubmit: () => void = noop;

  @Prop()
  public onSubmitSuccess: () => void = noop;

  @Prop()
  public onSubmitError: () => void = noop;

  @State()
  public reduxState: ConnectedForm;

  private registerForm: typeof registerForm;

  private internalFields: any[] = [];

  private submits: any[] = [];

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
      registerForm
    });
  }

  public componentDidLoad(): void {
    this.registerForm(this.name);

    this.internalFields.forEach((field: any) => {
      field.register(this.name);
    });
  }

  @Watch('reduxState')
  public pendingChangeHandler(newValue: ConnectedForm, oldValue: ConnectedForm): void {
    if (newValue && oldValue) {
      if (oldValue.submitting !== newValue.submitting) {
        if (newValue.submitting === true) {
          this.onSubmit();
        }
      } else {
        if (oldValue.success !== newValue.success) {
          if (newValue.success === true) {
            this.onSubmitSuccess();
          }
        }

        if (oldValue.error !== newValue.error) {
          if (newValue.error === true) {
            this.onSubmitError();
          }
        }
      }
    }
  }

  @Method()
  public registerField(field: any): void {
    this.internalFields = [
      ...this.internalFields,
      field
    ];
  }

  @Method()
  public registerSubmit(submit: any): void {
    this.submits = [
      ...this.submits,
      submit
    ];
  }

  public render(): JSX.Element {
    return (
      <slot />
    );
  }
}
