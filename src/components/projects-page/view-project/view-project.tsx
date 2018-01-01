import {
  Component
} from '@stencil/core';

@Component({
  tag: 'view-project',
  styleUrl: 'view-project.scss'
})
export class ViewProject {
  public render(): JSX.Element {
    return (
      <section>
        <translate-string entry='projectsPage.viewProjectPage.index' />
      </section>
    );
  }
}
