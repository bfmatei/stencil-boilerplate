import {
  Component
} from '@stencil/core';

@Component({
  tag: 'main-app',
  styleUrl: 'main-app.scss'
})
export class MainApp {
  public render(): JSX.Element[] {
    return [
      <svg-icons />,
      <stencil-router>
        <stencil-route url='/' component='connected-router' />
      </stencil-router>
    ];
  }
}
