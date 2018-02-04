import {
  Component,
  Prop,
  State
} from '@stencil/core';

import autobind from '../../../decorators/autobind';
import noop from '../../../helpers/noop';

@Component({
  tag: 'app-text-input',
  styleUrl: 'app-text-input.pcss'
})
export class AppTextInput {
  @Prop()
  public name: string = '';

  @Prop()
  public label: string = '';

  @Prop()
  public fieldType: 'text' | 'password' = 'text';

  @Prop()
  public message: string = '';

  @Prop()
  public value: string = '';

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public hasError: boolean = false;

  @Prop()
  public onValueChange: (value: string) => void = noop;

  @State()
  private focused: boolean = false;

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
  }

  @autobind
  private inputBlurHandler(): void {
    this.focused = false;
  }

  @autobind
  private inputChangeHandler(evt: KeyboardEvent): void {
    this.onValueChange((evt.currentTarget as HTMLInputElement).value);
  }

  private renderInput(): JSX.Element {
    return (
      <input
        name={this.name}
        onFocus={this.inputFocusHandler}
        onBlur={this.inputBlurHandler}
        onInput={this.inputChangeHandler}
        class='input'
        type={this.fieldType}
        value={this.value}
        disabled={this.disabled}
      />
    );
  }

  private renderMessageBox(): JSX.Element {
    if (this.message.length === 0) {
      return null;
    }

    return (
      <app-translate class='message-container' entry={this.message} />
    );
  }

  public hostData(): JSXElements.AppTextInputAttributes {
    return {
      class: {
        active: this.value.length > 0 || this.focused,
        disabled: this.disabled,
        error: this.hasError
      }
    };
  }

  public render(): JSX.Element[] {
    return [
      this.renderLabel(),
      this.renderInput(),
      this.renderMessageBox()
    ];
  }
}
