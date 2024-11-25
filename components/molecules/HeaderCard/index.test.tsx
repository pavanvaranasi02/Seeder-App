import React from 'react';
import '@testing-library/jest-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderCard, { HeaderCardProps } from '.';
import IconPath from '../../../utils/Constants';
import theme from '../../../theme';

const defaultProps: HeaderCardProps = {
  greeting: true,
  onLogout: jest.fn(),
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );
};

describe('HeaderCard', () => {
  test('renders greeting message based on currentHour', () => {
    const { rerender } = renderWithProviders(
      <HeaderCard {...defaultProps} currentHour={9} />
    );
    expect(screen.getByText('Good morning')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderCard {...defaultProps} currentHour={14} />
      </ThemeProvider>
    );
    expect(screen.getByText('Good afternoon')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderCard {...defaultProps} currentHour={19} />
      </ThemeProvider>
    );
    expect(screen.getByText('Good evening')).toBeInTheDocument();
  });

  test('renders custom heading and content when greeting is false', () => {
    renderWithProviders(
      <HeaderCard
        {...defaultProps}
        greeting={false}
        heading="Custom Heading"
        content="This is custom content"
      />
    );

    const heading = screen.getByText('Custom Heading');
    const content = screen.getByText('This is custom content');
    expect(heading).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  test('opens ProfileCard on button click', () => {
    renderWithProviders(<HeaderCard {...defaultProps} />);

    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    const profileMenu = screen.getByRole('menu');
    expect(profileMenu).toBeInTheDocument();
  });

  test('calls handleClick on button click', () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <HeaderCard {...defaultProps} handleClick={handleClick} />
    );

    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    expect(handleClick).toHaveBeenCalled();
  });

  test('calls onLogout when logging out', () => {
    renderWithProviders(<HeaderCard {...defaultProps} />);

    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

    expect(defaultProps.onLogout).toHaveBeenCalled();
  });

  test('handles profile avatar and icon src correctly', () => {
    renderWithProviders(<HeaderCard {...defaultProps} />);

    const avatar = screen.getByAltText('Avatar Icon');
    const icon = screen.getByAltText('Arrow Drop Down Icon');

    expect(avatar).toHaveAttribute('src', IconPath.avatarImg);
    expect(icon).toHaveAttribute('src', IconPath.arrowDropDownIcon);
  });

  test('handles profile avatar and icon src correctly', () => {
    renderWithProviders(
      <HeaderCard
        {...defaultProps}
        profileAvatar={IconPath.avatarImg}
        iconSrc={IconPath.arrowDropDownIcon}
      />
    );

    const avatar = screen.getByAltText('Avatar Icon');
    const icon = screen.getByAltText('Arrow Drop Down Icon');

    expect(avatar).toHaveAttribute('src', IconPath.avatarImg);
    expect(icon).toHaveAttribute('src', IconPath.arrowDropDownIcon);
  });

  test('displays formatted date correctly', () => {
    renderWithProviders(<HeaderCard {...defaultProps} />);

    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    const formattedDate = screen.getByText(today);
    expect(formattedDate).toBeInTheDocument();
  });

  test('checks if the greeting hand emoji is displayed when greeting is true', () => {
    renderWithProviders(<HeaderCard {...defaultProps} />);

    const handEmoji = screen.getByText('✋');
    expect(handEmoji).toBeInTheDocument();
  });
});
