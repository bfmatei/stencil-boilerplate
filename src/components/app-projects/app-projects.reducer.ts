import {
  ColumnAlign,
  ColumnData,
  ColumnTypes
} from '../shared/app-dynamic-table/app-dynamic-table.interface';

import {
  AppProjectsActions,
  AppProjectsActionTypes
} from './app-projects.actions';
import {
  ProjectData
} from './app-projects.interface';

export interface AppProjectsState {
  columns: ColumnData[];
  data: ProjectData[];
  pending: boolean;
}

export function getInitialState(): AppProjectsState {
  return {
    columns: [
      {
        id: 'index',
        dataKey: 'index',
        label: 'projects.projectsList.columns.index',
        type: ColumnTypes.INDEX
      },
      {
        id: 'id',
        label: 'projects.projectsList.columns.id',
        dataKey: 'id',
        width: '48px'
      },
      {
        id: 'name',
        label: 'projects.projectsList.columns.name',
        dataKey: 'name'
      },
      {
        id: 'description',
        label: 'projects.projectsList.columns.description',
        dataKey: 'description',
        type: ColumnTypes.RICH_TEXT
      },
      {
        id: 'buttons',
        type: ColumnTypes.BUTTONS,
        dataKey: 'buttons',
        label: '',
        width: '160px',
        align: ColumnAlign.RIGHT
      }
    ],
    data: [
      {
        id: 0,
        name: 'Project 1',
        description: ''
      },
      {
        id: 1,
        name: 'Project 2',
        description: ''
      },
      {
        id: 2,
        name: 'Project 3',
        description: ''
      },
      {
        id: 3,
        name: 'Project 2'
      },
      {
        id: 4,
        name: 'Project 1'
      },
      {
        id: 5,
        name: 'Project 2'
      },
      {
        id: 6,
        name: 'Project 3'
      },
      {
        id: 7,
        name: 'Project 2'
      },
      {
        id: 8,
        name: 'Project 1'
      },
      {
        id: 9,
        name: 'Project 2'
      },
      {
        id: 10,
        name: 'Project 3'
      },
      {
        id: 11,
        name: 'Project 2'
      },
      {
        id: 12,
        name: 'Project 1'
      },
      {
        id: 13,
        name: 'Project 2'
      },
      {
        id: 14,
        name: 'Project 3'
      },
      {
        id: 15,
        name: 'Project 2'
      }
    ],
    pending: false
  };
}

export default function projects(state: AppProjectsState = getInitialState(), action: AppProjectsActionTypes): AppProjectsState {
  switch (action.type) {
    case AppProjectsActions.DELETE_PROJECT: {
      return {
        ...state,
        data: state.data.filter((project: ProjectData) => {
          return project.id !== action.payload;
        })
      };
    }

    case AppProjectsActions.REFRESH_PROJECTS: {
      return {
        ...state,
        data: [
          {
            id: 0,
            name: 'Project 1'
          },
          {
            id: 1,
            name: 'Project 2'
          },
          {
            id: 2,
            name: 'Project 3'
          }
        ]
      };
    }

    default:
      return state;
  }
}
