import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../../../theme';
import CustomSliderComponent, { SliderProps } from '.';

describe('SliderComponent', () => {
  const mockFunction = jest.fn();

  const wrapper = (props: Partial<SliderProps>) => {
    return render(
      <ThemeProvider theme={theme}>
        <CustomSliderComponent
          maxValue={props.maxValue || 100}
          value={props.value || 0}
          onSliderChange={ mockFunction}
          width={props.width || '100%'}
        />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockFunction.mockClear();
  });

  it('should render slider with default value and max prop', () => {
    wrapper({
      maxValue: 100,
      value: 0,
      onSliderChange: mockFunction,
    });

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveValue('0');
  });

  it('should change value on user interaction', () => {
    wrapper({
      maxValue: 100,
      value: 0,
      onSliderChange: mockFunction,
    });

    const slider = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: 50 } });

    expect(mockFunction).toHaveBeenCalledWith(50);
  });

  it('should call onSliderChange with the minimum value', () => {
    wrapper({
      maxValue: 100,
      value: 50,
      onSliderChange: mockFunction,
    });

    const slider = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: 0 } });

    expect(mockFunction).toHaveBeenCalledWith(0);
  });

  it('should call onSliderChange with the maximum value', () => {
    wrapper({
      maxValue: 100,
      value: 0,
      onSliderChange:mockFunction,
    });

    const slider = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: 100 } });

    expect(mockFunction).toHaveBeenCalledWith(100);
  });

  it('should handle when width is not provided', () => {
    wrapper({
      maxValue: 100,
      value: 50,
      onSliderChange: mockFunction,
    });

    const slider = screen.getByRole('slider');
    expect(slider).toHaveStyle('width: 100%');
  });

});
