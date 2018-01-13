import {
  Component,
  Listen,
  Prop
} from '@stencil/core';

@Component({
  tag: 'app-rich-editor-content',
  styleUrl: 'app-rich-editor-content.scss'
})
export class AppRichEditorContent {
  @Prop()
  public richEditorId: string;

  @Prop()
  public content: string;

  @Prop()
  public onChange: (newValue: any) => void;

  @Listen('input')
  public contentInputHandler(evt: UIEvent): void {
    this.onChange((evt.target as HTMLElement).innerHTML);
  }

  @Listen('keydown.tab')
  public contentTabKeyDownHandler(evt: UIEvent): void {
    evt.preventDefault();
  }

  public hostData(): JSXElements.AppRichEditorContentAttributes {
    return {
      contentEditable: true,
      richEditorId: this.richEditorId
    };
  }

  public render(): string {
    return this.content;
  }
}
