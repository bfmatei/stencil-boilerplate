import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'app-loader',
  styleUrl: 'app-loader.pcss'
})
export class AppLoader {
  @Prop()
  public active: boolean = false;

  @Prop()
  public backgroundColor: 'white' | 'lighterMidnight' = 'white';

  @Prop()
  public size: 'small' | 'medium' | 'large' = 'small';

  public hostData(): JSXElements.AppLoaderAttributes {
    return {
      class: {
        [this.size]: true,
        [this.backgroundColor]: true,
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
