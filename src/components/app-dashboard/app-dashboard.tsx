import {
  Component,
  Prop
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  GlobalStoreState
} from '../../redux/store';

import {
  setText
} from './app-dashboard.actions';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.scss'
})
export class AppDashboard {
  @Prop({
    context: 'store'
  })
  private store: Store;

  private setText: typeof setText;

  private defaultValue: string = '';

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        dashboard: {
          text
        }
      } = state;

      return {
        defaultValue: text
      };
    });

    this.store.mapDispatchToProps(this, {
      setText
    });
  }

  public render(): JSX.Element {
    return (
      <app-rich-editor
        id='test'
        label='dashboard.richEditorLabel'
        defaultValue={this.defaultValue}
        onValueChange={this.setText}
      />
    );
  }
}
