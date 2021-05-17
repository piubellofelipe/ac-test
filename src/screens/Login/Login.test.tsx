import React from 'react';
import { ThemeProvider } from '@aircall/tractor';
import { fireEvent, render } from '@testing-library/react';
import Login from './Login';
import {useLogin} from './useLogin';
jest.mock('./useLogin.tsx');
describe('Login Page test suite', () => {
  const renderLogin = () => render(
  <ThemeProvider>
    <Login />
  </ThemeProvider>)

  it ("Username and password fields are updated correctly", () => {
    const useLoginMock = useLogin as jest.Mock;
    useLoginMock.mockReturnValue({
      username: '',
      password: '',
      loading: false,
      errorMessage: '',
      onChangeInput: jest.fn(),
      doLogin: jest.fn()
    })

    const wrapper = renderLogin();
    const usernameInput = wrapper.getByTestId('username-input') as any;
    const passwordInput = wrapper.getByTestId('password-input') as any;


    fireEvent.change(usernameInput, {target: {value: 'username'}} as any)
    fireEvent.change(passwordInput, {target: {value: 'password'}} as any)

    expect(usernameInput.value).toBe('username');
    expect(passwordInput.value).toBe('password');
  })

  it ("Displays a loading icon when loading", () => {
    const useLoginMock = useLogin as jest.Mock;
    useLoginMock.mockReturnValue({
      username: '',
      password: '',
      loading: true,
      errorMessage: '',
      onChangeInput: jest.fn(),
      doLogin: jest.fn()
    })

    const wrapper = renderLogin();
    expect(wrapper.getByTestId('loading-icon')).toBeInTheDocument();
  })
  it ("Displays an error message correctly", () => {
    const useLoginMock = useLogin as jest.Mock;
    useLoginMock.mockReturnValue({
      username: '',
      password: '',
      loading: false,
      errorMessage: 'Any error',
      onChangeInput: jest.fn(),
      doLogin: jest.fn()
    })

    const wrapper = renderLogin();
    expect(wrapper.getByTestId('error-message')).toBeInTheDocument();
  })
  it ("Does not display an error message", () => {
    const useLoginMock = useLogin as jest.Mock;
    useLoginMock.mockReturnValue({
      username: '',
      password: '',
      loading: false,
      errorMessage: '',
      onChangeInput: jest.fn(),
      doLogin: jest.fn()
    })

    const wrapper = renderLogin();
    expect(wrapper.queryByTestId('error-message')).not.toBeInTheDocument();
  })
  it ("Triggers doLogin callback correctly", () => {
    const useLoginMock = useLogin as jest.Mock;
    const doLogin = jest.fn();
    useLoginMock.mockReturnValue({
      username: '',
      password: '',
      loading: false,
      errorMessage: '',
      onChangeInput: jest.fn(),
      doLogin,
    })

    const wrapper = renderLogin();
    const form = wrapper.getByTestId('login-form');
    fireEvent.submit(form, {})

    expect(doLogin).toHaveBeenCalled();
  })




})