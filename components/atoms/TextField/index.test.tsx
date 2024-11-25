import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
import TextField from '.';

describe('CustomTextField Component', () => {
  it('renders correctly without adornments', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField placeholder="Enter your password" />
      </ThemeProvider>
    );
    const inputElement = screen.getByPlaceholderText('Enter your password');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders correctly with start adornment', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField
          startSrc="./assets/icons/lock.svg"
          startAlt="Lock"
          placeholder="Enter your password"
        />
      </ThemeProvider>
    );
    const imgElement = screen.getByAltText('Lock');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', './assets/icons/lock.svg');
  });

  it('renders correctly with end adornment', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField
          endSrc="./assets/icons/eye.svg"
          endAlt="Eye"
          placeholder="Enter your password"
        />
      </ThemeProvider>
    );
    const imgElement = screen.getByAltText('Eye');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', './assets/icons/eye.svg');
  });

  it('renders correctly with both adornments', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField
          startSrc="./assets/icons/lock.svg"
          startAlt="Lock"
          endSrc="./assets/icons/eye.svg"
          endAlt="Eye"
          placeholder="Enter your password"
        />
      </ThemeProvider>
    );
    const startImgElement = screen.getByAltText('Lock');
    const endImgElement = screen.getByAltText('Eye');
    expect(startImgElement).toBeInTheDocument();
    expect(endImgElement).toBeInTheDocument();
    expect(startImgElement).toHaveAttribute('src', './assets/icons/lock.svg');
    expect(endImgElement).toHaveAttribute('src', './assets/icons/eye.svg');
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <TextField placeholder="Enter your password" onChange={handleChange} />
      </ThemeProvider>
    );
    const inputElement = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it('renders correctly with start adornment but without alt text', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField
          startSrc="./assets/icons/lock.svg"
          placeholder="Enter your password"
        />
      </ThemeProvider>
    );
    const imgElement = screen.getByAltText('');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', './assets/icons/lock.svg');
  });

  it('renders correctly with end adornment but without alt text', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField
          endSrc="./assets/icons/eye.svg"
          placeholder="Enter your password"
        />
      </ThemeProvider>
    );
    const imgElement = screen.getByAltText('');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', './assets/icons/eye.svg');
  });
});
