import {
  Component,
  Prop
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  GlobalStoreState
} from '../../../redux/store';

@Component({
  tag: 'app-form'
})
export class AppForm {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public name: string = '';

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        forms
      } = state;

      return {
        forms
      };
    });
  }

  // public hostData(): JSXElements.AppFormAttributes {
  //   return {
  //     name: this.name
  //   };
  // }

  public render(): JSX.Element {
    return (
      <slot />
    );
  }
}
