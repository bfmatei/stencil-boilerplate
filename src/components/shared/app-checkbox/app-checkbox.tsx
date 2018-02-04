import {
  Component,
  Listen,
  Prop
} from '@stencil/core';

import noop from '../../../helpers/noop';

@Component({
  tag: 'app-checkbox',
  styleUrl: 'app-checkbox.pcss'
})
export class AppCheckbox {
  @Prop()
  public label: string = '';

  @Prop()
  public icon: string = 'checkbox';

  @Prop()
  public checked: boolean = false;

  @Prop()
  public onValueChange: (newValue: boolean) => void = noop;

  @Prop()
  public swap: boolean = false;

  @Prop()
  public disabled: boolean = false;

  @Listen('click')
  public elementClickHandler(evt: MouseEvent): void {
    evt.preventDefault();

    if (this.disabled === false) {
      this.onValueChange(!this.checked);
    }
  }

  public hostData(): JSXElements.AppCheckboxAttributes {
    return {
      class: {
        checked: this.checked,
        swap: this.swap,
        disabled: this.disabled
      }
    };
  }

  public render(): JSX.Element[] {
    return [
      (
        <app-icon class='icon-unchecked' name={`${this.icon}-unchecked`} />
      ),
      (
        <app-icon class='icon-checked' name={`${this.icon}-checked`} />
      ),
      (
        <app-translate class='label' entry={this.label} />
      )
    ];
  }
}
