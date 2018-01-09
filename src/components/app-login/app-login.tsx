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

import {
  AppLoginError
} from './app-login.interface';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.scss'
})
export class AppLogin {
  @Prop({
    context: 'store'
  })
  private store: Store;

  @Prop({
    context: 'isServer'
  })
  private isServer: boolean;

  @State()
  private username: string = '';

  @State()
  private password: string = '';

  @State()
  private pending: boolean = false;

  @State()
  private error: AppLoginError = {
    field: '',
    text: ''
  };

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

  @autobind
  private usernameValueChangeHandler(value: string): void {
    this.username = value;
  }

  @autobind
  private passwordValueChangeHandler(value: string): void {
    this.password = value;
  }

  @autobind
  private submitClickEvent(): void {
    this.pending = true;

    this.error = {
      field: 'username',
      text: ''
    };

    if (this.username !== 'admin') {
      this.error = {
        field: 'username',
        text: this.translations.login.errors.wrongUsername
      };
    } else {
      if (this.password !== 'password') {
        this.error = {
          field: 'password',
          text: this.translations.login.errors.wrongPassword
        };
      } else {
        // TODO: Replace with actual login method
        const user: UserData = {
          id: this.username === 'admin' ? 1 : 2,
          user: this.username,
          name: `${this.username}Name`,
          lastName: `${this.username}LastName`,
          email: `${this.username}@app.com`
        };

        if (this.isServer) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.push('/dashboard');

        this.setUser(user);
      }
    }

    this.pending = false;
  }

  public render(): JSX.Element[] {
    return [
      <section class='container'>
        <form>
          <app-text-input
            label='login.username'
            type='text'
            name='username'
            value={this.username}
            error={this.error.field === 'username' ? this.error.text : ''}
            onValueChange={this.usernameValueChangeHandler}
          />
          <app-text-input
            label='login.password'
            type='password'
            name='password'
            value={this.password}
            error={this.error.field === 'password' ? this.error.text : ''}
            onValueChange={this.passwordValueChangeHandler}
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
