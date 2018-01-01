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
  I18nObject
} from '../../../orchestrators/i18n/i18n.interface';
import {
  GlobalStoreState
} from '../../../redux/store';

@Component({
  tag: 'translate-string'
})
export class TranslateString {
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

      const path: string[] = this.entry.split('.');

      const translation: string =
        Object.keys(i18n).length > 0 ?
          path.reduce((accumulator: I18nObject | string, item: string) => {
            return accumulator[item];
          }, i18n || {}) :
          '';

      return {
        translation
      };
    });
  }

  @autobind
  private fillValues(key: string): string {
    const parsedKey: string = key.substring(1, key.length - 1);

    return (this.values[parsedKey] || 'undefined').toString();
  }

  public render(): string {
    return this.translation.replace(/{\w+}/g, this.fillValues);
  }
}
