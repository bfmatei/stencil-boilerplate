import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'app-splash',
  styleUrl: 'app-splash.pcss'
})
export class AppSplash {
  @Prop()
  public active: boolean = false;

  public render(): null | JSX.Element {
    if (!this.active) {
      return null;
    }

    return [
      (
        <app-logo class='logo' />
      ),
      (
        <app-loader class='loader' active={true} size='large' />
      )
    ];
  }
}
