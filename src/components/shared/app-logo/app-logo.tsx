import {
  Component
} from '@stencil/core';

@Component({
  tag: 'app-logo',
  styleUrl: 'app-logo.scss'
})
export class AppLogo {
  public render(): JSX.Element {
    return (
      <svg width='100%' height='100%' viewBox='0 0 1200 1200'>
        <use xlinkHref={`/assets/logo.svg#logo`} />
      </svg>
    );
  }
}
