import {
  Component,
  Prop
} from '@stencil/core';

import autobind from '../../../../decorators/autobind';
import {
  AppRichEditorMenuButtonConfig
} from '../app-rich-editor-menu-button/app-rich-editor-menu-button.interface';

@Component({
  tag: 'app-rich-editor-menu-bar',
  styleUrl: 'app-rich-editor-menu-bar.scss'
})
export class AppRichEditorMenuBar {
  @Prop()
  public richEditorId: string;

  @Prop()
  public buttons: AppRichEditorMenuButtonConfig[] = [];

  @autobind
  private renderButton(button: AppRichEditorMenuButtonConfig): JSX.Element {
    const {
      label,
      icon,
      action
    } = button;

    return (
      <app-rich-editor-menu-button richEditorId={this.richEditorId} label={label} icon={icon} action={action} />
    );
  }

  public hostData(): JSXElements.AppRichEditorMenuBarAttributes {
    return {
      richEditorId: this.richEditorId
    };
  }

  public render(): JSX.Element[] {
    return this.buttons.map(this.renderButton);
  }
}
