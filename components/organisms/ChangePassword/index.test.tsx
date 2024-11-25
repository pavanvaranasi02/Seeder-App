import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangePassword from '.';
import theme from '../../../theme';
import IconPath from '../../../utils/Constants';

describe('ChangePassword Component', () => {
  const mockHandlePassword = jest.fn();
  const mockHandleChangePassword = jest.fn();
  const mockHandleFormSubmit = jest.fn();

  const ChangePasswordDefault = () => {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChangePassword
          password=""
          changePassword=""
          handlePassword={mockHandlePassword}
          handleChangePassword={mockHandleChangePassword}
          handleFormSubmit={mockHandleFormSubmit}
        />
      </ThemeProvider>
    );
  };

  it('Checking Different Password Field', () => {
    const password = 'password123';
    const changePassword = 'password123';

    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChangePassword
          password={password}
          changePassword={changePassword}
          handlePassword={mockHandlePassword}
          handleChangePassword={mockHandleChangePassword}
          handleFormSubmit={mockHandleFormSubmit}
        />
      </ThemeProvider>
    );

    const ChangePasswordBtn = screen.getByRole('button', {
      name: 'Change Password',
    });
    expect(ChangePasswordBtn).toBeInTheDocument();
    expect(ChangePasswordBtn).toBeEnabled();
  });

  it('Checking icons existence', () => {
    ChangePasswordDefault();
    const passwordLockIcon = screen.getByAltText('Password Icon');
    expect(passwordLockIcon).toBeInTheDocument();
    expect(passwordLockIcon).toHaveAttribute('src', IconPath.Lock);

    const passwordEyeIcon = screen.getByAltText('Eye Icon');
    expect(passwordEyeIcon).toBeInTheDocument();
    expect(passwordEyeIcon).toHaveAttribute('src', IconPath.Eye);

    const changePasswordLockIcon = screen.getByAltText('Change Password Icon');
    expect(changePasswordLockIcon).toBeInTheDocument();
    expect(changePasswordLockIcon).toHaveAttribute('src', IconPath.Lock);
  });
});