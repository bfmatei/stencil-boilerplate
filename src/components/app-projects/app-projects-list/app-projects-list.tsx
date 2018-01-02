import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-projects-list',
  styleUrl: 'app-projects-list.scss'
})
export class AppProjectsList {
  public render(): JSX.Element {
    return (
      <app-translate entry='projects.projectsList.index' />
    );
  }
}
