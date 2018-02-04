import {
  Component,
  Prop
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';
import {
  RouterHistory
} from '@stencil/router';

import {
  configureStore
} from '../../redux/store';

import {
  locationChange
} from '../../orchestrators/connected-router/connected-router.actions';

/**
 * AppMain is the true initializer of the app.
 *
 * Responsabilities:
 *   - Initialize the Redux store
 *   - Initialize the location listener for the Connected Router
 *   - Load the login route
 *   - Load the private module route
 */
@Component({
  tag: 'app-main',
  styleUrl: 'app-main.pcss'
})
export class AppMain {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  private history: RouterHistory = null;

  private locationChange: typeof locationChange;

  private unsubscribeFromHistory: () => void;

  public componentWillLoad(): void {
    this.store.setStore(configureStore(this.history));

    this.store.mapDispatchToProps(this, {
      locationChange
    });
  }

  public componentDidLoad(): void {
    this.locationChange(this.history.location);

    this.unsubscribeFromHistory = this.history.listen(this.locationChange);
  }

  public componentWillUnload(): void {
    if (this.unsubscribeFromHistory) {
      this.unsubscribeFromHistory();
    }
  }

  public render(): JSX.Element[] {
    return [
      <app-route url='/' component='app-private-module' checkAuthorization={true} redirectComponent='app-login' />
    ];
  }
}
