import {
  Component,
  Listen,
  Prop
} from '@stencil/core';

import {
  AppRichEditorMenuButtonActionWithValue,
  AppRichEditorMenuButtonConfig,
  AppRichEditorMenuItemConfig
} from './app-rich-editor-menu-item.interface';

@Component({
  tag: 'app-rich-editor-menu-item',
  styleUrl: 'app-rich-editor-menu-item.pcss'
})
export class AppRichEditorMenuItem {
  @Prop({
    context: 'window'
  })
  private window: Window;

  @Prop({
    context: 'document'
  })
  private document: Document;

  @Prop()
  public data: AppRichEditorMenuItemConfig;

  @Listen('mousedown')
  public buttonClickHandler(): void {
    switch (this.data.type) {
      case 'button':
        let actionName: string | AppRichEditorMenuButtonActionWithValue = this.data.action;

        let actionValue: string = '';

        if (typeof actionName !== 'string') {
          const action: AppRichEditorMenuButtonActionWithValue = this.data.action as AppRichEditorMenuButtonActionWithValue;

          actionName = action.name;
          actionValue = action.prompt ? this.window.prompt(action.value) || '' : `<${action.value.toUpperCase()}>`;
        }

        this.document.execCommand(actionName, true, actionValue);
        break;

      default:
    }
  }

  private renderButton(): JSX.Element {
    return (
      <app-icon name={(this.data as AppRichEditorMenuButtonConfig).icon} />
    );
  }

  private renderSeparator(): null {
    return null;
  }

  public hostData(): JSXElements.AppRichEditorMenuItemAttributes {
    return {
      class: {
        [this.data.type]: true
      }
    };
  }

  public render(): null | JSX.Element {
    switch (this.data.type) {
      case 'button':
        return this.renderButton();

      case 'separator':
        return this.renderSeparator();

      default:
        return null;
    }
  }
}
