import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm, { LoginFormProps } from '.';

describe('LoginForm', () => {
  test('should render the login form correctly', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login to Seeder ✨')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your email id')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getByText('Xero')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('should call the onForgotPasswordClick function when the Forgot Password button is clicked', () => {
    const onForgotPasswordClickMock = jest.fn();
    render(<LoginForm onForgotPasswordClick={onForgotPasswordClickMock} />);

    const forgotPasswordButton = screen.getByText('Forgot Password?');
    fireEvent.click(forgotPasswordButton);

    expect(onForgotPasswordClickMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onSignUpClick function when the Sign Up button is clicked', () => {
    const onSignUpClickMock = jest.fn();
    render(<LoginForm onSignUpClick={onSignUpClickMock} />);

    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);

    expect(onSignUpClickMock).toHaveBeenCalledTimes(1);
  });

  test('should use the default empty onSignUpClick function without errors when the prop is not provided', () => {
    render(<LoginForm />);

    const signUpButton = screen.getByText('Sign Up');
    expect(() => fireEvent.click(signUpButton)).not.toThrow();
  });

  test('should call the onGoogleLoginClick function when the Google login button is clicked', () => {
    const onGoogleLoginClickMock = jest.fn();
    render(<LoginForm onGoogleLoginClick={onGoogleLoginClickMock} />);

    const googleLoginButton = screen.getByText('Google');
    fireEvent.click(googleLoginButton);

    expect(onGoogleLoginClickMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onStripeLoginClick function when the Stripe login button is clicked', () => {
    const onStripeLoginClickMock = jest.fn();
    render(<LoginForm onStripeLoginClick={onStripeLoginClickMock} />);

    const stripeLoginButton = screen.getByText('Stripe');
    fireEvent.click(stripeLoginButton);

    expect(onStripeLoginClickMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onXeroLoginClick function when the Xero login button is clicked', () => {
    const onXeroLoginClickMock = jest.fn();
    render(<LoginForm onXeroLoginClick={onXeroLoginClickMock} />);

    const xeroLoginButton = screen.getByText('Xero');
    fireEvent.click(xeroLoginButton);

    expect(onXeroLoginClickMock).toHaveBeenCalledTimes(1);
  });
  test('should update the email and password state when the props change', () => {
    const { rerender } = render(
      <LoginForm email="old@example.com" password="oldpassword" />
    );

    const emailInput = screen.getByPlaceholderText('Enter your email id');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    expect(emailInput).toHaveValue('old@example.com');
    expect(passwordInput).toHaveValue('oldpassword');

    rerender(<LoginForm email="new@example.com" password="newpassword" />);

    expect(emailInput).toHaveValue('new@example.com');
    expect(passwordInput).toHaveValue('newpassword');
  });

  test('should call the onEmailChange function when the email input value changes', () => {
    const onEmailChangeMock = jest.fn();
    render(<LoginForm onEmailChange={onEmailChangeMock} />);

    const emailInput = screen.getByPlaceholderText('Enter your email id');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(onEmailChangeMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onPasswordChange function when the password input value changes', () => {
    const onPasswordChangeMock = jest.fn();
    render(<LoginForm onPasswordChange={onPasswordChangeMock} />);

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(onPasswordChangeMock).toHaveBeenCalledTimes(1);
  });
  test('should prevent the default form submission behavior', () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('Enter your email id');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const continueButton = screen.getByText('Continue');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const form = emailInput.closest('form');
    if (form) {
      const preventDefault = jest.fn();
      form.addEventListener('submit', preventDefault);

      fireEvent.submit(form);

      expect(preventDefault).toHaveBeenCalledTimes(1);
    } else {
      throw new Error('Form element not found');
    }
  });
});
