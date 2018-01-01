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
} from './connected-router.actions';

@Component({
  tag: 'connected-router'
})
export class ConnectedRouter {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  private history: RouterHistory;

  private locationChange: typeof locationChange;

  private unsubscribeFromHistory: any;

  public componentWillLoad(): void {
    this.store.setStore(configureStore(this.history));

    this.store.mapDispatchToProps(this, {
      locationChange
    });
  }

  public componentDidLoad(): void {
    if (this.history) {
      this.locationChange(this.history.location);

      this.unsubscribeFromHistory = this.history.listen((location: any) => {
        this.locationChange(location);
      });
    }
  }

  public componentWillUnload(): void {
    if (this.unsubscribeFromHistory) {
      this.unsubscribeFromHistory();
    }
  }

  public render(): JSX.Element[] {
    return [
      <enhanced-route url='/login' component='login-page' />,
      <enhanced-route url='/' component='app-layout' checkAuthorization={true} />
    ];
  }
}
