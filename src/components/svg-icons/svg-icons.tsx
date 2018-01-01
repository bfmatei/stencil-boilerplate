import {
  Component
} from '@stencil/core';

@Component({
  tag: 'svg-icons',
  styleUrl: 'svg-icons.scss'
})
export class SvgIcons {
  public render(): JSX.Element {
    return (
      <svg>
        <defs>
          <g id='menu'>
            <path fill='currentColor' d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
          </g>
        </defs>
      </svg>
    );
  }
}
