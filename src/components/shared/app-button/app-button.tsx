import {
  Component,
  Element,
  Listen,
  Prop,
  PropWillChange
} from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.scss'
})
export class AppButton {
  @Prop()
  public label: string = '';

  @Prop()
  public onClick: () => void;

  @Prop()
  public disabled: boolean = false;

  @Element()
  private $element: HTMLElement;

  public componentDidLoad(): void {
    this.disablePropChange(this.disabled);
  }

  @Listen('click')
  public clickHandler(): void {
    this.onClick();
  }

  @PropWillChange('disabled')
  public disablePropChange(newValue: boolean): void {
    this.$element.setAttribute('disabled', newValue.toString());
  }

  public render(): JSX.Element[] {
    return [
      <app-translate entry={this.label} />
    ];
  }
}
