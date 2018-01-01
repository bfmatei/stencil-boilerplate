import {
  Component
} from '@stencil/core';

@Component({
  tag: 'list-projects',
  styleUrl: 'list-projects.scss'
})
export class ListProjects {
  public render(): JSX.Element {
    return (
      <section>
        <translate-string entry='projectsPage.listProjectsPage.index' />
      </section>
    );
  }
}
