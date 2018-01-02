import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'app-redirect'
})
export class AppRedirect {
  @Prop()
  public url: string;

  public render(): JSX.Element {
    return (
      <stencil-router-redirect url={this.url} />
    );
  }
}
