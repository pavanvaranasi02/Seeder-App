import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword, { ForgotPasswordProps } from './';
import { ThemeProvider } from '@mui/material';
import theme from '../../../theme';

describe('ForgotPassword', () => {
  const mockProps: ForgotPasswordProps = {
    description: 'Test description',
    buttonLabel: 'Reset Password',
    resetMailHeading: 'Email sent',
    resetMailSubText1:'We have sent mail to',
    resetMailSubText2:' with reset password instructions',
    emailEntered:'johndoe@gmail.com',
    onButtonClick: jest.fn(),
  };

  const renderComponent = (props: ForgotPasswordProps = mockProps) => {
    return render(
      <ThemeProvider theme={theme}>
        <ForgotPassword {...props} />
      </ThemeProvider>
    );
  };

  it('renders the component with description, buttonLabel,resetMailHeading props', () => {
    renderComponent();
    
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });

  it('calls onButtonClick when button is clicked', () => {
    renderComponent();
    
    fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
    expect(mockProps.onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('renders email in correct color', () => {
    renderComponent();
    
    const emailElement = screen.getByText('johndoe@gmail.com');
    expect(emailElement).toHaveStyle(`color: ${theme.palette.primary.purple['400']}`);
  });

  it('handles resetMailSubext1 and resetMailSubText2 without email', () => {
    const propsWithoutEmail = {
      ...mockProps,
      resetMailSubText1:'We have sent mail to',
      resetMailSubText2:' with reset password instructions',
    };
    renderComponent(propsWithoutEmail);
    
    expect(screen.getByText('We have sent mail to with reset password instructions')).toBeInTheDocument();
 
  });

  it('renders the component without description', () => {
    const propsWithoutDescription = { ...mockProps, description: undefined };
    renderComponent(propsWithoutDescription);
    
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});