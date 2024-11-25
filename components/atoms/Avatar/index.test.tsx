import React from 'react';
import Avatar from './index';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Avatar component', () => {
  const randomImagePath = 'random-image-path'; 

  it('should render with provided src and alt text', () => {
    const { getByAltText } = render(<Avatar src={randomImagePath} alt="Alternate text" />);
    const avatarElement = getByAltText('Alternate text');
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', randomImagePath);
  });

  it('should render with circular variant by default', () => {
    const { container } = render(<Avatar src={randomImagePath} alt="Alternate text" />);
    const avatarElement = container.querySelector('.MuiAvatar-img');
    expect(avatarElement).toBeInTheDocument();
  });

  it('should apply custom styles when provided', () => {
    const { container } = render(<Avatar src={randomImagePath} alt="Alternate text" style={{ border: '2px solid red' }} />);
    const avatarElement = container.querySelector('.MuiAvatar-root');
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveStyle('border: 2px solid red');
  });

  it('should render with specified variant', () => {
    const { container } = render(<Avatar src={randomImagePath} alt="Alternate text" variant="rounded" />);
    const avatarElement = container.querySelector('.MuiAvatar-rounded');
    expect(avatarElement).toBeInTheDocument();
  });
});