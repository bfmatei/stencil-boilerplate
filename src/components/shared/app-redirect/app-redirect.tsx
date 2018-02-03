import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  replace
} from '~orchestrators/connected-router/connected-router.actions';
import {
  GlobalStoreState
} from '~redux/store';

@Component({
  tag: 'app-redirect'
})
export class AppRedirect {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public url: string = '';

  @Prop()
  public from: string = '';

  @State()
  private pathname: string = '';

  private replace: typeof replace;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        router: {
          pathname
        }
      } = state;

      return {
        pathname
      };
    });

    this.store.mapDispatchToProps(this, {
      replace
    });
  }

  public componentDidLoad(): void {
    if (this.replace && this.url.length > 0 && this.pathname !== this.url) {
      this.replace(this.url, {
        from: this.from
      });
    }
  }
}
