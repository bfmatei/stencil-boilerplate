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
      (
        <stencil-route
          url='/projects'
          exact={true}
          component='app-redirect'
          componentProps={{
            url: '/projects/list'
          }}
        />
      ),
      <stencil-route url='/projects/list' component='list-projects' />,
      <stencil-route url='/projects/new' component='new-project' />,
      <stencil-route url='/projects/view/:id' component='view-project' />,
      <stencil-route url='/projects/edit/:id' component='edit-project' />
    ];
  }
}
