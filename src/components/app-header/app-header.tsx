import {
  Component,
  Prop
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../decorators/autobind';
import {
  openMenu
} from '../app-menu/app-menu.actions';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {
  @Prop({
    context: 'store'
  })
  private store: Store;

  private openMenu: typeof openMenu;

  public componentWillLoad(): void {
    this.store.mapDispatchToProps(this, {
      openMenu
    });
  }

  @autobind
  private menuClickHandler(): void {
    this.openMenu();
  }

  public render(): JSX.Element {
    return (
      <app-icon name='menu' class='menu-button' onClick={this.menuClickHandler} />
    );
  }
}
