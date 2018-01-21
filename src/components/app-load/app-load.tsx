import {
  Component,
  Prop,
  State
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

  @Prop({
    context: 'isServer'
  })
  private isServer: boolean;

  @State()
  private isLoading: boolean = true;

  public componentWillLoad(): void {
    if (!this.isServer && 'serviceWorker' in this.window.navigator) {
      console.log('registering service worker pending');

      this.window.navigator.serviceWorker.ready
        .then(() => {
          console.log('service worker is ready!');
          this.isLoading = false;
        })
        .catch(() => {
          console.log('service worker is not ready!');
          this.isLoading = false;
        });
    }
  }

  public componentDidLoad(): void {
    if (!this.isServer && 'serviceWorker' in this.window.navigator) {
      if (this.window.navigator.serviceWorker.controller !== null) {
        console.log('service worker controller is not null!');
        this.isLoading = false;
      }
    }
  }

  public render(): JSX.Element {
    if (this.isServer || this.isLoading) {
      return (
        <app-splash active={true} />
      );
    }

    return (
      <stencil-router>
        <stencil-route url='/' component='app-main' />
      </stencil-router>
    );
  }
}
