import {
  Component,
  Element
} from '@stencil/core';

@Component({
  tag: 'app-form-text-input'
})
export class AppFormTextInput {
  @Element()
  private $element: HTMLAppFormTextInputElement;

  public componentWillLoad(): void {
    console.dir((this.$element.parentElement as HTMLAppFormElement).name);
  }

  public register(): void {
    console.log('aaaa', this);
  }

  public render(): JSX.Element {
    return (
      <div />
    );
  }
}
