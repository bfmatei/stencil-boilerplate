import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  calculateClassNames
} from '../../helpers/className';
import {
  GlobalStoreState
} from '../../redux/store';

/**
 * AppPrivateModule is a wrapper component for private modules.
 *
 * Responsabilities:
 *   - Defines the CSS structure
 *   - Load the main modules routes
 */
@Component({
  tag: 'app-private-module',
  styleUrl: 'app-private-module.scss'
})
export class AppPrivateModule {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @State()
  private menuVisible: boolean = false;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        menu: {
          visible
        }
      } = state;

      return {
        menuVisible: visible
      };
    });
  }

  public render(): JSX.Element[] {
    const containerClassNames: string = calculateClassNames({
      'content-container': true,
      shrinked: this.menuVisible
    });

    return [
      <app-header class='header-container' />,
      <app-menu class='menu-container' />,
      (
        <section class={containerClassNames}>
          <app-route url='/dashboard' component='app-dashboard' />
          <app-route url='/projects' component='app-projects' />
        </section>
      )
    ];
  }
}
