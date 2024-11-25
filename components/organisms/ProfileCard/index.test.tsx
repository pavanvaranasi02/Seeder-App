import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileCard, { ProfileCardProps } from './index';
import '@testing-library/jest-dom';
import { CssBaseline,ThemeProvider } from '@mui/material';
import theme from '../../../theme';

const mockProps: ProfileCardProps = {
  anchorEl: document.createElement('div'), 
  handleClose: jest.fn(),
  onLogout: jest.fn(),
};

describe('ProfileCard component', () => {
  it('renders ProfileCard component correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProfileCard {...mockProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Kane Cooper')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });


  it('handles menu item clicks correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProfileCard {...mockProps} />
      </ThemeProvider>
    );


    fireEvent.click(screen.getByText('Edit Profile'));
    expect(mockProps.handleClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Manage Subscriptions'));
    expect(mockProps.handleClose).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByText('Help'));
    expect(mockProps.handleClose).toHaveBeenCalledTimes(3);

    fireEvent.click(screen.getByText('Settings'));
    expect(mockProps.handleClose).toHaveBeenCalledTimes(4);

    fireEvent.click(screen.getByText('Log Out'));
    expect(mockProps.onLogout).toHaveBeenCalledTimes(1);
    expect(mockProps.handleClose).toHaveBeenCalledTimes(5);
  });
});