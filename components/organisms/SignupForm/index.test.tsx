import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from '.';

describe('SignupForm', () => {
  test('should render the signup form correctly', () => {
    render(<SignupForm />);
    expect(screen.getByText('Sign Up ✨')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getByText('Xero')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should use the default empty onSignupClick function without errors when the prop is not provided', () => {
    render(<SignupForm />);

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(() => fireEvent.click(signUpButton)).not.toThrow();
  });

  test('should call the onGoogleSignupClick function when the Google signup button is clicked', () => {
    const onGoogleSignupClickMock = jest.fn();
    render(<SignupForm onGoogleSignupClick={onGoogleSignupClickMock} />);

    const googleSignupButton = screen.getByText('Google');
    fireEvent.click(googleSignupButton);

    expect(onGoogleSignupClickMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onStripeSignupClick function when the Stripe signup button is clicked', () => {
    const onStripeSignupClickMock = jest.fn();
    render(<SignupForm onStripeSignupClick={onStripeSignupClickMock} />);

    const stripeSignupButton = screen.getByText('Stripe');
    fireEvent.click(stripeSignupButton);

    expect(onStripeSignupClickMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onXeroSignupClick function when the Xero signup button is clicked', () => {
    const onXeroSignupClickMock = jest.fn();
    render(<SignupForm onXeroSignupClick={onXeroSignupClickMock} />);

    const xeroSignupButton = screen.getByText('Xero');
    fireEvent.click(xeroSignupButton);

    expect(onXeroSignupClickMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onLoginClick function when the Login button is clicked', () => {
    const onLoginClickMock = jest.fn();
    render(<SignupForm onLoginClick={onLoginClickMock} />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    expect(onLoginClickMock).toHaveBeenCalledTimes(1);
  });

  test('should update the email, password, and name state when the props change', () => {
    const { rerender } = render(
      <SignupForm
        email="old@example.com"
        password="oldpassword"
        name="Old Name"      />
    );

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(nameInput).toHaveValue('Old Name');
    expect(emailInput).toHaveValue('old@example.com');
    expect(passwordInput).toHaveValue('oldpassword');

    rerender(
      <SignupForm
        email="new@example.com"
        password="newpassword"
        name="New Name"      />
    );

    expect(nameInput).toHaveValue('New Name');
    expect(emailInput).toHaveValue('new@example.com');
    expect(passwordInput).toHaveValue('newpassword');
  });

  test('should call the onNameChange function when the name input value changes', () => {
    const onNameChangeMock = jest.fn();
    render(<SignupForm onNameChange={onNameChangeMock} />);

    const nameInput = screen.getByPlaceholderText('Your Name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    expect(onNameChangeMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onEmailChange function when the email input value changes', () => {
    const onEmailChangeMock = jest.fn();
    render(<SignupForm onEmailChange={onEmailChangeMock} />);

    const emailInput = screen.getByPlaceholderText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(onEmailChangeMock).toHaveBeenCalledTimes(1);
  });

  test('should call the onPasswordChange function when the password input value changes', () => {
    const onPasswordChangeMock = jest.fn();
    render(<SignupForm onPasswordChange={onPasswordChangeMock} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(onPasswordChangeMock).toHaveBeenCalledTimes(1);
  });

  test('should use the default empty onSubmit function without errors when the prop is not provided', () => {
    render(<SignupForm />);

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const form = screen.getByTestId('signup-form');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(() => fireEvent.submit(form)).not.toThrow();
  });

  test('should use the default empty onLoginClick function without errors when the prop is not provided', () => {
    render(<SignupForm />);

    const LoginButton = screen.getByText('Login');
    expect(() => fireEvent.click(LoginButton)).not.toThrow();
  });
});

