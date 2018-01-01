import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {
  public render(): JSX.Element {
    return (
      <svg-icon name='menu' class='menuButton' />
    );
  }
}
