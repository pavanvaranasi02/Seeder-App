import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import TypographyButton, { TypographyButtonProps } from '.';
import theme from '../../../theme/index';
import '@testing-library/jest-dom';

const renderComponent = (props: Partial<TypographyButtonProps> = {}) => {
  const defaultProps: TypographyButtonProps = {
    title:"Already have an account?",
    titleVariant:"body1",
    titleColor:theme.palette.text.lowEmphasis,
    buttonLabel:"Login",
    onButtonClick: jest.fn(),
    ...props,
  };

  return render(
    <ThemeProvider theme={theme}>
      <TypographyButton {...defaultProps} />
    </ThemeProvider>
  );
};

test('should render LoginCard with default props', () => {
  renderComponent();
  expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('should render title with the correct variant', () => {
    renderComponent({ title: 'Sign In', titleVariant: 'h4' });
    const title = screen.getByText('Sign In');
    expect(title.tagName).toBe('H4');
});
  
test('should render LoginCard with a different button label', () => {
    renderComponent({ buttonLabel: 'Sign Up' });
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
});

test('should render title with the correct color', () => {
  const titleColor = theme.palette.primary.main;
  renderComponent({ titleColor });
  const title = screen.getByText('Already have an account?');
  expect(title).toHaveStyle(`color: ${titleColor}`);
});

test('should render calls onButtonClick when button is clicked', () => {
  const onButtonClick = jest.fn();
  renderComponent({ onButtonClick });
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(onButtonClick).toHaveBeenCalledTimes(1);
});



 
