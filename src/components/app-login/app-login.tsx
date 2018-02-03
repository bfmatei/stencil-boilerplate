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

  private user: UserData;

  public componentWillLoad(): void {
    this.store.mapStateToProps(this, (state: GlobalStoreState): {} => {
      const {
        router,
        user: {
          id
        }
      } = state;

      return {
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
  private formSubmitHandler(form: ConnectedForm): Promise<void> {
    // TODO: Replace with actual login method

    const {
      username,
      password
    } = form.fields;

    const usernameValue: string = username.value;
    const passwordValue: string = password.value;

    if (usernameValue !== 'admin') {
      this.submitFormError('login', [
        {
          field: 'username',
          message: 'login.errors.wrongUsername'
        }
      ]);
    } else {
      if (passwordValue !== 'password') {
        this.submitFormError('login', [
          {
            field: 'password',
            message: 'login.errors.wrongPassword'
          }
        ]);
      } else {
        this.user = {
          id: usernameValue === 'admin' ? 1 : 2,
          user: usernameValue,
          name: `${usernameValue}Name`,
          lastName: `${usernameValue}LastName`,
          email: `${usernameValue}@app.com`
        };

        this.submitFormSuccess('login');
      }

      return Promise.resolve();
    }
  }

  @autobind
  private formSubmitSuccessHandler(): void {
    localStorage.setItem('user', JSON.stringify(this.user));

    this.setUser(this.user);

    this.push(this.redirectTo || this.defaultRedirectRoute);
  }

  public render(): JSX.Element {
    if (this.userId !== null) {
      return (
        <app-redirect url='/dashboard' />
      );
    }

    return (
      <app-form name='login' submit={this.formSubmitHandler} submitSuccess={this.formSubmitSuccessHandler} class='container'>
        <app-logo class='logo' />
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
    );
  }
}
