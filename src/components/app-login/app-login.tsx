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
import {
  AppFormError
} from '../shared/app-form/app-form.interface';
import isRequired from '../shared/app-form/validators/is-required';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.pcss'
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

  private defaultRedirectRoute: string = '/dashboard';

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
      push
    });
  }

  @autobind
  private formSubmitHandler(form: ConnectedForm): Promise<UserData> {
    // TODO: Replace with actual login method

    const promise: Promise<UserData> = new Promise((resolve: (value: UserData) => void, reject: (reason: AppFormError[]) => void): void => {
      setTimeout(() => {
        const {
          username,
          password
        } = form.fields;

        const usernameValue: string = username.value;
        const passwordValue: string = password.value;

        if (usernameValue !== 'admin') {
          reject([
            {
              field: 'username',
              message: 'login.errors.wrongUsername'
            }
          ]);
        } else {
          if (passwordValue !== 'password') {
            reject([
              {
                field: 'password',
                message: 'login.errors.wrongPassword'
              }
            ]);
          } else {
            resolve({
              id: usernameValue === 'admin' ? 1 : 2,
              user: usernameValue,
              name: `${usernameValue}Name`,
              lastName: `${usernameValue}LastName`,
              email: `${usernameValue}@app.com`
            });
          }
        }
      }, 1500);
    });

    return promise;
  }

  @autobind
  private formSubmitSuccessHandler(data: UserData): void {
    localStorage.setItem('user', JSON.stringify(data));

    this.setUser(data);

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
          validators={[
            isRequired
          ]}
        />
        <app-form-text-input
          name='password'
          label='login.password'
          fieldType='password'
          message='login.tryPassword'
          class='password'
          validators={[
            isRequired
          ]}
        />
        <app-form-submit label='login.signIn' />
      </app-form>
    );
  }
}
