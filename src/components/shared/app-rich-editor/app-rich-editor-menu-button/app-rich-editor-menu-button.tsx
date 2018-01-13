import {
  Component,
  Listen,
  Prop
} from '@stencil/core';

import {
  AppRichEditorMenuButtonAction,
  AppRichEditorMenuButtonActionWithValue
} from './app-rich-editor-menu-button.interface';

@Component({
  tag: 'app-rich-editor-menu-button',
  styleUrl: 'app-rich-editor-menu-button.scss'
})
export class AppRichEditorMenuButton {
  @Prop()
  public richEditorId: string;

  @Prop()
  public label: string;

  @Prop()
  public icon: string;

  @Prop()
  public action: AppRichEditorMenuButtonAction | AppRichEditorMenuButtonActionWithValue;

  @Listen('mousedown')
  public buttonClickHandler(evt: MouseEvent): void {
    evt.preventDefault();

    let actionName: string | AppRichEditorMenuButtonActionWithValue = this.action;
    let actionValue: string = null;

    if (typeof actionName !== 'string') {
      const action: AppRichEditorMenuButtonActionWithValue = this.action as AppRichEditorMenuButtonActionWithValue;

      actionName = action.name;
      actionValue = action.prompt ? window.prompt(action.value) : `<${action.value.toUpperCase()}>`;
    }

    document.execCommand(actionName, true, actionValue);
  }

  public hostData(): JSXElements.AppRichEditorMenuButtonAttributes {
    return {
      richEditorId: this.richEditorId
    };
  }

  public render(): JSX.Element {
    return (
      <app-icon name={this.icon} />
    );
  }
}
