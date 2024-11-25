import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUpPage, { initialState, reducer } from '.';
import * as services from '../../services';
import '@testing-library/jest-dom';
import { INVALID_CODE, INVALID_FORMAT } from '../../utils/Constants';


const mockNavigate = jest.fn();

jest.mock('../../services', () => ({
  CHECK_EMAIL: jest.fn(),
  CREATE_USER: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
describe('SignUpPage', () => {
  const setup = () => {
    render(
      <Router>
        <SignUpPage />
      </Router>
    );
  };
  
  test('renders SignUpPage component', () => {
    setup();
    expect(screen.getByText('Sign Up ✨')).toBeInTheDocument();
  });

test('navigates to login on login button click', () => {
    setup();
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to google login on Google sign up button click', () => {
    setup();
    const googleSignUpButton = screen.getByText(/Google/i);
    fireEvent.click(googleSignUpButton);
    expect(mockNavigate).toHaveBeenCalledWith('/google-login');
  });

  test('navigates to stripe login on Stripe sign up button click', () => {
    setup();
    const stripeSignUpButton = screen.getByText(/Stripe/i);
    fireEvent.click(stripeSignUpButton);
    expect(mockNavigate).toHaveBeenCalledWith('/stripe-login');
  });

  test('navigates to xero login on Xero sign up button click', () => {
    setup();
    const xeroSignUpButton = screen.getByText(/Xero/i);
    fireEvent.click(xeroSignUpButton);
    expect(mockNavigate).toHaveBeenCalledWith('/xero-login');
  });


  test('handles name change', () => {
    setup();
    const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  test('handles email change and validation', () => {
    setup();
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(emailInput.value).toBe('invalidemail');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });


  test('handles password change and validation', () => {
    setup();
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'Pass1' } });
    expect(passwordInput.value).toBe('Pass1');
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    expect(passwordInput.value).toBe('password1');
  });

  test('disables submit button if inputs are invalid', () => {
    setup();
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(submitButton).toBeDisabled();
  });

  test('enables submit button if inputs are valid', () => {
    setup();
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('handles form submission with valid data', async () => {
    (services.CHECK_EMAIL as jest.Mock).mockResolvedValue({ data: [] });
    (services.CREATE_USER as jest.Mock).mockResolvedValue({
      data: {
        id: '22b9',
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password1',
        availableCredit: 880000,
      },
    });
    setup();
    const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(services.CHECK_EMAIL).toHaveBeenCalledWith('test@example.com'));
   await waitFor(async () => {
    expect(services.CREATE_USER).toHaveBeenCalledWith('John Doe', 'test@example.com', 'password1');
  await waitFor (()=>expect(mockNavigate).toHaveBeenCalledWith('/'));
  });
  });

  test('reducer default case', () => {
    const action:{type:'INVALID_ACTION' ,payload:boolean} = { type: 'INVALID_ACTION',payload:false } ;
    const result = reducer(initialState, action) ;
    expect(result).toEqual(initialState);
  })


  test('handles form submission with existing email', async () => {
    (services.CHECK_EMAIL as jest.Mock).mockResolvedValue({ data: [{ email: 'test@example.com' }] });
    setup();
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(/Email already in use/i)).toBeInTheDocument());
  });

  test('handles form submission error during email check', async () => {
    (services.CHECK_EMAIL as jest.Mock).mockRejectedValue(new Error('Error'));
    setup();
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(/Error during email validation/i)).toBeInTheDocument());
  });

  test('handles form submission error during user creation', async () => {
    (services.CHECK_EMAIL as jest.Mock).mockResolvedValue({ data: [] });
    (services.CREATE_USER as jest.Mock).mockRejectedValue(new Error('Error'));
    setup();
    const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(/Error during signup/i)).toBeInTheDocument());
  });
  test('handles form submission with invalid email format', async () => {
    (services.CHECK_EMAIL as jest.Mock).mockResolvedValue({ data: [] });
    setup();
    const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
  
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => expect(screen.getByText(INVALID_FORMAT)).toBeInTheDocument());
  });
  
  test('handles form submission with invalid password format', async () => {
    (services.CHECK_EMAIL as jest.Mock).mockResolvedValue({ data: [] });
    setup();
    const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
  
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => expect(screen.getByText(INVALID_CODE)).toBeInTheDocument());
  });
 
  test('handles form submission when CHECK_EMAIL returns undefined', async () => {
    (services.CHECK_EMAIL as jest.Mock).mockResolvedValue(undefined);
    setup();
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(services.CHECK_EMAIL).toHaveBeenCalledWith('test@example.com');
      expect(services.CREATE_USER).toHaveBeenCalled();
    });
  });
});
