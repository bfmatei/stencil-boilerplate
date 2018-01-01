import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-layout',
  styleUrl: 'app-layout.scss'
})
export class AppLayout {
  public render(): JSX.Element[] {
    return [
      <app-header />,
      <app-menu />,
      <enhanced-route url='/dashboard' component='dashboard-page' />,
      <enhanced-route url='/projects' component='projects-page' />
    ];
  }
}
