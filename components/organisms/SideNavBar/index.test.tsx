import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import SideNavBar, { SideNavprops } from '.';
import theme from '../../../theme';

describe('SideNavBar', () => {
  const defaultProps: SideNavprops = {
    activeIndex: null,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the SideNavBar with default styles and props', () => {
    render(<SideNavBar {...defaultProps} />);

    const logo = screen.getByAltText('Seeder Logo');
    expect(logo).toBeInTheDocument();

    const homeMenuItem = screen.getByText('Home');
    expect(homeMenuItem).toBeInTheDocument();

    const cashMenuItem = screen.getByText('Cash Acceleration');
    expect(cashMenuItem).toBeInTheDocument();

    const footerItem = screen.getByText('Watch how to');
    expect(footerItem).toBeInTheDocument();
  });

  const alternateProps: SideNavprops = {
    activeIndex: 1,
  };

  it('should apply active styles to the clicked menu item', () => {
    render(
      <ThemeProvider theme={theme}>
        <SideNavBar {...alternateProps} />
      </ThemeProvider>
    );

    const homeMenuItem = screen.getByText('Home');
    fireEvent.click(homeMenuItem);

    expect(homeMenuItem).toHaveStyle(
      `color: ${theme.palette.text.highEmphasis}`
    );

    const cashMenuItem = screen.getByText('Cash Acceleration');
    fireEvent.click(cashMenuItem);

    expect(cashMenuItem).toHaveStyle(
      `color: ${theme.palette.text.highEmphasis}`
    );

    expect(homeMenuItem).toHaveStyle(
      `color: ${theme.palette.text.lowEmphasis}`
    );
  });

  it('should set the active menu item on click', () => {
    render(
      <ThemeProvider theme={theme}>
        <SideNavBar />
      </ThemeProvider>
    );

    const homeMenuItem = screen.getByText('Home');
    const cashMenuItem = screen.getByText('Cash Acceleration');

    fireEvent.click(homeMenuItem);
    expect(homeMenuItem).toHaveStyle(
      `color: ${theme.palette.text.highEmphasis}`
    );
    expect(cashMenuItem).toHaveStyle(
      `color: ${theme.palette.text.lowEmphasis}`
    );

    fireEvent.click(cashMenuItem);
    expect(cashMenuItem).toHaveStyle(
      `color: ${theme.palette.text.highEmphasis}`
    );
    expect(homeMenuItem).toHaveStyle(
      `color: ${theme.palette.text.lowEmphasis}`
    );
  });

  it('should set the active menu item on click', () => {
    render(
      <ThemeProvider theme={theme}>
        <SideNavBar {...defaultProps} />
      </ThemeProvider>
    );

    const homeMenuItem = screen.getByText('Home');
    const cashMenuItem = screen.getByText('Cash Acceleration');

    fireEvent.click(homeMenuItem);
    expect(homeMenuItem).toHaveStyle(
      `color: ${theme.palette.text.highEmphasis}`
    );
    expect(cashMenuItem).toHaveStyle(
      `color: ${theme.palette.text.lowEmphasis}`
    );

    fireEvent.click(cashMenuItem);
    expect(cashMenuItem).toHaveStyle(
      `color: ${theme.palette.text.highEmphasis}`
    );
    expect(homeMenuItem).toHaveStyle(
      `color: ${theme.palette.text.lowEmphasis}`
    );
  });

  it('should call handlePage when a menu item is clicked', () => {
    const handlePageMock = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <SideNavBar {...defaultProps} handlePage={handlePageMock} />
      </ThemeProvider>
    );

    const homeMenuItem = screen.getByText('Home');
    fireEvent.click(homeMenuItem);

    expect(handlePageMock).toHaveBeenCalled();
  });

  it('should not call handlePage when a menu item is clicked and activeIndex is the same', () => {
    const handlePageMock = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <SideNavBar {...alternateProps} handlePage={handlePageMock} />
      </ThemeProvider>
    );

    const cashMenuItem = screen.getByText('Cash Acceleration');
    fireEvent.click(cashMenuItem);

    expect(handlePageMock).toHaveBeenCalled();
  });

  it('should set activeButton state on menu item click', () => {
    render(
      <ThemeProvider theme={theme}>
        <SideNavBar {...defaultProps} />
      </ThemeProvider>
    );

    const homeMenuItem = screen.getByText('Home');
    fireEvent.click(homeMenuItem);

    expect(homeMenuItem).toHaveStyle(
      `color: ${theme.palette.text.highEmphasis}`
    );
  });
});
