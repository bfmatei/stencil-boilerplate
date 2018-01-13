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
  styleUrl: 'app-rich-editor-menu-item.scss'
})
export class AppRichEditorMenuItem {
  @Prop()
  public data: AppRichEditorMenuItemConfig;

  @Listen('mousedown')
  public buttonClickHandler(evt: MouseEvent): void {
    evt.preventDefault();

    switch (this.data.type) {
      case 'button':
        let actionName: string | AppRichEditorMenuButtonActionWithValue = this.data.action;
        let actionValue: string = null;

        if (typeof actionName !== 'string') {
          const action: AppRichEditorMenuButtonActionWithValue = this.data.action as AppRichEditorMenuButtonActionWithValue;

          actionName = action.name;
          actionValue = action.prompt ? window.prompt(action.value) : `<${action.value.toUpperCase()}>`;
        }

        document.execCommand(actionName, true, actionValue);
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

  public hostData(): any {
    return {
      class: {
        [this.data.type]: true
      }
    };
  }

  public render(): JSX.Element {
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
