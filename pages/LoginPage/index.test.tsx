import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '.';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
    mockNavigate.mockClear();
  });

  it('should render the LoginPage component', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Business Analysis/i)).toBeInTheDocument();
  });

  it('should navigate to ForgotPassword page on Forgot Password click', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Forgot Password/i));
    expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
  });

  it('should navigate to GoogleLogin page on Google Login click', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText(/Google/i));
    expect(mockNavigate).toHaveBeenCalledWith('/google-login');
  });

  it('should navigate to StripeLogin page on Stripe Login click', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText(/Stripe/i));
    expect(mockNavigate).toHaveBeenCalledWith('/stripe-login');
  });

  it('should navigate to XeroLogin page on Xero Login click', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText(/Xero/i));
    expect(mockNavigate).toHaveBeenCalledWith('/xero-login');
  });

  it('should navigate to SignUp page on Sign Up click', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Sign Up/i));
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  it('should enable the Continue button when valid email and password are provided', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });

    expect(screen.getByText(/Continue/i)).not.toBeDisabled();
  });

  it('should not enable the Continue button when email or password is empty', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });

    expect(screen.getByText(/Continue/i)).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: '' },
    });

    expect(screen.getByText(/Continue/i)).toBeDisabled();
  });

  it('should show error message for invalid email and password', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [], 
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText(/Continue/i));
    await waitFor(() => {
      const errorMessages = screen.queryAllByText(/Invalid email or password./i);
      expect(errorMessages).toHaveLength(2);
      expect(errorMessages[0]).toBeInTheDocument();
      expect(errorMessages[1]).toBeInTheDocument();
    });
  });

  it('should navigate to Continue page for valid credentials', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [{ email: 'test@example.com', password: 'password123' }],
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/Continue/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
