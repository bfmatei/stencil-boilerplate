import {
  Component,
  Listen,
  Prop
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import {
  push
} from '../connected-router.actions';

@Component({
  tag: 'connected-link',
  styleUrl: 'connected-link.scss'
})
export class ConnectedLink {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop()
  public tag: string = 'a';

  @Prop()
  public url: string;

  private push: typeof push;

  public componentWillLoad(): void {
    this.store.mapDispatchToProps(this, {
      push
    });
  }

  @Listen('click')
  public elementClickHandler(evt: UIEvent): void {
    evt.preventDefault();

    this.push(this.url);
  }

  public render(): JSX.Element {
    return (
      <slot />
    );
  }
}
