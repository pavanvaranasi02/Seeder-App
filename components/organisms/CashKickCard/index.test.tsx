import React from 'react';
import { render, screen } from '@testing-library/react';
import CashKickCard, { CashKickCardProps } from '../CashKickCard';

describe('CashKickCard', () => {
  const defaultProps: CashKickCardProps = {
    cashKickkamount: 1000,
    onClick: jest.fn(),
  };

  it('should render without crashing', () => {
    render(<CashKickCard {...defaultProps} />);
    expect(screen.getByText('Launch a new')).toBeTruthy();
    expect(screen.getByText('Cash Kick')).toBeTruthy();
  });
});
