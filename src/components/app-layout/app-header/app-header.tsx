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
      <header>
        <h1>
          <translate-string entry='header.index' />
        </h1>
      </header>
    );
  }
}
