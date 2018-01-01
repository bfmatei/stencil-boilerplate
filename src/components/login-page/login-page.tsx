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
  I18nObject
} from '../../orchestrators/i18n/i18n.interface';
import {
  setUser
} from '../../orchestrators/user/user.actions';
import {
  UserData
} from '../../orchestrators/user/user.interface';
import {
  GlobalStoreState
} from '../../redux/store';
import {
  push
} from '../connected-router/connected-router.actions';

import {
  changePassword,
  changeUsername,
  login,
  loginError,
  loginSuccess
} from './login-page.actions';

@Component({
  tag: 'login-page',
  styleUrl: 'login-page.scss'
})
export class LoginPage {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @State()
  private username: string;

  @State()
  private password: string;

  @State()
  private pending: boolean;

  @State()
  private error: string;

  @State()
  private translations: I18nObject;

  private changeUsername: typeof changeUsername;
  private changePassword: typeof changePassword;
  private login: typeof login;
  private loginSuccess: typeof loginSuccess;
  private loginError: typeof loginError;
  private setUser: typeof setUser;
  private push: typeof push;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        login: {
          username,
          password,
          pending,
          error
        },
        i18n: {
          loginPage
        }
      } = state;

      return {
        username,
        password,
        pending,
        error,
        translations: loginPage
      };
    });

    this.store.mapDispatchToProps(this, {
      changeUsername,
      changePassword,
      login,
      loginSuccess,
      loginError,
      setUser,
      push
    });
  }

  /** Uncomment in order to avoid logging in after each refresh */
  // public componentDidLoad(): void {
  //   const user: string = localStorage.getItem('user');
  //
  //   if (user) {
  //     this.setUser(JSON.parse(user));
  //
  //     this.push('/dashboard');
  //   }
  // }

  @debounce(50)
  private usernameInputEvent(evt: UIEvent): void {
    this.changeUsername((evt.target as any).value);
  }

  @debounce(50)
  private passwordInputEvent(evt: UIEvent): void {
    this.changePassword((evt.target as any).value);
  }

  @autobind
  private submitClickEvent(evt: any): void {
    evt.preventDefault();

    this.login();

    if (this.username !== 'admin' && this.username !== 'manager' && this.username !== 'team-leader' && this.username !== 'recruiter') {
      this.loginError('Wrong username');
    } else {
      if (this.password !== 'password') {
        this.loginError('Wrong password');
      } else {
        this.loginSuccess();

        const user: UserData = {
          id: this.username === 'admin' ? 1 : 2,
          user: this.username,
          name: `${this.username}Name`,
          lastName: `${this.username}LastName`,
          email: `${this.username}@app.com`,
          role: `${this.username}Role`
        };

        localStorage.setItem('user', JSON.stringify(user));

        this.setUser(user);

        this.push('/dashboard');
      }
    }
  }

  private renderErrorBox(): JSX.Element {
    if (!this.error || this.error.length === 0) {
      return null;
    }

    return (
      <p>{this.error}</p>
    );
  }

  public render(): JSX.Element {
    return (
      <section>
        {this.renderErrorBox()}
        <input
          type='text'
          onInput={this.usernameInputEvent}
          value={this.username}
          placeholder={this.translations.username as string}
        />
        <input
          type='password'
          onInput={this.passwordInputEvent}
          value={this.password}
          placeholder={this.translations.password as string}
        />
        <input
          type='submit'
          onClick={this.submitClickEvent}
          value={this.translations.signIn as string}
          disabled={this.pending}
        />
      </section>
    );
  }
}
