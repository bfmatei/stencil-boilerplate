import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'app-loader',
  styleUrl: 'app-loader.scss'
})
export class AppLoader {
  @Prop()
  public active: boolean = false;

  @Prop()
  public size: 'small' | 'medium' | 'large' = 'small';

  public hostData(): JSXElements.AppLoaderAttributes {
    return {
      class: {
        [this.size]: true,
        active: this.active
      }
    };
  }

  public render(): JSX.Element {
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
