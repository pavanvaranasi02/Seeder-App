import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './index';
import '@testing-library/jest-dom';
import theme from '../../../theme/index';

describe('CustomButton Component', () => {
  it('should render button with default props', () => {
    render(
      <CustomButton>Default Button</CustomButton>
    );
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Default Button');
  });

  it('should handle onClick event', () => {
    const handleClick = jest.fn();
    render(
      <CustomButton onClick={handleClick}>Clickable Button</CustomButton>
    );
    const buttonElement = screen.getByTestId('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should change background color on hover', () => {
    render(
      <CustomButton
        variant="contained"
        backgroundColor={theme.palette.primary.purple[500]}
        opacity={0.8}
        backgroundHoverColor={theme.palette.primary.purple[600]}
      >
        Hover Me
      </CustomButton>
    );

    const buttonElement = screen.getByTestId('button');
    fireEvent.mouseOver(buttonElement);
    expect(buttonElement).toHaveStyle(`background-color: ${theme.palette.primary.purple[600]}`);
  });

  it('should disable button when disabled prop is true', () => {
    render(
      <CustomButton
        variant="contained"
        backgroundColor={theme.palette.primary.purple[500]}
        opacity={0.8}
        disabled
      >
        Disabled Button
      </CustomButton>
    );

    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeDisabled();
  });

  it('should render button with custom styles and verifies all props', () => {
    render(
      <CustomButton
        variant="contained"
        backgroundColor={theme.palette.primary.purple[500]}
        opacity={0.8}
        backgroundHoverColor={theme.palette.primary.purple[500]}
        disabled={false}
        style={{ padding: '10px', fontSize: '20px' }}
      >
        Full Coverage Button
      </CustomButton>
    );

    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Full Coverage Button');
    expect(buttonElement).toHaveStyle('opacity: 0.8');
    expect(buttonElement).toHaveStyle('padding: 10px');
    expect(buttonElement).toHaveStyle('font-size: 20px');
    expect(buttonElement).not.toBeDisabled();
  });

});
