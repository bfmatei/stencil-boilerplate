import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';
import Bind from 'lodash-decorators/bind';

import {
  deleteProject,
  refreshProjects
} from '~components/app-projects/app-projects.actions';
import autobind from '~decorators/autobind';
import {
  push
} from '~orchestrators/connected-router/connected-router.actions';
import {
  GlobalStoreState
} from '~redux/store';

@Component({
  tag: 'app-projects-list',
  styleUrl: 'app-projects-list.pcss'
})
export class AppProjectsList {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public actions: any;

  @State()
  public projects: any;

  private refreshProjects: typeof refreshProjects;
  private deleteProject: typeof deleteProject;
  private push: typeof push;

  protected componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        projects
      } = state;

      return {
        projects
      };
    });

    this.store.mapDispatchToProps(this, {
      refreshProjects,
      deleteProject,
      push
    });
  }

  @Bind()
  private refreshButtonClickHandler(): void {
    this.refreshProjects();
  }

  @autobind
  private addButtonClickHandler(): void {
    this.push('/projects/add');
  }

  @autobind
  private viewButtonClickHandler(value: number): void {
    this.push(`/projects/view/${value}`);
  }

  @autobind
  private editButtonClickHandler(value: number): void {
    this.push(`/projects/edit/${value}`);
  }

  @autobind
  private deleteButtonClickHandler(value: number): void {
    this.deleteProject(value);
  }

  public render(): JSX.Element {
    const projectsData: any = this.projects.data.map((item: any) => {
      return {
        ...item,
        buttons: [
          {
            id: 'view',
            icon: 'view',
            value: item.id,
            onClick: this.viewButtonClickHandler
          },
          {
            id: 'edit',
            icon: 'edit',
            value: item.id,
            onClick: this.editButtonClickHandler
          },
          {
            id: 'delete',
            icon: 'delete',
            value: item.id,
            onClick: this.deleteButtonClickHandler
          }
        ]
      };
    });

    return [
      (
        <header class='header'>
          <h1 class='title'>
            <app-translate entry='projects.projectsList.index' />
          </h1>
          <app-button
            class='button refresh'
            onClick={this.refreshButtonClickHandler}
            icon='refresh'
            label='projects.projectsList.headerButtons.refresh'
          />
          <app-button
            class='button add'
            onClick={this.addButtonClickHandler}
            icon='add'
            label='projects.projectsList.headerButtons.add'
          />
        </header>
      ),
      (
        <app-dynamic-table
          columns={this.projects.columns}
          data={projectsData}
        />
      )
    ];
  }
}
