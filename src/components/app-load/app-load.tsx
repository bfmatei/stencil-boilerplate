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
  tag: 'app-load',
  styleUrl: 'app-load.pcss'
})
export class AppLoad {
  @Prop({
    context: 'window'
  })
  private window: Window;

  @State()
  private isLoading: boolean = true;

  public componentWillLoad(): void {
    if ('serviceWorker' in this.window.navigator) {
      this.window.navigator.serviceWorker.ready
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }

  public componentDidLoad(): void {
    if (!('serviceWorker' in this.window.navigator)) {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }

  public render(): JSX.Element {
    if (this.isLoading) {
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
