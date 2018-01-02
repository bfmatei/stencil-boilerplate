import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  fillTranslationValues,
  reduceTranslations
} from '../../../orchestrators/i18n/i18n.helpers';
import {
  GlobalStoreState
} from '../../../redux/store';

@Component({
  tag: 'app-translate'
})
export class AppTranslate {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  private entry: string = '';

  @Prop()
  private values: {} = {};

  @State()
  private translation: string = '';

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        i18n
      } = state;

      return {
        translation: reduceTranslations(i18n, this.entry)
      };
    });
  }

  public render(): string {
    return fillTranslationValues(this.translation, this.values);
  }
}
