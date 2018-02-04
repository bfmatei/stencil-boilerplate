import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.pcss'
})
export class AppDashboard {
  public render(): JSX.Element {
    return (
      <app-translate entry='dashboard.index' />
    );
  }
}
