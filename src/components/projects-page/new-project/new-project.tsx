import {
  Component
} from '@stencil/core';

@Component({
  tag: 'new-project',
  styleUrl: 'new-project.scss'
})
export class NewProject {
  public render(): JSX.Element {
    return (
      <section>
        <translate-string entry='projectsPage.newProjectPage.index' />
      </section>
    );
  }
}
