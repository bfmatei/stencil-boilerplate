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
  AppRichEditorMenuButtonConfig
} from './app-rich-editor-menu-button/app-rich-editor-menu-button.interface';

@Component({
  tag: 'app-rich-editor',
  styleUrl: 'app-rich-editor.scss'
})
export class AppRichEditor {
  @Prop()
  private richEditorId: string;

  @Prop()
  public name: string = '';

  @Prop()
  public label: string = '';

  @Prop()
  public onChange: (newValue: any) => void = noop;

  @Prop()
  public defaultContent: string = '';

  @Element()
  private $element: HTMLElement;

  @State()
  private content: string = '';

  @State()
  public focused: boolean = false;

  private buttons: AppRichEditorMenuButtonConfig[] = [
    {
      label: 'Bold',
      icon: 'bold',
      action: 'bold'
    },
    {
      label: 'Italic',
      icon: 'italic',
      action: 'italic'
    },
    {
      label: 'Underline',
      icon: 'underline',
      action: 'underline'
    },
    {
      label: 'Strike-Through',
      icon: 'strike-through',
      action: 'strikeThrough'
    },
    {
      label: 'Heading 1',
      icon: 'h1',
      action: {
        name: 'formatBlock',
        value: 'h1'
      }
    },
    {
      label: 'Heading 2',
      icon: 'h2',
      action: {
        name: 'formatBlock',
        value: 'h2'
      }
    },
    {
      label: 'Heading 3',
      icon: 'h3',
      action: {
        name: 'formatBlock',
        value: 'h3'
      }
    },
    {
      label: 'Heading 4',
      icon: 'h4',
      action: {
        name: 'formatBlock',
        value: 'h4'
      }
    },
    {
      label: 'Heading 5',
      icon: 'h5',
      action: {
        name: 'formatBlock',
        value: 'h5'
      }
    },
    {
      label: 'Heading 6',
      icon: 'h6',
      action: {
        name: 'formatBlock',
        value: 'h6'
      }
    },
    {
      label: 'Paragraph',
      icon: 'paragraph',
      action: {
        name: 'formatBlock',
        value: 'p'
      }
    },
    {
      label: 'Quote',
      icon: 'blockquote',
      action: {
        name: 'formatBlock',
        value: 'blockquote'
      }
    },
    {
      label: 'Ordered List',
      icon: 'ordered-list',
      action: 'insertOrderedList'
    },
    {
      label: 'Unordered List',
      icon: 'unordered-list',
      action: 'insertUnorderedList'
    },
    {
      label: 'Code',
      icon: 'code-block',
      action: {
        name: 'formatBlock',
        value: 'pre'
      }
    },
    {
      label: 'Horizontal Line',
      icon: 'horizontal-rule',
      action: 'insertHorizontalRule'
    },
    {
      label: 'Link',
      icon: 'link',
      action: {
        name: 'createLink',
        prompt: true,
        value: 'Enter the link URL'
      }
    },
    {
      label: 'Image',
      icon: 'image',
      action: {
        name: 'insertImage',
        prompt: true,
        value: 'Enter the image URL'
      }
    }
  ];

  @autobind
  private handleContentChange(newContent: string): void {
    this.content = newContent;
  }

  @autobind
  private editorFocusHandler(): void {
    this.focused = true;
  }

  @autobind
  private editorBlurHandler(): void {
    this.focused = false;
  }

  public hostData(): JSXElements.AppRichEditorAttributes {
    return {
      richEditorId: this.name
    };
  }

  @autobind
  private labelClickHandler(): void {
    (this.$element.querySelector('app-rich-editor-content') as HTMLElement).focus();
  }


  public render(): JSX.Element[] {
    const isActive: boolean = this.focused || convertRichEditorToString(this.content).length > 0;

    return [
      <app-rich-editor-label
        onClick={this.labelClickHandler}
        entry={this.label}
        class={isActive ? 'active' : ''}
      />,
      <app-rich-editor-menu-bar
        buttons={this.buttons}
        richEditorId={this.name}
        class={isActive ? 'active' : ''}
      />,
      <app-rich-editor-content
        onChange={this.handleContentChange}
        onFocus={this.editorFocusHandler}
        onBlur={this.editorBlurHandler}
        content={this.defaultContent}
        richEditorId={this.name}
        class={isActive ? 'active' : ''}
      />
    ];
  }
}
