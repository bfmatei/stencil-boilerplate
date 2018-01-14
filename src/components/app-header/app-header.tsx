import {
  Component,
  Prop
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../decorators/autobind';
import {
  toggleMenu
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

  private toggleMenu: typeof toggleMenu;

  public componentWillLoad(): void {
    this.store.mapDispatchToProps(this, {
      toggleMenu
    });
  }

  @autobind
  private menuClickHandler(): void {
    this.toggleMenu();
  }

  public render(): JSX.Element[] {
    return [
      <app-icon name='menu' class='button menu' onClick={this.menuClickHandler} />
    ];
  }
}
