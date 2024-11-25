import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CongratsCard from '.';
import theme from '../../../theme';

describe('CongratsCard', () => {
  const defaultProps = {
    heading: 'Congratulations! You are ready to start!',
    body: 'You are approved for funding. We are ready to advance you up to',
    buttonLabel: 'Learn More',
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <ThemeProvider theme={theme}>
        <CongratsCard {...props} />
      </ThemeProvider>
    );
  };

  test('should render CongratsCard correctly', () => {
    const { heading, body, buttonLabel } = defaultProps;
    renderComponent();
    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(screen.getByText(body)).toBeInTheDocument();
    expect(screen.getByText(buttonLabel)).toBeInTheDocument();
  });
});
