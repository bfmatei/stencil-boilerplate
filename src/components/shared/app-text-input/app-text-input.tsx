import {
  Component,
  Element,
  Prop,
  PropDidChange,
  State
} from '@stencil/core';

import autobind from '../../../decorators/autobind';

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
  public value: string = '';

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public onValueChange: (value: string) => void;

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

  @PropDidChange('value')
  public valueWillChange(newValue: string): void {
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
    this.activeClass = this.value.length > 0;
  }

  @autobind
  private inputChangeHandler(evt: UIEvent): void {
    const value: string = (evt.currentTarget as any).value;

    this.activeClass = this.focused || value.length > 0;

    this.onValueChange(value);
  }

  private renderInput(): JSX.Element {
    return (
      <input
        onFocus={this.inputFocusHandler}
        onBlur={this.inputBlurHandler}
        onChange={this.inputChangeHandler}
        class='input'
        type={this.type}
        value={this.value}
        disabled={this.disabled}
      />
    );
  }

  private renderErrorBox(): JSX.Element {
    if (this.error.length === 0) {
      return null;
    }

    return (
      <span class='error'>{this.error}</span>
    );
  }

  private setContainerClasses(): void {
    if (this.activeClass) {
      this.$element.classList.add('active');
    } else {
      this.$element.classList.remove('active');
    }

    if (this.error.length > 0) {
      this.$element.classList.add('error');
    } else {
      this.$element.classList.remove('error');
    }
  }

  public render(): JSX.Element[] {
    this.setContainerClasses();

    return [
      this.renderLabel(),
      this.renderInput(),
      this.renderErrorBox()
    ];
  }
}
