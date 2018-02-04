import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../../decorators/autobind';
import {
  push
} from '../../../orchestrators/connected-router/connected-router.actions';
import {
  GlobalStoreState
} from '../../../redux/store';
import {
  deleteProject,
  refreshProjects
} from '../app-projects.actions';

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

  @autobind
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
          <div class='buttons-container'>
            <button class='button' onClick={this.refreshButtonClickHandler}>
              <app-icon name='refresh' class='icon' />
              <span class='label'>
                <app-translate entry='projects.projectsList.headerButtons.refresh' />
              </span>
            </button>
            <button class='button' onClick={this.addButtonClickHandler}>
              <app-icon name='add' class='icon' />
              <span class='label'>
                <app-translate entry='projects.projectsList.headerButtons.add' />
              </span>
            </button>
          </div>
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
