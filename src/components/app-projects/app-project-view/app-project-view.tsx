import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-project-view',
  styleUrl: 'app-project-view.pcss'
})
export class AppProjectView {
  public render(): JSX.Element {
    return (
      <app-translate entry='projects.projectView.index' />
    );
  }
}
