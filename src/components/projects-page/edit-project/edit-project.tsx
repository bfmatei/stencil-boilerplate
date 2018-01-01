import {
  Component
} from '@stencil/core';

@Component({
  tag: 'edit-project',
  styleUrl: 'edit-project.scss'
})
export class EditProject {
  public render(): JSX.Element {
    return (
      <section>
        <translate-string entry='projectsPage.editProjectPage.index' />
      </section>
    );
  }
}
