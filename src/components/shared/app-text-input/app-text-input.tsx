import {
  Component,
  Element,
  Prop,
  PropWillChange,
  State
} from '@stencil/core';

import autobind from '../../../decorators/autobind';
import {
  toggleClassNames
} from '../../../helpers/className';

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
  public type: 'text' | 'password';

  @Prop()
  public error: string = '';

  @Prop()
  public value: string;

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public onValueChange: (value: string) => void;

  @State()
  private internalValue: string = '';

  @State()
  private focused: boolean = false;

  @State()
  private activeClass: boolean = false;

  @Element()
  private $element: HTMLElement;

  private renderLabel(): JSX.Element {
    return (
      <label class='label' htmlFor={this.name}>
        <app-translate entry={this.label} />
      </label>
    );
  }

  @PropWillChange('value')
  public valueWillChange(newValue: string): void {
    this.internalValue = newValue;
    this.activeClass = this.focused || newValue.length > 0;
  }

  @autobind
  private inputFocusHandler(): void {
    this.focused = true;
    this.activeClass = true;
  }

  @autobind
  private inputBlurHandler(): void {
    this.focused = false;
    this.activeClass = this.internalValue.length > 0;
  }

  @autobind
  private inputChangeHandler(evt: UIEvent): void {
    const value: string = (evt.currentTarget as any).value;

    this.internalValue = value;
    this.activeClass = this.focused || value.length > 0;

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
        value={this.internalValue}
        disabled={this.disabled}
      />
    );
  }

  private renderErrorBox(): JSX.Element {
    if (this.error.length === 0) {
      return null;
    }

    return (
      <span class='error-container'>{this.error}</span>
    );
  }

  public render(): JSX.Element[] {
    toggleClassNames(this.$element, {
      active: this.activeClass,
      error: this.error.length > 0
    });

    return [
      this.renderLabel(),
      this.renderInput(),
      this.renderErrorBox()
    ];
  }
}
