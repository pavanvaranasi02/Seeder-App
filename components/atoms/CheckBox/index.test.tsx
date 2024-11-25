import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckBox from '.'; 
import IconPath from '../../../utils/Constants'; 

describe('CheckBox Component', () => {
  it('renders the unchecked state correctly', () => {
    render(<CheckBox checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(screen.getByRole('img')).toHaveAttribute('src', IconPath.UncheckedImg);
  });

  it('renders the checked state correctly', () => {
    render(<CheckBox checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(screen.getByRole('img')).toHaveAttribute('src', IconPath.CheckedImg);
  });

  it('renders the indeterminate state correctly', () => {
    render(<CheckBox indeterminate={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', IconPath.IndeterminateImg);
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<CheckBox checked={false} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders with an id', () => {
    render(<CheckBox checked={false} onChange={() => {}} id="test-id" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-id');
  });
});
