import {
  Component,
  Element,
  Listen,
  Prop
} from '@stencil/core';

import noop from '../../../../helpers/noop';

/**
 * Due to an issue with contenteditable items (the cursor repositions itself at the beginning of the element after a re-render),
 * the content cannot be controlled from outside.
 */

@Component({
  tag: 'app-rich-editor-content',
  styleUrl: 'app-rich-editor-content.scss'
})
export class AppRichEditorContent {
  @Prop()
  public defaultValue: string = '';

  @Prop()
  public onValueChange: (newValue: any) => void;

  @Prop()
  public storeElementRef: ($element: HTMLAppRichEditorContentElement) => void = noop;

  @Element()
  private $element: HTMLAppRichEditorContentElement;

  private value: string;

  public componentWillLoad(): void {
    this.value = this.defaultValue;
  }

  public componentDidLoad(): void {
    this.storeElementRef(this.$element);
  }

  @Listen('input')
  public contentInputHandler(): void {
    this.value = this.$element.innerHTML;

    this.onValueChange(this.value);
  }

  @Listen('keydown.tab')
  public contentTabKeyDownHandler(evt: KeyboardEvent): void {
    evt.preventDefault();
  }

  public hostData(): JSXElements.AppRichEditorContentAttributes {
    return {
      contentEditable: true,
      innerHTML: this.value
    };
  }
}
