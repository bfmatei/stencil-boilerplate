import {
  Component,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  push
} from '../../../orchestrators/connected-router/connected-router.actions';

import {
  fillTranslationValues,
  reduceTranslations
} from '../../../orchestrators/i18n/i18n.helpers';
import {
  I18nState
} from '../../../orchestrators/i18n/i18n.reducer';
import {
  GlobalStoreState
} from '../../../redux/store';

@Component({
  tag: 'app-translate',
  styleUrl: 'app-translate.scss'
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

  @Prop()
  public url: string = '';

  @State()
  public translations: I18nState;

  @State()
  private translation: string = '';

  private push: typeof push;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        i18n
      } = state;

      return {
        translations: i18n,
        translation: reduceTranslations(i18n, this.entry)
      };
    });

    this.store.mapDispatchToProps(this, {
      push
    });
  }

  @Watch('entry')
  public entryChangeHandler(newValue: string): void {
    this.translation = reduceTranslations(this.translations, newValue) as string;
  }


  @Listen('click')
  public elementClickHandler(): void {
    if (this.url.length > 0) {
      this.push(this.url);
    }
  }

  public hostData(): JSXElements.AppTranslateAttributes {
    return {
      class: {
        link: this.url.length > 0
      }
    };
  }

  public render(): string {
    return fillTranslationValues(this.translation, this.values);
  }
}
