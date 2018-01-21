import {
  Component,
  Prop
} from '@stencil/core';

/**
 * AppLoad is a wrapper component which helps keeping the index.html file as clean as possible.
 *
 * Responsabilities:
 *   - Initialize the Stencil Router (there should be only one in the app)
 *   - Load the Connected (Redux) Router (there should be only in the app)
 */
@Component({
  tag: 'app-load'
})
export class AppLoad {
  @Prop({
    context: 'window'
  })
  private window: Window;

  public componentDidLoad(): void {
    this.window.navigator.serviceWorker.ready.then(() => {
      console.log('a');
    });
  }

  public render(): JSX.Element[] {
    return [
      <stencil-router>
        <stencil-route url='/' component='app-main' />
      </stencil-router>
    ];
  }
}
