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
  submitFormError,
  submitFormSuccess
} from '../../orchestrators/connected-forms/connected-forms.actions';
import {
  ConnectedForm
} from '../../orchestrators/connected-forms/connected-forms.interface';
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
  public userId: number = null;

  @State()
  private redirectTo: string;

  private setUser: typeof setUser;
  private push: typeof push;
  private submitFormSuccess: typeof submitFormSuccess;
  private submitFormError: typeof submitFormError;

  private defaultRedirectRoute: string = '/dashboard';

  private username: string = '';
  private password: string = '';
  private user: UserData;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        forms,
        router,
        user: {
          id
        }
      } = state;

      const loginForm: ConnectedForm = forms.login || {
        name: 'login',
        success: false,
        submitting: false,
        error: false,
        dirty: false,
        fields: {}
      };

      return {
        username: loginForm.fields.username ? loginForm.fields.username.value : '',
        password: loginForm.fields.password ? loginForm.fields.password.value : '',
        userId: id,
        redirectTo: router.state && router.state.from ? router.state.from : ''
      };
    });

    this.store.mapDispatchToProps(this, {
      setUser,
      push,
      submitFormSuccess,
      submitFormError
    });
  }

  @autobind
  private formSubmitHandler(): void {
    // TODO: Replace with actual login method

    if (this.username !== 'admin') {
      this.submitFormError('login', [
        {
          field: 'username',
          message: 'login.errors.wrongUsername'
        }
      ]);
    } else {
      if (this.password !== 'password') {
        this.submitFormError('login', [
          {
            field: 'password',
            message: 'login.errors.wrongPassword'
          }
        ]);
      } else {
        this.user = {
          id: this.username === 'admin' ? 1 : 2,
          user: this.username,
          name: `${this.username}Name`,
          lastName: `${this.username}LastName`,
          email: `${this.username}@app.com`
        };

        this.submitFormSuccess('login');
      }
    }
  }

  @autobind
  private formSubmitSuccessHandler(): void {
    localStorage.setItem('user', JSON.stringify(this.user));

    this.setUser(this.user);

    this.push(this.redirectTo || this.defaultRedirectRoute);
  }

  public render(): JSX.Element | JSX.Element[] {
    if (this.userId !== null) {
      return (
        <app-redirect url='/dashboard' />
      );
    }

    return [
      <section class='container'>
        <app-logo class='logo' />
        <app-form name='login' onSubmit={this.formSubmitHandler} onSubmitSuccess={this.formSubmitSuccessHandler}>
          <app-form-text-input
            name='username'
            label='login.username'
            fieldType='text'
            defaultValue='admin'
            message='login.tryUsername'
            class='username'
          />
          <app-form-text-input
            name='password'
            label='login.password'
            fieldType='password'
            message='login.tryPassword'
            class='password'
          />
          <app-form-submit label='login.signIn' />
        </app-form>
      </section>
    ];
  }
}
