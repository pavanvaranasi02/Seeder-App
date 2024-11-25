import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetCodePage from './';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ResetCodeValidation } from '../../utils/Constants';

describe('ResetCodePage', () => {
  test(' should navigate to /changePassword on handleResetCode', () => {
    const history = createMemoryHistory();
    const { getByText, getByPlaceholderText } = render(
      <Router location={history.location} navigator={history}>
        <ResetCodePage />
      </Router>
    );

    const input = getByPlaceholderText('Enter reset code') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12345678' } });
    fireEvent.click(getByText('Reset Password'));

    expect(history.location.pathname).toBe('/change-password-page');
  });

  test('should navigate to /login on handleLoginClick', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <ResetCodePage />
      </Router>
    );

    fireEvent.click(getByText('Login'));

    expect(history.location.pathname).toBe('/');
  });
  it('should render ResetCodePage components', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ResetCodePage />
      </Router>
    );

    expect(
      screen.getByText(
        'Please enter the reset code sent to your email to proceed further'
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter reset code')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByAltText('Password')).toBeInTheDocument();
    expect(screen.getByText('Enter Reset Code')).toBeInTheDocument();
  });

  it('should validate reset code input correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ResetCodePage />
      </Router>
    );
    const input = screen.getByPlaceholderText('Enter reset code');
    fireEvent.change(input, { target: { value: '12345678' } });
    expect(ResetCodeValidation('12345678')).toBeTruthy();
    fireEvent.change(input, { target: { value: 'abc12345' } });
    expect(ResetCodeValidation('abc12345')).toBeFalsy();
  });
});
