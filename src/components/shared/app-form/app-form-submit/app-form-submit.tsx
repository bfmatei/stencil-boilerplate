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
import noop from '../../../../helpers/noop';
import {
  submitForm
} from '../../../../orchestrators/connected-forms/connected-forms.actions';
import {
  ConnectedForm
} from '../../../../orchestrators/connected-forms/connected-forms.interface';
import {
  GlobalStoreState
} from '../../../../redux/store';

@Component({
  tag: 'app-form-submit'
})
export class AppFormSubmit {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public label: string = '';

  @Prop()
  public icon: string = '';

  @Prop()
  public onClick: (evt: UIEvent) => void = noop;

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public loading: boolean = false;

  @State()
  public reduxState: ConnectedForm;

  @Element()
  private $element: HTMLAppFormTextInputElement;

  private submitForm: typeof submitForm;

  private formName: string;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        forms
      } = state;

      return {
        reduxState: forms[this.formName]
      };
    });

    this.store.mapDispatchToProps(this, {
      submitForm
    });

    (this.$element.closest('app-form') as HTMLAppFormElement).registerSubmit(this.$element);
  }

  @Method()
  public register(formName: string): void {
    this.formName = formName;
  }

  @autobind
  private submitClickHandler(evt: UIEvent): void {
    this.submitForm(this.formName);

    this.onClick(evt);
  }

  public render(): JSX.Element {
    const submitting: boolean = this.reduxState ? this.reduxState.submitting : false;

    return (
      <app-button
        label={this.label}
        icon={this.icon}
        onClick={this.submitClickHandler}
        disabled={this.disabled || submitting}
        loading={this.loading || submitting}
      />
    );
  }
}
