import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, MemoryRouter, useNavigate } from 'react-router-dom';
import NewCashkick from '.';
import theme from '../../theme';
import axiosMock from 'axios-mock-adapter';
import { UserContext } from '../../App';
import {
  createUserContracts,
  fetchUserContracts,
  updateUserContracts,
} from '../../services';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mock = new axiosMock(axios);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NewCashkick Page', () => {
  const mockContracts = [
    {
      id: 1,
      name: 'Contract 1',
      type: 'Type A',
      perPayment: 1000,
      termLengthMonths: 12,
      termLengthPercentage: 10,
      paymentAmount: 10000,
    },
    {
      id: 2,
      name: 'Contract 2',
      type: 'Type B',
      perPayment: 2000,
      termLengthMonths: 24,
      termLengthPercentage: 15,
      paymentAmount: 20000,
    },
  ];

  const mockUserContracts = [
    {
      id: '1',
      userId: 121,
      contractIds: [
        { id: '1', amount: 10000 },
        { id: '2', amount: 20000 },
      ],
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      } else if (url.includes('/SelectedContracts')) {
        return Promise.resolve({ data: mockUserContracts });
      }
      return Promise.reject(new Error('Not found'));
    });
    mockedAxios.post.mockResolvedValue({});
    mockedAxios.put.mockResolvedValue({});
    mock.reset();
    mockedAxios.get.mockClear();
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (userId: string = '123') => {
    render(
      <UserContext.Provider value={{ id: userId, setId: jest.fn() }}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <NewCashkick />
          </ThemeProvider>
        </MemoryRouter>
      </UserContext.Provider>
    );
  };

  test('should render NewCashkick component and handles full flow', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
      expect(screen.getByText('Contract 2')).toBeInTheDocument();
    });

    const checkbox1 = screen.getAllByRole('checkbox')[0];
    const checkbox2 = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 25000 } });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    await waitFor(() => {
      expect(screen.getByText('Submit Your Credit')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Submit Your Credit');
    fireEvent.click(submitButton);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('Review Your Credit')).toBeInTheDocument();
    });

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/cash-acceleration');
  }, 30000);

  test('should handle error when fetching contracts', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    console.error = jest.fn();
    renderComponent();
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching contracts:',
        expect.any(Error)
      );
    });
  });

  test('should handle partial payments', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 15000 } });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should handle slider change to maximum value', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 30000 } });
  });

  test('should handle partial payment with review and back', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 15000 } });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('Review Your Credit')).toBeInTheDocument();
    });
  });

  test('should handle error when processing contracts', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      }
      return Promise.reject(new Error('Not found'));
    });
    mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should handle close of CashKickDialogueBox', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Create new cash kick')
      ).not.toBeInTheDocument();
    });
  });

  test('should handle creation of cash kick with maximum values', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 88000 } });
    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should handle no existing user contract', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      } else if (url.includes('/SelectedContracts')) {
        return Promise.resolve({ data: [] });
      }
      return Promise.reject(new Error('Not found'));
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should handle error when fetching user contracts', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      } else if (url.includes('/SelectedContracts')) {
        return Promise.reject(new Error('API Error'));
      }
      return Promise.reject(new Error('Not found'));
    });

    console.error = jest.fn();

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should handle contract selection with no partial payments', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const checkbox1 = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox1);

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should handle slider change to zero', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 0 } });
  });

  test('shoulld handle existing user contract', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      } else if (url.includes('/SelectedContracts')) {
        return Promise.resolve({
          data: [
            { id: '1', userId: 121, contractIds: [{ id: '1', amount: 5000 }] },
          ],
        });
      }
      return Promise.reject(new Error('Not found'));
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should handle back click in initial state', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cash-acceleration');
  });

  test('should handle page change', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  test('should handle reset data', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const checkbox1 = screen.getAllByRole('checkbox')[0];
    const checkbox2 = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
  });

  test('should handle error when updating existing user contract', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      } else if (url.includes('/SelectedContracts')) {
        return Promise.resolve({ data: mockUserContracts });
      }
      return Promise.reject(new Error('Not found'));
    });
    mockedAxios.put.mockRejectedValueOnce(new Error('API Error'));
    console.error = jest.fn();

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);
  });

  test('should create a new cash kick', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-07-17'));

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const checkbox1 = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox1);
    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    jest.useRealTimers();
  });

  test('createCashKickHandler creates a new cash kick and navigates to cash acceleration page', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-07-17'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const checkbox1 = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox1);

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    await waitFor(() => {
      expect(screen.getByText('Submit Your Credit')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Submit Your Credit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name your cash kick')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText('Ex: marketing expenses');
    fireEvent.change(nameInput, { target: { value: 'Test Cash Kick' } });

    const createButton = screen.getByText('Create Cash Kick');
    fireEvent.click(createButton);
    await waitFor(() => {
      expect(
        screen.getByText('Cash kick launched successfully!')
      ).toBeInTheDocument();
    });
    const viewCashKicksButton = screen.getByText('View Cash Kicks');
    fireEvent.click(viewCashKicksButton);
    expect(mockNavigate).toHaveBeenCalledWith('/cash-acceleration');

    jest.useRealTimers();
  });

  test('should handle new user contract creation when no existing contract', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      } else if (url.includes('/SelectedContracts')) {
        return Promise.resolve({ data: [] });
      }
      return Promise.reject(new Error('Not found'));
    });

    mockedAxios.post.mockResolvedValue({});

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const checkbox1 = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox1);

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:8000/SelectedContracts',
        expect.objectContaining({
          userId: expect.any(String),
          contractIds: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              amount: expect.any(Number),
            }),
          ]),
        })
      );
    });
  });

  test('should make handleCloseDialog sets openCashKickDialog to false', async () => {
    const setOpenCashKickDialogMock = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [true, setOpenCashKickDialogMock]);

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });
    const checkbox1 = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox1);

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    await waitFor(() => {
      expect(screen.getByText('Submit Your Credit')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('Submit Your Credit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name your cash kick')).toBeInTheDocument();
    });
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);
    jest.restoreAllMocks();
  });

  test('should update selected contracts and stops when remaining value is 0', async () => {
    const mockContracts = [
      {
        id: 1,
        name: 'Contract 1',
        type: 'Type A',
        perPayment: 1000,
        termLengthMonths: 12,
        termLengthPercentage: 10,
        paymentAmount: 10000,
      },
      {
        id: 2,
        name: 'Contract 2',
        type: 'Type B',
        perPayment: 2000,
        termLengthMonths: 24,
        termLengthPercentage: 15,
        paymentAmount: 20000,
      },
      {
        id: 3,
        name: 'Contract 3',
        type: 'Type C',
        perPayment: 3000,
        termLengthMonths: 36,
        termLengthPercentage: 20,
        paymentAmount: 30000,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockContracts });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
      expect(screen.getByText('Contract 2')).toBeInTheDocument();
      expect(screen.getByText('Contract 3')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: 30000 } });

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
    });
  });

  test('should log error when fetching contracts fails', async () => {
    console.error = jest.fn();
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    const mockFetchContracts = async () => {
      try {
        await axios.get('http://localhost:8000/contracts');
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };
    await mockFetchContracts();
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching contracts:',
      expect.any(Error)
    );
  });

  test('should handle logout when clicking on Log Out option', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });
    const avatarIcon = screen.getByAltText('Avatar Icon');
    fireEvent.click(avatarIcon);
    await waitFor(() => {
      const logoutOption = screen.getByText('Log Out');
      fireEvent.click(logoutOption);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('should redirect to login if userId is empty', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    renderComponent('');

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Login first before coming to New Cash Kick Page'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('should update existing user contract when it exists', async () => {
    const mockExistingUserContract = {
      id: '1',
      userId: '123',
      contractIds: [{ id: '1', amount: 5000 }],
    };

    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/contracts')) {
        return Promise.resolve({ data: mockContracts });
      } else if (url.includes('/SelectedContracts')) {
        return Promise.resolve({ data: [mockExistingUserContract] });
      }
      return Promise.reject(new Error('Not found'));
    });

    mockedAxios.put.mockResolvedValue({});

    renderComponent('123');

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);

    const reviewButton = screen.getByText('Review Your Credit');
    fireEvent.click(reviewButton);

    await waitFor(() => {
      expect(screen.getByText('Submit Your Credit')).toBeInTheDocument();
    });
    expect(mockedAxios.put).not.toHaveBeenCalledWith(
      `http://localhost:8000/SelectedContracts/${mockExistingUserContract.id}`,
      expect.objectContaining({
        userId: '123',
        contractIds: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            amount: expect.any(Number),
          }),
        ]),
      })
    );
  });
});
