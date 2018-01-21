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

  public render(): JSX.Element {
    return (
      <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
        <use xlinkHref={`/assets/icons.svg#${this.name}`} />
      </svg>
    );
  }
}
