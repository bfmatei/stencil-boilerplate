import {
  Component,
  Element,
  Prop
} from '@stencil/core';

import autobind from '../../../decorators/autobind';
import noop from '../../../helpers/noop';

@Component({
  tag: 'app-text-input',
  styleUrl: 'app-text-input.scss'
})
export class AppTextInput {
  @Prop()
  public name: string = '';

  @Prop()
  public label: string = '';

  @Prop()
  public type: 'text' | 'password' = 'text';

  @Prop()
  public error: string = '';

  @Prop()
  public defaultValue: string = '';

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public onValueChange: (value: string) => void = noop;

  @Element()
  private $element: HTMLElement;

  private focused: boolean = false;
  private internalValue: string = '';

  public componentWillLoad(): void {
    this.internalValue = this.defaultValue;
  }

  private setActiveClass(cond: boolean): void {
    if (cond) {
      this.$element.classList.add('active');
    } else {
      this.$element.classList.remove('active');
    }
  }

  private renderLabel(): JSX.Element {
    return (
      <label class='label' htmlFor={this.name}>
        <app-translate entry={this.label} />
      </label>
    );
  }

  @autobind
  private inputFocusHandler(): void {
    this.focused = true;

    this.setActiveClass(true);
  }

  @autobind
  private inputBlurHandler(): void {
    this.focused = false;

    this.setActiveClass(this.internalValue.length > 0);
  }

  @autobind
  private inputChangeHandler(evt: KeyboardEvent): void {
    this.internalValue = (evt.currentTarget as HTMLInputElement).value;

    this.onValueChange(this.internalValue);
  }

  private renderInput(): JSX.Element {
    return (
      <input
        name={this.name}
        onFocus={this.inputFocusHandler}
        onBlur={this.inputBlurHandler}
        onInput={this.inputChangeHandler}
        class='input'
        type={this.type}
        value={this.defaultValue}
        disabled={this.disabled}
      />
    );
  }

  private renderErrorBox(): JSX.Element {
    if (this.error.length === 0) {
      return null;
    }

    return (
      <app-translate class='error-container' entry={this.error} />
    );
  }

  public hostData(): JSXElements.AppTextInputAttributes {
    return {
      class: {
        active: this.internalValue.length > 0 || this.focused,
        error: this.error.length > 0
      }
    };
  }

  public render(): JSX.Element[] {
    return [
      this.renderLabel(),
      this.renderInput(),
      this.renderErrorBox()
    ];
  }
}
