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
  loginSuccess
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

  private login: typeof login;
  private loginSuccess: typeof loginSuccess;
  private loginError: typeof loginError;
  private setUser: typeof setUser;
  private push: typeof push;

  private username: string = '';
  private password: string = '';
  private errorField: string = '';
  private errorMessage: string = '';

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
        userId: id
      };
    });

    this.store.mapDispatchToProps(this, {
      login,
      loginSuccess,
      loginError,
      setUser,
      push
    });
  }

  @autobind
  private submitClickEvent(): void {
    this.login(this.username, this.password);

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

        this.push('/dashboard');

        this.loginSuccess();
      }
    }
  }

  @autobind
  private usernameValueChangeHandler(newValue: string): void {
    this.username = newValue;
  }

  @autobind
  private passwordValueChangeHandler(newValue: string): void {
    this.password = newValue;
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
            error={this.errorField === 'username' ? this.errorMessage : ''}
            onValueChange={this.usernameValueChangeHandler}
            defaultValue={this.username}
            disabled={this.pending}
          />
          <app-text-input
            label='login.password'
            type='password'
            name='password'
            error={this.errorField === 'password' ? this.errorMessage : ''}
            onValueChange={this.passwordValueChangeHandler}
            defaultValue={this.password}
            disabled={this.pending}
          />
          <app-button
            onClick={this.submitClickEvent}
            label='login.signIn'
            disabled={this.pending}
          />
        </form>
      </section>
    ];
  }
}
