import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-projects',
  styleUrl: 'app-projects.scss'
})
export class AppProjects {
  public render(): JSX.Element[] {
    return [
      <app-route
        url='/projects'
        exact={true}
        component='app-redirect'
        componentProps={{
          url: '/projects/list'
        }}
      />,
      <app-route url='/projects/list' component='list-projects' />,
      <app-route url='/projects/new' component='new-project' />,
      <app-route url='/projects/view/:id' component='view-project' />,
      <app-route url='/projects/edit/:id' component='edit-project' />
    ];
  }
}
