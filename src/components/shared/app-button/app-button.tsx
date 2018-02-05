import {
  Component,
  Listen,
  Prop
} from '@stencil/core';

import noop from '../../../helpers/noop';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.pcss'
})
export class AppButton {
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

  @Prop()
  public swap: boolean = false;

  @Prop()
  public center: boolean = false;

  @Prop()
  public full: boolean = false;

  @Listen('click')
  protected clickHandler(evt: UIEvent): void {
    evt.preventDefault();

    this.onClick(evt);
  }

  protected hostData(): JSXElements.AppButtonAttributes {
    return {
      class: {
        disabled: this.disabled || this.loading,
        loading: this.loading,
        swap: this.swap,
        center: this.center,
        full: this.full
      }
    };
  }

  private renderIcon(): JSX.Element {
    if (!this.icon) {
      return null;
    }

    return (
      <app-icon class='icon' name={this.icon} />
    );
  }

  private renderLabel(): JSX.Element {
    return (
      <app-translate class='label' entry={this.label} />
    );
  }

  protected render(): JSX.Element | JSX.Element[] {
    if (this.loading) {
      return (
        <app-loader backgroundColor='lighterMidnight' active={true} />
      );
    }

    return [
      this.renderIcon(),
      this.renderLabel()
    ];
  }
}
