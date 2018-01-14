import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

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
  public componentProps: {} = {};

  @Prop()
  public checkAuthorization: boolean = false;

  @Prop()
  public role: string = '';

  @Prop()
  public exact: boolean = false;

  @State()
  public userId: number = null;

  @State()
  public userRole: string = null;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        user: {
          id,
          role
        }
      } = state;

      return {
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
    let componentProps: {} = this.componentProps;

    if (this.checkAuthorization && !this.checkAccess()) {
      component = 'app-redirect';

      componentProps = {
        url: '/login'
      };
    }

    return (
      <stencil-route url={this.url} component={component} componentProps={componentProps} exact={this.exact} />
    );
  }
}
