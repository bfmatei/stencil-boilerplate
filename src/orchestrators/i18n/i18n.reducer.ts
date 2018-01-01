import locales from '../../locales';

import {
  I18nActions,
  I18nActionTypes
} from './i18n.actions';
import {
  I18nObject
} from './i18n.interface';

export type I18nState = I18nObject;

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
