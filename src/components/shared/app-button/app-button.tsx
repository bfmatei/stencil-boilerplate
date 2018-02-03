import {
  Component,
  Listen,
  Prop
} from '@stencil/core';

import noop from '~helpers/noop';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.scss'
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

  @Listen('click')
  public clickHandler(evt: UIEvent): void {
    evt.preventDefault();

    this.onClick(evt);
  }

  public hostData(): JSXElements.AppButtonAttributes {
    return {
      class: {
        disabled: this.disabled || this.loading,
        loading: this.loading
      }
    };
  }

  public render(): JSX.Element | JSX.Element[] {
    if (this.loading) {
      return (
        <app-loader backgroundColor='lighterMidnight' active={true} />
      );
    }

    return [
      this.icon ? <app-icon name={this.icon} /> : null,
      <app-translate entry={this.label} />
    ];
  }
}
