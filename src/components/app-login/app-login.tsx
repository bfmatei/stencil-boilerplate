import {
  Component,
  Prop,
  State
} from '@stencil/core';
import {
  Store
} from '@stencil/redux';

import autobind from '../../decorators/autobind';
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

import {
  login,
  loginError,
  loginSuccess,
  setPassword,
  setUsername
} from './app-login.actions';

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
  private pending: boolean = false;

  @State()
  public userId: number = null;

  @State()
  private username: string = '';

  @State()
  private password: string = '';

  @State()
  private errorField: string = '';

  @State()
  private errorMessage: string = '';

  @State()
  private redirectTo: string;

  private setUsername: typeof setUsername;
  private setPassword: typeof setPassword;
  private login: typeof login;
  private loginSuccess: typeof loginSuccess;
  private loginError: typeof loginError;
  private setUser: typeof setUser;
  private push: typeof push;

  private defaultRedirectRoute: string = '/dashboard';

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        login: {
          username,
          password,
          pending,
          error: {
            field,
            message
          }
        },
        router,
        user: {
          id
        }
      } = state;

      return {
        username,
        password,
        pending,
        errorField: field,
        errorMessage: message,
        userId: id,
        redirectTo: router.state && router.state.from ? router.state.from : ''
      };
    });

    this.store.mapDispatchToProps(this, {
      setUsername,
      setPassword,
      login,
      loginSuccess,
      loginError,
      setUser,
      push
    });
  }

  @autobind
  private submitClickEvent(): void {
    this.login();

    // TODO: Replace with actual login method

    if (this.username !== 'admin') {
      this.loginError({
        field: 'username',
        message: 'login.errors.wrongUsername'
      });
    } else {
      if (this.password !== 'password') {
        this.loginError({
          field: 'password',
          message: 'login.errors.wrongPassword'
        });
      } else {
        const user: UserData = {
          id: this.username === 'admin' ? 1 : 2,
          user: this.username,
          name: `${this.username}Name`,
          lastName: `${this.username}LastName`,
          email: `${this.username}@app.com`
        };

        localStorage.setItem('user', JSON.stringify(user));

        this.setUser(user);

        this.push(this.redirectTo || this.defaultRedirectRoute);

        this.loginSuccess();
      }
    }
  }

  @autobind
  private usernameValueChangeHandler(newValue: string): void {
    this.setUsername(newValue);
  }

  @autobind
  private passwordValueChangeHandler(newValue: string): void {
    this.setPassword(newValue);
  }

  public render(): JSX.Element | JSX.Element[] {
    if (this.userId !== null) {
      return (
        <app-redirect url='/dashboard' />
      );
    }

    return [
      <section class='container'>
        <form>
          <app-text-input
            label='login.username'
            type='text'
            name='username'
            hasError={this.errorField === 'username'}
            message={this.errorField === 'username' ? this.errorMessage : ''}
            onValueChange={this.usernameValueChangeHandler}
            value={this.username}
            disabled={this.pending}
          />
          <app-text-input
            label='login.password'
            type='password'
            name='password'
            hasError={this.errorField === 'password'}
            message={this.errorField === 'password' ? this.errorMessage : ''}
            onValueChange={this.passwordValueChangeHandler}
            value={this.password}
            disabled={this.pending}
          />
          <app-button
            onClick={this.submitClickEvent}
            label='login.signIn'
            loading={this.pending}
          />
        </form>
      </section>
    ];
  }
}
