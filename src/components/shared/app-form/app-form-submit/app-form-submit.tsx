import {
  Component,
  Element,
  Method,
  Prop,
  State
} from '@stencil/core';

import autobind from '../../../../decorators/autobind';
import noop from '../../../../helpers/noop';
import {
  ConnectedForm
} from '../../../../orchestrators/connected-forms/connected-forms.interface';

@Component({
  tag: 'app-form-submit'
})
export class AppFormSubmit {
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
  public reduxState: ConnectedForm = null;

  @Element()
  private $element: HTMLAppFormSubmitElement;

  private formSubmitClickHandler: () => void;

  public componentWillLoad(): void {
    // tslint:disable-next-line:no-unnecessary-type-assertion
    (this.$element.closest('app-form') as HTMLAppFormElement).registerSubmit(this.$element);
  }

  @Method()
  public register(reduxState: ConnectedForm, formSubmitClickHandler: () => void): void {
    this.reduxState = reduxState;
    this.formSubmitClickHandler = formSubmitClickHandler;
  }

  @autobind
  private submitClickHandler(evt: UIEvent): void {
    this.formSubmitClickHandler();

    this.onClick(evt);
  }

  public render(): JSX.Element {
    if (this.reduxState === null) {
      return null;
    }

    return (
      <app-button
        label={this.label}
        icon={this.icon}
        onClick={this.submitClickHandler}
        disabled={this.disabled || this.reduxState.error}
        loading={this.disabled || this.reduxState.submitting}
      />
    );
  }
}
