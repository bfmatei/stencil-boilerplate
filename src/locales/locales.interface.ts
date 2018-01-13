import {
  I18nObject
} from '../orchestrators/i18n/i18n.interface';

export interface LocalesMap extends I18nObject {
  menu: {
    dashboard: string;
    projects: string;
    logout: string;
  };
  dashboard: {
    index: string;
    richEditorLabel: string;
  };
  login: {
    username: string;
    password: string;
    signIn: string;
    errors: {
      wrongUsername: string;
      wrongPassword: string;
    };
  };
  projects: {
    projectsList: {
      index: string;
    };
    projectNew: {
      index: string;
    };
    projectView: {
      index: string;
    };
    projectEdit: {
      index: string;
    };
  };
}

export interface LocalesCollection {
  en: LocalesMap;
}
