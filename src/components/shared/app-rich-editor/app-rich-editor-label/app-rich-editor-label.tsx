import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'app-rich-editor-label',
  styleUrl: 'app-rich-editor-label.pcss'
})
export class AppRichEditorLabel {
  @Prop()
  public entry: string = '';

  public render(): JSX.Element {
    return (
      <app-translate entry={this.entry} />
    );
  }
}
