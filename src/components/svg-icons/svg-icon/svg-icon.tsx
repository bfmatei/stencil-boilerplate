import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'svg-icon'
})
export class SvgIcon {
  @Prop()
  public name: string = '';

  @Prop()
  public onClick: (evt: UIEvent) => void;

  public render(): JSX.Element {
    return (
      <svg width={24} height={24} fill='currentColor' onClick={this.onClick}>
        <use xlinkHref={`#${this.name}`} />
      </svg>
    );
  }
}
