import locales from '~locales/locales';
import {
  LocalesMap
} from '~locales/locales.interface';

import {
  I18nActions,
  I18nActionTypes
} from './i18n.actions';

export type I18nState = LocalesMap;

export function getInitialState(): I18nState {
  return {
    ...locales.en
  };
}

export default function i18n(state: I18nState = getInitialState(), action: I18nActionTypes): I18nState {
  switch (action.type) {
    case I18nActions.UPDATE_ENTRIES: {
      return {
        ...action.payload
      };
    }

    default:
      return state;
  }
}
