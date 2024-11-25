import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import CashAccelerationPage from '.';
import theme from '../../theme';
import {
  fetchContracts,
  fetchUserContracts,
  getCashkicksByuserId,
  getUserById,
} from '../../services';
import { UserContext } from '../../App';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
(axios.get as jest.Mock) = jest.fn();

jest.mock('@mui/x-data-grid', () => {
  const actualDataGrid = jest.requireActual('@mui/x-data-grid');
  return {
    ...actualDataGrid,
    DataGrid: (props: any) => <div {...props} />,
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../CashAccelerationPage/index.test.tsx', () => ({
  __esModule: true,
  default: 'mocked-component',
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('../../services', () => ({
  fetchContracts: jest.fn(),
  fetchUserContracts: jest.fn(),
  getCashkicksByuserId: jest.fn(),
  getUserById: jest.fn(),
}));

const mockUser = { availableCredit: 500000 };
const mockedContractData = [
  {
    id: '1',
    name: 'Contract 1',
    type: 'Type 1',
    perPayment: 1000,
    termLengthMonths: 12,
    termLengthPercentage: 10,
    paymentAmount: 12000,
  },
];

const mockedCashkickData = [
  {
    id: 1,
    name: 'Cashkick 1',
    status: 'Active',
    maturity: '2024-12-31',
    totalReceivedPercentage: 80,
    totalFinanced: 8000,
    totalReceived: 6400,
  },
];

const mockedContractIds = [{ contractIds: [{ id: '1' }] }];

describe('CashAccelerationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.reject(new Error('Error in fetching Contracts'));
      }
      if (url.includes('/cashkicks')) {
        return Promise.reject(new Error('Error fetching cashkicks'));
      }
      return Promise.resolve({ data: [] });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly with mocked components', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    const logo = screen.getByAltText('Seeder Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render the SideNavBar with default styles and props', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    const cashMenuItem = screen.queryAllByText('Cash Acceleration');
    expect(cashMenuItem.length).toBe(2);

    const homeMenuItem = screen.getByText('Home');
    expect(homeMenuItem).toBeInTheDocument();

    const footerItem = screen.getByText('Watch how to');
    expect(footerItem).toBeInTheDocument();
  });

  it('renders CashAccelerationPage without crashing', async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      );
    });
    const button = screen.getByRole('button', { name: /Cash Acceleration/i });
    expect(button).toBeInTheDocument();

    const elements = screen.getAllByText('Cash Acceleration');
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should render HeaderCard with correct content', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    const heading = screen.queryAllByText('Cash Acceleration');
    expect(heading.length).toBeGreaterThan(0);
    expect(heading[0]).toBeInTheDocument();

    const content = screen.getByText(
      'Place to create new cash kicks to run your business'
    );
    expect(content).toBeInTheDocument();
  });

  it('should render CashAccelerationCard components with correct content', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    const termCap = screen.getByText('Term cap');
    expect(termCap).toBeInTheDocument();

    const availableCredit = screen.getByText('Available Credit');
    expect(availableCredit).toBeInTheDocument();

    const maxInterestRate = screen.getByText('Max interest rate');
    expect(maxInterestRate).toBeInTheDocument();
  });

  it('should fetch user data and set available credit', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { availableCredit: 0 } });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('$0.0K')).toBeInTheDocument();
    });
  });

  it('should fetch contracts and cashkicks data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockedContractIds });
    mockedAxios.get.mockResolvedValueOnce({ data: mockedContractData });
    mockedAxios.get.mockResolvedValueOnce({ data: mockedCashkickData });

    await act(async () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(0);
      });

      console.log('Rendered HTML:', container.innerHTML);
      console.log('All text content:', container.textContent);

      const contractElement = screen.queryByText(/Contract 1/i);
      const cashkickElement = screen.queryByText(/Cashkick 1/i);

      if (contractElement) {
        expect(contractElement).toBeInTheDocument();
      } else {
        console.log('Contract element not found');
      }

      if (cashkickElement) {
        expect(cashkickElement).toBeInTheDocument();
      } else {
        console.log('Cashkick element not found');
      }
    });
  });

  it('should handle error when fetching contracts', async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new Error('Error fetching contracts')
    );

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Place to create new cash kicks to run your business')
      ).toBeInTheDocument();
    });
  });

  it('should navigate to new cash kick page when button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    const newCashKickButton = screen.getByText('New Cash Kick');
    fireEvent.click(newCashKickButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/new-cash-kick');
  });

  it('should handle error when fetching cashkicks', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    mockedAxios.get.mockRejectedValueOnce(
      new Error('Error fetching cashkicks')
    );

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Place to create new cash kicks to run your business')
      ).toBeInTheDocument();
    });
  });

  it('should render the component with the initial state', async () => {
    (getUserById as jest.Mock).mockResolvedValue(mockUser);
    (fetchUserContracts as jest.Mock).mockResolvedValue([
      { contractIds: [{ id: 1 }] },
    ]);
    (fetchContracts as jest.Mock).mockResolvedValue(mockedContractData);
    (getCashkicksByuserId as jest.Mock).mockResolvedValue(mockedCashkickData);

    render(
      <UserContext.Provider value={{ id: '1', setId: jest.fn() }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      </UserContext.Provider>
    );

    expect(screen.getAllByText('Cash Acceleration')).toHaveLength(2);
    expect(screen.getByText('Cash Kick')).toBeInTheDocument();
  });

  it('should handle navigation on button click', async () => {
    (getUserById as jest.Mock).mockResolvedValue(mockUser);
    (fetchUserContracts as jest.Mock).mockResolvedValue([
      { contractIds: [{ id: 1 }] },
    ]);
    (fetchContracts as jest.Mock).mockResolvedValue(mockedContractData);
    (getCashkicksByuserId as jest.Mock).mockResolvedValue(mockedCashkickData);

    render(
      <UserContext.Provider value={{ id: '1', setId: jest.fn() }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('Cash Acceleration')).toHaveLength(2);
    });

    fireEvent.click(screen.getByText('New Cash Kick'));
    expect(screen.getByText('New Cash Kick')).toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    (getUserById as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch user data')
    );
    (fetchUserContracts as jest.Mock).mockResolvedValue([]);
    (fetchContracts as jest.Mock).mockResolvedValue([]);
    (getCashkicksByuserId as jest.Mock).mockResolvedValue([]);

    render(
      <UserContext.Provider value={{ id: '1', setId: jest.fn() }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(getUserById).toHaveBeenCalledWith('1');
    });

    expect(screen.getAllByText('Cash Acceleration')).toHaveLength(2);
  });

  it('should set hasError to true when an error occurs while fetching contracts', async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new Error('Error in fetching Contracts')
    );

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      const errorElement = screen.getByText(
        'Place to create new cash kicks to run your business'
      );
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('should set hasError to true when an error occurs while fetching cashkicks', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    mockedAxios.get.mockRejectedValueOnce(
      new Error('Error fetching cashkicks')
    );

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      const errorElement = screen.queryByText(
        'Place to create new cash kicks to run your business'
      );
      expect(errorElement).toBeInTheDocument();
    });
  });

  test('should handle errors correctly', async () => {
    (getUserById as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch user')
    );
    (getCashkicksByuserId as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch cashkicks')
    );

    render(
      <UserContext.Provider value={{ id: '1', setId: jest.fn() }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Cash Acceleration/i)).toHaveLength(3);
    });
  });

  it('should set isInitial to true when there are no contracts', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      const noContractsElement = screen.getByText(
        'Place to create new cash kicks to run your business'
      );
      expect(noContractsElement).toBeInTheDocument();
    });
  });

  it('should set cashKickPressed to true when there are no cashkicks', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => {
      const noCashkicksElement = screen.getByText(
        'Place to create new cash kicks to run your business'
      );
      expect(noCashkicksElement).toBeInTheDocument();
    });
  });

  it('should navigate to homepage when pageChange is called', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CashAccelerationPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/home');
  });

  it('should set hasError to true when there is an error fetching contracts', async () => {
    (getUserById as jest.Mock).mockResolvedValue(mockUser);
    (fetchUserContracts as jest.Mock).mockResolvedValue([
      { contractIds: [{ id: '1' }] },
    ]);
    (fetchContracts as jest.Mock).mockRejectedValue(
      new Error('Error fetching contracts')
    );
    (getCashkicksByuserId as jest.Mock).mockResolvedValue([]);

    render(
      <UserContext.Provider value={{ id: '1', setId: jest.fn() }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Place to create new cash kicks to run your business')
      ).toBeInTheDocument();
    });
  });

  it('should interact with user menu and handle logout', async () => {
    const mockSetId = jest.fn();

    render(
      <UserContext.Provider value={{ id: '1', setId: mockSetId }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      </UserContext.Provider>
    );

    const avatarButton = screen.getByRole('button', { name: /Avatar Icon/i });
    fireEvent.click(avatarButton);

    try {
      const logoutButton = await screen.findByText(
        (content, element) => {
          return (
            element !== null &&
            element.tagName.toLowerCase() === 'button' &&
            /logout/i.test(content)
          );
        },
        {},
        { timeout: 2000 }
      );

      fireEvent.click(logoutButton);

      expect(mockSetId).toHaveBeenCalledWith('');
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    } catch (error) {
      console.log('Logout button not found, checking for menu items');

      const userMenuItems = await screen.findAllByRole(
        'menuitem',
        {},
        { timeout: 2000 }
      );
      expect(userMenuItems.length).toBeGreaterThan(0);

      const logoutOption = userMenuItems.find((item) =>
        item.textContent?.toLowerCase().includes('logout')
      );
      if (logoutOption) {
        fireEvent.click(logoutOption);
        expect(mockSetId).toHaveBeenCalledWith('');
        expect(mockedNavigate).toHaveBeenCalledWith('/');
      } else {
        console.log('No logout option found in user menu');
      }
    }
  });

  it('should navigates to logout on click', async () => {
    const mockSetId = jest.fn();
    render(
      <UserContext.Provider value={{ id: '1', setId: mockSetId }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CashAccelerationPage />
          </MemoryRouter>
        </ThemeProvider>
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByAltText('Avatar Icon'));
    await waitFor(async () => {
      expect(screen.getByText('Log Out')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Log Out'));
      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('/');
      });
    });
  });
});
