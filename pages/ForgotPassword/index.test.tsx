import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AxiosResponse } from 'axios';
import ForgotPasswordPage from './';
import { CHECK_EMAIL } from '../../services';

jest.mock('../../services');

const mockedCheckEmail = CHECK_EMAIL as jest.MockedFunction<typeof CHECK_EMAIL>;

describe('ForgotPasswordPage', () => {

  const mockAxiosResponse = (data: any): AxiosResponse => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {
      'content-type': 'application/json',
    },
    config: {
      headers: {
        'content-type': 'application/json',
      },
    } as any,
  });
  
  it('renders initial state', () => {
    render(<ForgotPasswordPage />, { wrapper: BrowserRouter });
    
    expect(screen.getByPlaceholderText('Enter your email id')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('handles reset password click with invalid email', async () => {
    mockedCheckEmail.mockResolvedValueOnce(mockAxiosResponse([]));

    render(<ForgotPasswordPage />, { wrapper: BrowserRouter });

    const emailInput = screen.getByPlaceholderText('Enter your email id');
    const resetButton = screen.getByText('Reset Password');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('invalid@example.com');
    });
  });

  it('handles reset password click with null response', async () => {
    mockedCheckEmail.mockResolvedValueOnce(null);
    
    render(<ForgotPasswordPage />, { wrapper: BrowserRouter });

    const emailInput = screen.getByPlaceholderText('Enter your email id');
    const resetButton = screen.getByText('Reset Password');
    fireEvent.change(emailInput, { target: { value: 'null@example.com' } });

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByText('Not a valid user')).toBeInTheDocument();
      expect(emailInput).toHaveValue('null@example.com');
    });
});


  it('handles reset password click with error response', async () => {
    mockedCheckEmail.mockRejectedValueOnce(new Error('Network error'));

    render(<ForgotPasswordPage />, { wrapper: BrowserRouter });

    const emailInput = screen.getByPlaceholderText('Enter your email id');
    const resetButton = screen.getByText('Reset Password');

    fireEvent.change(emailInput, { target: { value: 'error@example.com' } });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByText('Error during authentication')).toBeInTheDocument();
      expect(emailInput).toHaveValue('error@example.com');
    });
  });

  it('navigates to reset code page on continue click', async () => {
    const mockUser = { email: 'test@example.com' };
    mockedCheckEmail.mockResolvedValueOnce(mockAxiosResponse([mockUser]));

    render(<ForgotPasswordPage />, { wrapper: BrowserRouter });

    const emailInput = screen.getByPlaceholderText('Enter your email id');
    const resetButton = screen.getByText('Reset Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(resetButton);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Continue'));
    });

    expect(window.location.pathname).toBe('/reset-code-page');
  });

  it('navigates to login page on login button click', async () => {
    render(<ForgotPasswordPage />, { wrapper: BrowserRouter });

    const loginButton = screen.getByText('Login');

    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe('/');
  });
});
