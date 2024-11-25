import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import CashAcceleration from './index';
import theme from '../../../theme';

const mockMyContractsRows = [{ id: 1, contractName: 'Contract 1', status: 'Active' }];
const mockMyContractsColumns = [{ field: 'contractName', headerName: 'Contract Name' }];
const mockMyCashKickRows = [{ id: 1, name: 'My first advance', status: 'Pending' }];
const mockMyCashKickColumns = [{ field: 'kickName', headerName: 'Kick Name' }];

const renderComponent = (props:any) => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CashAcceleration {...props} />
    </ThemeProvider>
  );
};

describe('CashAcceleration Component', () => {
  const defaultProps = {
    enableSync: true,
    myContractsColumns: [],
    myCashKickColumns: [],
  };

  it('should render the component with default props', () => {
    renderComponent({
      enableSync: true,
      myContractsRows: mockMyContractsRows,
      myContractsColumns: mockMyContractsColumns,
      myCashKickRows: mockMyCashKickRows,
      myCashKickColumns: mockMyCashKickColumns,
      activeButton: 'myContracts',
    });

    expect(screen.getByText('Cash acceleration')).toBeInTheDocument();
    expect(screen.getByText('My Contracts')).toBeInTheDocument();
    expect(screen.getByText('My Cashkicks')).toBeInTheDocument();
  });

  it('should display "Sync Now" button when enableSync is true', () => {
    renderComponent({
      enableSync: true,
      myContractsRows: mockMyContractsRows,
      myContractsColumns: mockMyContractsColumns,
      myCashKickRows: mockMyCashKickRows,
      myCashKickColumns: mockMyCashKickColumns,
      activeButton: 'myContracts',
    });

    expect(screen.getByText('Sync Now')).toBeInTheDocument();
  });

  it('should not display "Sync Now" button when enableSync is false', () => {
    renderComponent({
      enableSync: false,
      myContractsRows: mockMyContractsRows,
      myContractsColumns: mockMyContractsColumns,
      myCashKickRows: mockMyCashKickRows,
      myCashKickColumns: mockMyCashKickColumns,
      activeButton: 'myContracts',
    });

    expect(screen.queryByText('Sync Now')).not.toBeInTheDocument();
  });

  it('should render CashAccelerationBox with the theme', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CashAcceleration {...defaultProps} />
      </ThemeProvider>
    );

    const cashAccelerationBox = container.querySelector('div');
    expect(cashAccelerationBox).toHaveStyle(`background-color: ${theme.palette.background.elevation1}`);
    expect(cashAccelerationBox).toHaveStyle(`border-color: ${theme.palette.Borders.lowEmphasis}`);
  });

  it('should conditionally render SyncNowButton based on enableSync prop', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <CashAcceleration {...defaultProps} enableSync={true} />
      </ThemeProvider>
    );

    expect(screen.getByText('Sync Now')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <CashAcceleration {...defaultProps} enableSync={false} />
      </ThemeProvider>
    );

    expect(screen.queryByText('Sync Now')).not.toBeInTheDocument();
  });

  it('should change active button styles when buttons are clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CashAcceleration {...defaultProps} />
      </ThemeProvider>
    );

    const myContractsButton = screen.getByText('My Contracts');
    const myCashKicksButton = screen.getByText('My Cashkicks');

    fireEvent.click(myContractsButton);
    expect(myContractsButton).toHaveStyle(`background-color: ${theme.palette.primary.purple['600']}`);

    fireEvent.click(myCashKicksButton);
    expect(myCashKicksButton).toHaveStyle(`background-color: ${theme.palette.primary.purple['600']}`);
  });

  it('should switch content when My Contracts button is clicked', () => {
    renderComponent({
      enableSync: true,
      myContractsRows: mockMyContractsRows,
      myContractsColumns: mockMyContractsColumns,
      myCashKickRows: mockMyCashKickRows,
      myCashKickColumns: mockMyCashKickColumns,
      activeButton: 'myCashKicks',
    });

    const myContractsButton = screen.getByText('My Contracts');
    fireEvent.click(myContractsButton);

    expect(screen.getByText('Contract 1')).toBeInTheDocument();
    expect(screen.queryByText('My first advance')).not.toBeInTheDocument();
  });

  it('should switch content when My Cashkicks button is clicked', () => {
    const { container } =renderComponent({
      enableSync: true,
      myContractsRows: mockMyContractsRows,
      myContractsColumns: mockMyContractsColumns,
      myCashKickRows: mockMyCashKickRows,
      myCashKickColumns: mockMyCashKickColumns,
      activeButton: 'myContracts',
    });

    console.log(container.innerHTML);
  
    const myCashKicksButton = screen.getByText('My Cashkicks');
    fireEvent.click(myCashKicksButton);

    expect(screen.queryByText('Contract 1')).not.toBeInTheDocument();
  });
  

  it('should render TableEmptyCard for contracts when myContractsRows is empty and isInitial is true', () => {
    renderComponent({
      enableSync: true,
      myContractsRows: [],
      myContractsColumns: mockMyContractsColumns,
      isInitial: true,
      activeButton: 'myContracts',
    });

    expect(screen.getByText('Connect Now')).toBeInTheDocument();
  });

  it('should render TableEmptyCard for contracts when myContractsRows is empty and hasError is true', () => {
    renderComponent({
      enableSync: true,
      myContractsRows: [],
      myContractsColumns: mockMyContractsColumns,
      hasError: true,
      activeButton: 'myContracts',
    });
    
    expect(screen.queryByText('Please contact customer support if this problem persists')).toBeInTheDocument();
  });

  it('should render TableEmptyCard for cash kicks when myCashKickRows is empty and cashKickPressed is true', () => {
    const { container } = renderComponent({
      enableSync: true,
      myCashKickRows: [],
      myCashKickColumns: mockMyCashKickColumns,
      cashKickPressed: true,
      activeButton: 'myCashKicks',
    });

    expect(screen.getByText('Launch A new cash kick')).toBeInTheDocument();

  });

  it('should render TableEmptyCard for cash kicks when myCashKickRows is empty and hasError is true', () => {
    renderComponent({
      enableSync: true,
      myCashKickRows: [],
      myCashKickColumns: mockMyCashKickColumns,
      hasError: true,
      activeButton: 'myCashKicks',
    });

    expect(screen.queryByText('Please contact customer support if this problem persists')).toBeInTheDocument();

  });

});
