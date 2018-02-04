import {
  Component,
  Prop,
  State
} from '@stencil/core';

import autobind from '../../../decorators/autobind';
import convertRichEditorToString from '../../../helpers/convertRichEditorToString';
import noop from '../../../helpers/noop';

import {
  alignCenterButton,
  alignJustifyButton,
  alignLeftButton,
  alignRightButton,
  blockquoteButton,
  boldButton,
  codeButton,
  heading1Button,
  heading2Button,
  heading3Button,
  heading4Button,
  heading5Button,
  heading6Button,
  horizontalLineButton,
  italicButton,
  linkButton,
  orderedListButton,
  separator,
  strikeThroughButton,
  underlineButton,
  unorderedListButton
} from './app-rich-editor-items';
import {
  AppRichEditorMenuItemConfig
} from './app-rich-editor-menu-item/app-rich-editor-menu-item.interface';

@Component({
  tag: 'app-rich-editor',
  styleUrl: 'app-rich-editor.pcss'
})
export class AppRichEditor {
  @Prop()
  public label: string = '';

  @Prop()
  public message: string = '';

  @Prop()
  public defaultValue: string = '';

  @Prop()
  public disabled: boolean = false;

  @Prop()
  public hasError: boolean = false;

  @Prop()
  public onValueChange: (newValue: string) => void = noop;

  @Prop()
  private toolbar1Items: AppRichEditorMenuItemConfig[] = [
    boldButton,
    italicButton,
    underlineButton,
    strikeThroughButton,
    separator,
    alignJustifyButton,
    alignLeftButton,
    alignCenterButton,
    alignRightButton,
    separator,
    orderedListButton,
    unorderedListButton,
    separator,
    horizontalLineButton,
    linkButton
  ];

  @Prop()
  private toolbar2Items: AppRichEditorMenuItemConfig[] = [
    heading1Button,
    heading2Button,
    heading3Button,
    heading4Button,
    heading5Button,
    heading6Button,
    separator,
    blockquoteButton,
    codeButton
  ];

  @State()
  private active: boolean = false;

  private $contentElement: HTMLElement = null;

  public isFocused: boolean = false;

  public textContent: string = '';

  @autobind
  private labelClickHandler(): void {
    this.$contentElement.focus();
  }

  private renderLabel(): JSX.Element {
    return (
      <app-rich-editor-label
        onClick={this.labelClickHandler}
        entry={this.label}
        class={this.active ? 'active' : ''}
      />
    );
  }

  private renderMenuBar(items: AppRichEditorMenuItemConfig[]): JSX.Element {
    return (
      <app-rich-editor-menu-bar
        buttons={items}
        class={this.active ? 'active' : ''}
      />
    );
  }

  @autobind
  private handleContentChange(newContent: string): void {
    this.textContent = convertRichEditorToString(newContent);

    if (this.textContent.length > 0 || this.isFocused) {
      this.active = true;
    }

    this.onValueChange(newContent);
  }

  @autobind
  private editorFocusHandler(): void {
    this.active = true;
  }

  @autobind
  private editorBlurHandler(): void {
    this.active = this.textContent.length > 0 ? true : false;
  }

  @autobind
  private storeEditorElementRefHandler($contentElement: HTMLElement): void {
    if (this.$contentElement === null) {
      this.$contentElement = $contentElement;

      this.$contentElement.innerHTML = this.defaultValue;
    }
  }

  private renderContent(): JSX.Element {
    return (
      <app-rich-editor-content
        storeElementRef={this.storeEditorElementRefHandler}
        onValueChange={this.handleContentChange}
        onFocus={this.editorFocusHandler}
        onBlur={this.editorBlurHandler}
        defaultValue={this.defaultValue}
        class={this.active ? 'active' : ''}
      />
    );
  }

  public render(): JSX.Element[] {
    return [
      this.renderLabel(),
      this.renderMenuBar(this.toolbar1Items),
      (
        this.toolbar2Items.length === 0 ?
          null :
          (
            this.renderMenuBar(this.toolbar2Items)
          )
      ),
      this.renderContent()
    ];
  }
}
