import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../decorators/autobind';
import {
  push
} from '../../orchestrators/connected-router/connected-router.actions';
import {
  resetUser
} from '../../orchestrators/user/user.actions';
import {
  GlobalStoreState
} from '../../redux/store';

import {
  closeMenu
} from './app-menu.actions';

@Component({
  tag: 'app-menu',
  styleUrl: 'app-menu.scss'
})
export class AppMenu {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @State()
  public visible: boolean = false;

  private push: typeof push;
  private closeMenu: typeof closeMenu;
  private resetUser: typeof resetUser;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        menu: {
          visible
        }
      } = state;

      return {
        visible
      };
    });

    this.store.mapDispatchToProps(this, {
      push,
      closeMenu,
      resetUser
    });
  }

  private menuItemNavClickHandlerBinder(route: string): any {
    return (evt: UIEvent): void => {
      evt.stopImmediatePropagation();

      this.push(route);
    };
  }

  @autobind
  private menuItemLogoutClickHandler(): void {
    this.resetUser();
  }

  private renderMenuItem(label: string, iconName: string, clickHandler: any): JSX.Element {
    return (
      <button
        class='item'
        onClick={clickHandler}
      >
        <app-icon name={iconName} class='icon' />
        <app-translate entry={`menu.${label}`} />
      </button>
    );
  }

  @autobind
  private overlayClickHandler(): void {
    this.closeMenu();
  }

  public hostData(): JSXElements.AppMenuAttributes {
    return {
      class: {
        visible: this.visible
      }
    };
  }

  public render(): JSX.Element[] {
    return [
      (
        <nav class='container'>
          {this.renderMenuItem('dashboard', 'dashboard', this.menuItemNavClickHandlerBinder('/dashboard'))}
          {this.renderMenuItem('projects', 'projects', this.menuItemNavClickHandlerBinder('/projects'))}
          {this.renderMenuItem('logout', 'logout', this.menuItemLogoutClickHandler)}
        </nav>
      ),
      (
        <div
          class='overlay'
          onClick={this.overlayClickHandler}
        />
      )
    ];
  }
}
