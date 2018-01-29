import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  ConnectedRouterState
} from '../../../orchestrators/connected-router/connected-router.reducer';
import {
  GlobalStoreState
} from '../../../redux/store';

@Component({
  tag: 'app-route'
})
export class AppRoute {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public url: string = '';

  @Prop()
  public component: string = '';

  @Prop()
  public componentProps: any = {};

  @Prop()
  public checkAuthorization: boolean = false;

  @Prop()
  public role: string = '';

  @Prop()
  public redirectUrl: string = '';

  @Prop()
  public redirectComponent: string = '';

  @Prop()
  public redirectComponentProps: any = {};

  @Prop()
  public exact: boolean = false;

  @State()
  public router: ConnectedRouterState;

  @State()
  public userId: number;

  @State()
  public userRole: string;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        router,
        user: {
          id,
          role
        }
      } = state;

      return {
        router,
        userId: id,
        userRole: role
      };
    });
  }

  private checkAccess(): boolean {
    return this.isLoggedIn() && (this.role.length > 0 ? this.checkRole() : true);
  }

  private isLoggedIn(): boolean {
    return this.userId !== null;
  }

  private checkRole(): boolean {
    return this.userRole === this.role;
  }

  public render(): JSX.Element {
    let component: string = this.component;
    let componentProps: any = this.componentProps;

    if (this.checkAuthorization && !this.checkAccess()) {
      if (this.redirectComponent.length > 0) {
        component = this.redirectComponent;
        componentProps = this.redirectComponentProps;
      } else {
        component = 'app-redirect';

        componentProps = {
          url: '/login',
          from: this.router.pathname
        };

        if (this.redirectUrl.length > 0) {
          componentProps.url = this.redirectUrl;
        }
      }
    }

    return (
      <stencil-route url={this.url} component={component} componentProps={componentProps} exact={this.exact} />
    );
  }
}
