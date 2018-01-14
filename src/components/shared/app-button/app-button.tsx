import {
  Component,
  Listen,
  Prop
} from '@stencil/core';

import noop from '../../../helpers/noop';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.scss'
})
export class AppButton {
  @Prop()
  public label: string = '';

  @Prop()
  public onClick: () => void = noop;

  @Prop()
  public disabled: boolean = false;

  @Listen('click')
  public clickHandler(): void {
    this.onClick();
  }

  public hostData(): JSXElements.AppButtonAttributes {
    return {
      class: {
        disabled: this.disabled
      }
    };
  }

  public render(): JSX.Element[] {
    return [
      <app-translate entry={this.label} />
    ];
  }
}
