import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-project-edit',
  styleUrl: 'app-project-edit.pcss'
})
export class AppProjectEdit {
  public render(): JSX.Element {
    return (
      <app-translate entry='projects.projectEdit.index' />
    );
  }
}
