import {
  Component
} from '@stencil/core';

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
  public render(): JSX.Element[] {
    return [
      <app-header />,
      <app-menu />,
      <app-route url='/dashboard' component='app-dashboard' />,
      <app-route url='/projects' component='app-projects' />
    ];
  }
}
