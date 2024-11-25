import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CustomCircularProgress from '.';
import '@testing-library/jest-dom';
import theme from '../../../theme';

const renderComponent = (
  value: number,
  size: number,
  strokeWidth: number,
  customcolor?: string,
  customfontsize?: string | number
) =>
  render(
    <ThemeProvider theme={theme}>
      <CustomCircularProgress
        value={value}
        size={size}
        strokeWidth={strokeWidth}
        customcolor={customcolor}
        customfontsize={customfontsize}
      />
    </ThemeProvider>
  );

describe('CustomCircularProgress', () => {
  test('renders with initial value and checks text content', () => {
    renderComponent(50, 100, 4);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('component style changes based on size prop', () => {
    const { container } = renderComponent(50, 150, 5);
    expect(container.firstChild).toHaveStyle('width: 150px');
    expect(container.firstChild).toHaveStyle('height: 150px');
  });

  test('applies custom color and font size correctly', () => {
    const customcolor = '#FF6347';
    const customfontsize = '20px';
    renderComponent(65, 100, 4, customcolor, customfontsize);
    const percentageText = screen.getByText('65%');
    expect(percentageText).toHaveStyle(`color: ${customcolor}`);
    expect(percentageText).toHaveStyle(`font-size: ${customfontsize}`);
  });

  test('handles extreme values for progress', () => {
    renderComponent(0, 100, 4);
    expect(screen.getByText('0%')).toBeInTheDocument();
    renderComponent(95, 100, 4);
    expect(screen.getByText('95%')).toBeInTheDocument();
  });
});
