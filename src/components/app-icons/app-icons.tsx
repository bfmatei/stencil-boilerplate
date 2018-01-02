import {
  Component
} from '@stencil/core';

/**
 * AppIcons is a collection of Material Design SVG icons.
 *
 * The icons must have the following viewBox: 0 0 24 24.
 */
@Component({
  tag: 'app-icons',
  styleUrl: 'app-icons.scss'
})
export class AppIcons {
  public render(): JSX.Element {
    return (
      <svg>
        <defs>
          <g id='dashboard'>
            <path fill='currentColor' d='M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z' />
          </g>
          <g id='logout'>
            <path fill='currentColor' d='M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z' />
          </g>
          <g id='menu'>
            <path fill='currentColor' d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
          </g>
          <g id='projects'>
            <path fill='currentColor' d='M19,18H9A2,2 0 0,1 7,16V4A2,2 0 0,1 9,2H10V7L12,5.5L14,7V2H19A2,2 0 0,1 21,4V16A2,2 0 0,1 19,18M17,20V22H5A2,2 0 0,1 3,20V6H5V20H17Z' />
          </g>
        </defs>
      </svg>
    );
  }
}
