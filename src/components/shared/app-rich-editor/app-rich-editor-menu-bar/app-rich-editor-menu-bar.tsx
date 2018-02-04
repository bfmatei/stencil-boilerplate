import {
  Component,
  Prop
} from '@stencil/core';

import {
  AppRichEditorMenuItemConfig
} from '~components/shared/app-rich-editor/app-rich-editor-menu-item/app-rich-editor-menu-item.interface';
import autobind from '~decorators/autobind';

@Component({
  tag: 'app-rich-editor-menu-bar',
  styleUrl: 'app-rich-editor-menu-bar.pcss'
})
export class AppRichEditorMenuBar {
  @Prop()
  public buttons: AppRichEditorMenuItemConfig[] = [];

  @autobind
  private renderButton(button: AppRichEditorMenuItemConfig): JSX.Element {
    return (
      <app-rich-editor-menu-item data={button} />
    );
  }

  public render(): JSX.Element[] {
    return this.buttons.map(this.renderButton);
  }
}
