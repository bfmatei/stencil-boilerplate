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
      <app-route url='/projects/list' component='app-projects-list' />,
      <app-route url='/projects/new' component='app-project-new' />,
      <app-route url='/projects/view/:id' component='app-project-view' />,
      <app-route url='/projects/edit/:id' component='app-project-edit' />
    ];
  }
}
