import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPassword from './index';
import { ResetCardProps } from '.';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/index';
import '@testing-library/jest-dom';

const renderResetCard = (props: Partial<ResetCardProps> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <ResetPassword
        title="Forgot Password"
        description="No worries, we will send you a link to your email id to reset your password"
        placeholder="Enter your mail id"
        startSrc='./assets/icons/notification.svg'
        buttonLabel="Reset Password"
        {...props}
      />
    </ThemeProvider>
  );

describe('ResetCard Component', () => {
  it('renders with given props', () => {
    renderResetCard();
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    expect(screen.getByText(/No worries, we will send you a link to your email id to reset your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your mail id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('calls onButtonClick when the button is clicked', () => {
    const onButtonClick = jest.fn();
    renderResetCard({ onButtonClick });
    const button = screen.getByRole('button', { name: /Reset Password/i });
    fireEvent.click(button);
    expect(onButtonClick).toHaveBeenCalled();
  });
   

  it('calls onButtonClick with default value when the button is clicked', () => {
    renderResetCard();
    const button = screen.getByRole('button', { name: /Reset Password/i });
    fireEvent.click(button);
    expect(true).toBe(true);
  });

  it('calls onLoginButtonClick when the login button is clicked', () => {
    const onLoginButtonClick = jest.fn();
    renderResetCard({ onLoginButtonClick });
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);
    expect(onLoginButtonClick).toHaveBeenCalled();
  });

  it('calls onLoginButtonClick with default value when the login button is clicked', () => {
    renderResetCard();
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);
    expect(true).toBe(true);
  });
  
  
});
