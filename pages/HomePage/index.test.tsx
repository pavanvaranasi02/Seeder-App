import React from 'react';
import { UserContext } from '../../App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import HomePage, { initialState, reducer } from '.';
import theme from '../../theme';
import IconPath from '../../utils/Constants';
import * as services from '../../services';

jest.mock('../../services');

const mockCashKicksData = [
  {
    id: '1',
    userId: '123',
    name: 'CashKick 1',
    status: 'active',
    maturity: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    totalRecievedMonths: 12,
    totalRecievedPercentage: 10,
    totalFinanced: 100000,
    totalReceived: 10000,
  },
];

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({ data: mockCashKicksData });

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderHomePage = (userId: string = '123') => {
  console.log('User id from test file is', userId);
  return render(
    <UserContext.Provider value={{ id: userId, setId: jest.fn() }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HomePage onFailureFunc={jest.fn()} onConnectFunc={jest.fn()} />
        </ThemeProvider>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('throws error if getData returns empty array', async () => {
    // Mock getData to return an empty array
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (services.getData as jest.Mock).mockResolvedValue([]);

    renderHomePage('123');

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error in fetchCashKicksData:',
        new Error('No maturity Dates')
      );
    });

    // Clear mocks for the next test
    consoleErrorSpy.mockClear();
  });

  test('renders HomePage successfully when user does not have any cash kicks', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Failed to fetch Cash kicks'));
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    renderHomePage('1');

    // Wait for the component to render and for the error to be logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error in fetchCashKicksData:',
        expect.any(Error)
      );
    });

    // Verify that the components are rendered
    expect(screen.getByText('Seeder')).toBeInTheDocument();

    const avatar = screen.getByAltText('Avatar Icon');
    const icon = screen.getByAltText('Arrow Drop Down Icon');

    expect(avatar).toHaveAttribute('src', IconPath.avatarImg);
    expect(icon).toHaveAttribute('src', IconPath.arrowDropDownIcon);

    expect(
      screen.getByText('Congratulations you are ready to start!')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'New Cash Kick' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your Payments')).toBeInTheDocument();
    expect(
      screen.getByText('You don’t have any Cash Kick')
    ).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });

  test('Checks for Navigation', async () => {
    renderHomePage('1');
    fireEvent.click(screen.getByText('Cash Acceleration'));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/cash-acceleration');
    });

    fireEvent.click(screen.getByText('New Cash Kick'));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/new-cash-kick');
    });

    fireEvent.click(screen.getByAltText('Avatar Icon'));
    await waitFor(async () => {
      expect(screen.getByText('Log Out')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Log Out'));
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });
  });

  test('handles reducer default, update, and success cases', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION',
      payload: {
        paymentsData: [
          {
            id: '1',
            dueDate: ['Oct 19,2024', '31 days'],
            status: 'active',
            expectedAmount: '17000',
            outStanding: '12000',
          },
        ],
        totalOutstanding: 0,
        dueAmount: 0,
      },
    };
    const nextStateOfUnknownAction = reducer(initialState, unknownAction);

    expect(nextStateOfUnknownAction).toEqual(initialState);

    const updateAction = {
      type: 'UPDATE_OUTSTANDING_AMOUNT',
      payload: {
        paymentsData: [
          {
            id: '1',
            dueDate: ['Oct 19,2024', '31 days'],
            status: 'active',
            expectedAmount: '17000',
            outStanding: '12000',
          },
        ],
        totalOutstanding: 120000,
        dueAmount: 10000,
      },
    };
    const nextStateOfUpdateAction = reducer(initialState, updateAction);

    expect(nextStateOfUpdateAction).toEqual({
      ...initialState,
      cashKickAmount: 760000,
      outstandingAmount: 120000,
      paymentDeductionAmount: 10000,
    });

    const successAction = {
      type: 'FETCH_SUCCESS',
      payload: {
        paymentsData: [
          {
            id: '1',
            dueDate: ['Oct 19,2024', '31 days'],
            status: 'active',
            expectedAmount: '17000',
            outStanding: '12000',
          },
        ],
        totalOutstanding: 120000,
        dueAmount: 10000,
      },
    };
    const nextStateOfSuccessAction = reducer(initialState, successAction);

    expect(nextStateOfSuccessAction).toEqual({
      ...initialState,
      cashKickInfoAvailable: true,
      yourPaymentsRows: [
        {
          id: '1',
          dueDate: ['Oct 19,2024', '31 days'],
          status: 'active',
          expectedAmount: '17000',
          outStanding: '12000',
        },
      ],
    });
  });

  test('renders HomePage and fetches data successfully', async () => {
    (services.getData as jest.Mock).mockResolvedValue(mockCashKicksData);

    renderHomePage('123');

    await waitFor(() => {
      expect(services.getData).toHaveBeenCalledWith('123');
      expect(screen.getByText('Due in 30 day(s)')).toBeInTheDocument();
      expect(screen.getByText('Outstanding amount')).toBeInTheDocument();
    });
  });
});
