import { Component, Listen } from '@stencil/core';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.pcss'
})
export class AppDashboard {
  @Listen('buttonClicked')
  protected buttonClickedHandler(): void {
    console.log('button was clicked');
  }

  public render(): JSX.Element[] {
    return [
      (
        <app-translate entry='dashboard.index' />
      ),
      (
        <app-dashboard-child />
      )
    ];
  }
}
