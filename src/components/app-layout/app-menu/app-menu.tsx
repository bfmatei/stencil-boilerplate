import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-menu',
  styleUrl: 'app-menu.scss'
})
export class AppMenu {
  public render(): JSX.Element {
    return (
      <aside>
        <translate-string entry='menu.index' />
      </aside>
    );
  }
}
