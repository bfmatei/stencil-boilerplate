import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../decorators/autobind';
import debounce from '../../decorators/debounce';
import {
  LocalesMap
} from '../../locales/locales.interface';
import {
  push
} from '../../orchestrators/connected-router/connected-router.actions';
import {
  setUser
} from '../../orchestrators/user/user.actions';
import {
  UserData
} from '../../orchestrators/user/user.interface';
import {
  GlobalStoreState
} from '../../redux/store';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.scss'
})
export class AppLogin {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @State()
  private username: string = '';

  @State()
  private password: string = '';

  @State()
  private pending: boolean = false;

  @State()
  private error: string = '';

  @State()
  private translations: LocalesMap;

  private setUser: typeof setUser;
  private push: typeof push;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      return {
        translations: state.i18n
      };
    });

    this.store.mapDispatchToProps(this, {
      setUser,
      push
    });
  }

  @debounce(50)
  private usernameInputEvent(evt: UIEvent): void {
    this.username = (evt.target as any).value;
  }

  @debounce(50)
  private passwordInputEvent(evt: UIEvent): void {
    this.password = (evt.target as any).value;
  }

  @autobind
  private submitClickEvent(evt: any): void {
    evt.preventDefault();

    this.pending = true;

    if (this.username !== 'admin') {
      this.error = this.translations.login.errors.wrongUsername;
    } else {
      if (this.password !== 'password') {
        this.error = this.translations.login.errors.wrongPassword;
      } else {
        // TODO: Replace with actual login method
        const user: UserData = {
          id: this.username === 'admin' ? 1 : 2,
          user: this.username,
          name: `${this.username}Name`,
          lastName: `${this.username}LastName`,
          email: `${this.username}@app.com`
        };

        localStorage.setItem('user', JSON.stringify(user));

        this.setUser(user);

        this.push('/dashboard');
      }
    }

    this.pending = false;
  }

  private renderErrorBox(): JSX.Element {
    if (!this.error || this.error.length === 0) {
      return null;
    }

    return (
      <p>{this.error}</p>
    );
  }

  private renderLoginForm(): JSX.Element {
    return (
      <section class='container'>
        <form>
          <input
            type='text'
            onInput={this.usernameInputEvent}
            value={this.username}
            placeholder={this.translations.login.username}
          />
          <input
            type='password'
            onInput={this.passwordInputEvent}
            value={this.password}
            placeholder={this.translations.login.password}
          />
          <input
            type='submit'
            onClick={this.submitClickEvent}
            value={this.translations.login.signIn}
            disabled={this.pending}
          />
        </form>
      </section>
    );
  }

  public render(): JSX.Element[] {
    return [
      this.renderErrorBox(),
      this.renderLoginForm()
    ];
  }
}
