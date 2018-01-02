import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-project-new',
  styleUrl: 'app-project-new.scss'
})
export class AppProjectNew {
  public render(): JSX.Element {
    return (
      <app-translate entry='projects.projectNew.index' />
    );
  }
}
