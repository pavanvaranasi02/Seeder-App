import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ChangePasswordPage from './';
import { UserContext } from '../../App';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ChangePasswordPage', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: '1',
          name: 'User1',
          email: 'Pavan@gmail.com',
          password: 'oldPassword',
          availableCredit: 100,
        },
        {
          id: '2',
          name: 'User2',
          email: 'NotPavan@gmail.com',
          password: 'anotherOldPassword',
          availableCredit: 200,
        },
      ],
    });

    mockedAxios.put.mockResolvedValue({
      data: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (contextValue: {
    id: string;
    setId: (id: string) => void;
  }) => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={contextValue}>
          <ChangePasswordPage />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  it('should render the component correctly with initial state', () => {
    renderComponent({ id: '1', setId: jest.fn() });

    expect(screen.getByTestId('change-password-component')).toBeInTheDocument();
  });

  it('should fetch user email on mount and set the email state', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: '1',
        name: 'User1',
        email: 'Pavan@gmail.com',
        password: 'oldPassword',
      },
    });

    renderComponent({ id: '1', setId: jest.fn() });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:8000/user/1'
      );
      expect(
        screen.queryByTestId('change-password-component')
      ).toBeInTheDocument();
    });
  });

  it('handleChangePassword updates the changePassword state and submits the form', async () => {
    renderComponent({ id: '1', setId: jest.fn() });

    const allPasswords = screen.getAllByPlaceholderText('');
    const passwordInput = allPasswords[0];
    const changePasswordInput = allPasswords[1];

    fireEvent.change(passwordInput, { target: { value: 'abcdefg1' } });
    fireEvent.change(changePasswordInput, { target: { value: 'abcdefg1' } });

    // Check that inputs have the correct values
    expect(passwordInput).toHaveValue('abcdefg1');
    expect(changePasswordInput).toHaveValue('abcdefg1');

    const changePasswordButton = screen.getByRole('button', {
      name: 'Change Password',
    });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      // Update to PATCH
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        'http://localhost:8000/user/1',
        expect.objectContaining({ password: 'abcdefg1' })
      );
      expect(screen.getByText('Password reset successful')).toBeInTheDocument();
      expect(
        screen.getByText('Click on the button below to proceed to login')
      ).toBeInTheDocument();
    });

    const loginButton = screen.getByRole('button', { name: 'Login Now' });
    fireEvent.click(loginButton);
  });

  it('should update user password after successful form submission', async () => {
    renderComponent({ id: '1', setId: jest.fn() });

    const allPasswords = screen.getAllByPlaceholderText('');
    const passwordInput = allPasswords[0];
    const changePasswordInput = allPasswords[1];

    fireEvent.change(passwordInput, { target: { value: 'newPassword1' } });
    fireEvent.change(changePasswordInput, {
      target: { value: 'newPassword1' },
    });

    const changePasswordButton = screen.getByRole('button', {
      name: 'Change Password',
    });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        'http://localhost:8000/user/1',
        expect.objectContaining({ password: 'newPassword1' })
      );
      expect(screen.getByText('Password reset successful')).toBeInTheDocument();
      expect(
        screen.getByText('Click on the button below to proceed to login')
      ).toBeInTheDocument();
    });

    const loginButton = screen.getByRole('button', { name: 'Login Now' });
    fireEvent.click(loginButton);
  });

  it('should handle user email not matching the hardcoded email', async () => {
    renderComponent({ id: '1', setId: jest.fn() });

    const allPasswords = screen.getAllByPlaceholderText('');
    const passwordInput = allPasswords[0];
    const changePasswordInput = allPasswords[1];

    fireEvent.change(passwordInput, { target: { value: 'abcdefg1' } });
    fireEvent.change(changePasswordInput, { target: { value: 'abcdefg1' } });

    const changePasswordButton = screen.getByRole('button', {
      name: 'Change Password',
    });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      console.log('Mocked PATCH Calls:', mockedAxios.patch.mock.calls); // Update to PATCH
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        'http://localhost:8000/user/1',
        expect.objectContaining({ password: 'abcdefg1' })
      );
      expect(screen.getByText('Password reset successful')).toBeInTheDocument();
      expect(
        screen.getByText('Click on the button below to proceed to login')
      ).toBeInTheDocument();
    });

    const initialUserData = [
      {
        id: '1',
        name: 'User1',
        email: 'Pavan@gmail.com',
        password: 'oldPassword',
        availableCredit: 100,
      },
      {
        id: '2',
        name: 'User2',
        email: 'NotPavan@gmail.com',
        password: 'anotherOldPassword',
        availableCredit: 200,
      },
    ];

    expect(initialUserData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'NotPavan@gmail.com',
          password: 'anotherOldPassword',
        }),
      ])
    );
  });

  it('should show an error if passwords do not match', async () => {
    renderComponent({ id: '1', setId: jest.fn() });

    const allPasswords = screen.getAllByPlaceholderText('');
    const passwordInput = allPasswords[0];
    const changePasswordInput = allPasswords[1];

    fireEvent.change(passwordInput, { target: { value: 'validPassword1' } });
    fireEvent.change(changePasswordInput, {
      target: { value: 'differentPassword1' },
    });

    const changePasswordButton = screen.getByRole('button', {
      name: 'Change Password',
    });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  test('redirects to login if userId is empty', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    renderComponent({ id: '', setId: jest.fn() });

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Login/ForgotPassword first before coming to Change Password Page'
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();
    mockNavigate.mockClear();
  });

  it('should show an error if passwords are not in the correct format', async () => {
    renderComponent({ id: '1', setId: jest.fn() });

    const allPasswords = screen.getAllByPlaceholderText('');
    const passwordInput = allPasswords[0];
    const changePasswordInput = allPasswords[1];

    fireEvent.change(passwordInput, { target: { value: 'short' } }); // Invalid format
    fireEvent.change(changePasswordInput, { target: { value: 'short' } }); // Invalid format

    const changePasswordButton = screen.getByRole('button', {
      name: 'Change Password',
    });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(
        screen.getByText('Passwords are not in correct format')
      ).toBeInTheDocument();
    });
  });

  it('should show an error if passwords do not match', async () => {
    renderComponent({ id: '1', setId: jest.fn() });

    const allPasswords = screen.getAllByPlaceholderText('');
    const passwordInput = allPasswords[0];
    const changePasswordInput = allPasswords[1];

    fireEvent.change(passwordInput, { target: { value: 'validPassword1' } });
    fireEvent.change(changePasswordInput, {
      target: { value: 'differentPassword1' },
    }); // Different from the first

    const changePasswordButton = screen.getByRole('button', {
      name: 'Change Password',
    });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });
});
