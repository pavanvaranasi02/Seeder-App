import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import CashKickDialogueBox from './index';
import theme from '../../../theme';

describe('CashKickDialogueBox', () => {
  const mockOnClose = jest.fn();
  const mockCreateCashKickHandler = jest.fn();
  const mockViewCashKick = jest.fn();

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <CashKickDialogueBox
          open={true}
          onClose={mockOnClose}
          createCashKickHandler={mockCreateCashKickHandler}
          onViewCashKick={mockViewCashKick}
        />
      </ThemeProvider>
    );
  });

  it('should render the modal with initial state', () => {
    expect(screen.getByText(/Name your Cash Kick/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Create Cash Kick/i })
    ).toBeDisabled();
  });

  it('should handle input changes', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Cash Kick' } });
    expect(input).toHaveValue('New Cash Kick');
  });

  it('should call onClose when cancel button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should disable Create Cash Kick button when name is invalid', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(
      screen.getByRole('button', { name: /Create Cash Kick/i })
    ).toBeDisabled();
  });

  it('should enable Create Cash Kick button when name is valid', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Valid Name' } });
    expect(
      screen.getByRole('button', { name: /Create Cash Kick/i })
    ).toBeEnabled();
  });

  it('should call createCashKickHandler and show success message when valid name is provided', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Valid Name' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Cash Kick/i }));
    expect(mockCreateCashKickHandler).toHaveBeenCalledWith('Valid Name');
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });

  it('should show success modal and handle close', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Valid Name' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Cash Kick/i }));
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
