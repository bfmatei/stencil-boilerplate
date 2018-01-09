import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'app-icon',
  styleUrl: 'app-icon.scss'
})
export class AppIcon {
  @Prop()
  public name: string = '';

  @Prop()
  public size: number | string = 24;

  @Prop()
  public onClick: (evt: UIEvent) => void;

  public render(): JSX.Element {
    return (
      <svg width={this.size} height={this.size} viewBox='0 0 24 24' fill='currentColor' onClick={this.onClick}>
        <use xlinkHref={`/assets/icons.svg#${this.name}`} />
      </svg>
    );
  }
}
