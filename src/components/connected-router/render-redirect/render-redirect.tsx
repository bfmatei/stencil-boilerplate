import {
  Component,
  Prop
} from '@stencil/core';

@Component({
  tag: 'render-redirect'
})
export class RenderRedirect {
  @Prop()
  public url: string;

  public render(): JSX.Element {
    return (
      <stencil-router-redirect url={this.url} />
    );
  }
}
