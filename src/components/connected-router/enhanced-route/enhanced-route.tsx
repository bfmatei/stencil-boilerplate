import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  UserData
} from '../../../orchestrators/user/user.interface';
import {
  GlobalStoreState
} from '../../../redux/store';

@Component({
  tag: 'enhanced-route'
})
export class EnhancedRoute {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public url: string;

  @Prop()
  public component: string;

  @Prop()
  public componentProps: {} = {};

  @Prop()
  public checkAuthorization: boolean;

  @Prop()
  public role: string = '';

  @Prop()
  public exact: boolean = false;

  @State()
  public user: UserData;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        user
      } = state;

      return {
        user
      };
    });
  }

  private checkAccess(): boolean {
    return this.isLoggedIn() && (this.role.length > 0 ? this.checkRole() : true);
  }

  private isLoggedIn(): boolean {
    return this.user.id !== null;
  }

  private checkRole(): boolean {
    return this.user.role === this.role;
  }

  public render(): JSX.Element {
    let component: string = this.component;
    let componentProps: {} = this.componentProps;

    if (this.checkAuthorization && !this.checkAccess()) {
      component = 'render-redirect';

      componentProps = {
        url: '/login'
      };
    }

    return (
      <stencil-route url={this.url} component={component} componentProps={componentProps} exact={this.exact} />
    );
  }
}
