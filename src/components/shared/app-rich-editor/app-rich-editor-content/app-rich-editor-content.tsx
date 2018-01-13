import {
  Component,
  Listen,
  Prop,
  State
} from '@stencil/core';

@Component({
  tag: 'app-rich-editor-content',
  styleUrl: 'app-rich-editor-content.scss'
})
export class AppRichEditorContent {
  @Prop()
  public defaultContent: string;

  @Prop()
  public onChange: (newValue: any) => void;

  @State()
  private content: string = '';

  @Listen('input')
  public contentInputHandler(evt: UIEvent): void {
    evt.preventDefault();

    this.onChange((evt.target as HTMLElement).innerHTML);
  }

  @Listen('keydown.tab')
  public contentTabKeyDownHandler(evt: UIEvent): void {
    evt.preventDefault();
  }

  public componentDidLoad(): void {
    this.content = this.defaultContent;
  }

  public hostData(): JSXElements.AppRichEditorContentAttributes {
    return {
      contentEditable: true,
      innerHTML: this.content
    };
  }

  public render(): string {
    return null;
  }
}
