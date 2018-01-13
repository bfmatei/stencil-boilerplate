import {
  Component,
  Element,
  Prop
} from '@stencil/core';

import {
  toggleClassNames
} from '../../../helpers/className';

@Component({
  tag: 'app-loader',
  styleUrl: 'app-loader.scss'
})
export class AppLoader {
  @Prop()
  public active: boolean = false;

  @Prop()
  public size: 'small' | 'medium' | 'large' = 'small';

  @Element()
  private $element: HTMLElement;

  public render(): JSX.Element {
    toggleClassNames(this.$element, {
      spinner: true,
      [this.size]: true,
      active: this.active
    });

    return (
      <div class='spinnerWrapper'>
        <div class='rotator'>
          <div class='innerSpin' />
          <div class='innerSpin' />
        </div>
      </div>
    );
  }
}
