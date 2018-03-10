import { Component, Event, EventEmitter } from '@stencil/core';

import autobind from '~decorators/autobind';

@Component({
  tag: 'app-dashboard-child'
})
export class AppDashboardChild {
  @Event()
  private buttonClicked: EventEmitter;

  @autobind
  private buttonClickedHandler(): void {
    this.buttonClicked.emit();
  }

  protected render(): JSX.Element {
    return (
      <app-button label='login.signIn' onClick={this.buttonClickedHandler} />
    );
  }
}
