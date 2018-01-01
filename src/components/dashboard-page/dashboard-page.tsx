import {
  Component
} from '@stencil/core';

@Component({
  tag: 'dashboard-page',
  styleUrl: 'dashboard-page.scss'
})
export class DashboardPage {
  public render(): JSX.Element {
    return (
      <section>
        <translate-string entry='dashboardPage.index' />
      </section>
    );
  }
}
