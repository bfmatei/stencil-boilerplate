import {
  Component,
  State
} from '@stencil/core';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.scss'
})
export class AppDashboard {
  @State()
  private content: string = '<b>Testing initial content</b>';

  public render(): JSX.Element {
    return (
      <app-rich-editor
        id='test'
        label='dashboard.richEditorLabel'
        defaultContent={this.content}
        onChange={(newContent: string): void => {
          this.content = newContent;
        }}
      />
    );
  }
}
