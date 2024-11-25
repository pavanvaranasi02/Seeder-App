import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './index';

describe('Icon Component', () => {
  it('renders correctly with given src and alt attributes', () => {
    render(
      <Icon src="./assets/icons/BusinessAnalysis.svg" alt="Business Analysis" />
    );
    const imgElement = screen.getByAltText('Business Analysis');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      'src',
      './assets/icons/BusinessAnalysis.svg'
    );
    expect(imgElement).toHaveAttribute('alt', 'Business Analysis');
  });
});
