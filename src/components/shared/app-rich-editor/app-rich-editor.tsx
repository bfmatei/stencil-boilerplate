import {
  Component,
  Element,
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
  imageButton,
  italicButton,
  linkButton,
  orderedListButton,
  paragraphButton,
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
  styleUrl: 'app-rich-editor.scss'
})
export class AppRichEditor {
  @Prop()
  public id: string;

  @Prop()
  public label: string = '';

  @Prop()
  public defaultContent: string = '';

  @Prop()
  public readonly: boolean = false;

  @Prop()
  public onChange: (newValue: any) => void = noop;

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
    linkButton,
    imageButton
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
    paragraphButton,
    blockquoteButton,
    codeButton
  ];

  @State()
  private active: boolean = false;

  @Element()
  private $element: HTMLElement;

  public isFocused: boolean = false;

  public textContent: string = '';

  public componentDidLoad(): void {
    this.handleContentChange(this.defaultContent);
  }

  @autobind
  private labelClickHandler(): void {
    const $content: HTMLElement = this.$element.querySelector('app-rich-editor-content');

    $content.focus();
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
        richEditorId={this.id}
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

    this.onChange(newContent);
  }

  @autobind
  private editorFocusHandler(): void {
    this.active = true;
  }

  @autobind
  private editorBlurHandler(): void {
    this.active = this.textContent.length > 0 ? true : false;
  }

  private renderContent(): JSX.Element {
    return (
      <app-rich-editor-content
        onChange={this.handleContentChange}
        onFocus={this.editorFocusHandler}
        onBlur={this.editorBlurHandler}
        defaultContent={this.defaultContent}
        richEditorId={this.id}
        class={this.active ? 'active' : ''}
      />
    );
  }

  public hostData(): JSXElements.AppRichEditorAttributes {
    return {
      id: this.id
    };
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
