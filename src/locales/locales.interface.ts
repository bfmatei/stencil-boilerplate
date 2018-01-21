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
  };
  login: {
    username: string;
    password: string;
    signIn: string;
    tryUsername: string;
    tryPassword: string;
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
  richEditor: {
    bold: string;
    italic: string;
    underline: string;
    strikeThrough: string;
    alignJustify: string;
    alignLeft: string;
    alignCenter: string;
    alignRight: string;
    orderedList: string;
    unorderedList: string;
    horizontalRule: string;
    link: string;
    linkUrl: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    blockquote: string;
    codeBlock: string;
  };
}

export interface LocalesCollection {
  en: LocalesMap;
}
