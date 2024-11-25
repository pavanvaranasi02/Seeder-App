import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import IconTypography from '.';
import IconPath from '../../../utils/Constants';
import theme from '../../../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {component}
    </ThemeProvider>
  );
};

describe('IconTypography Component', () => {
  it('renders the icon and typography', () => {
    renderWithTheme(
      <IconTypography
        iconSrc={IconPath.chequeIllustration}
        iconAlt="Cheque Illustration"
        iconWidth="231.72px"
        iconHeight="160px"
        iconOpacity="80%"
        typo={[
          {
            variant: 'heading3',
            color: theme.palette.text.lowEmphasis,
            children: "You don't have any Cash Kick",
          },
        ]}
      />
    );

    const icon = screen.getByAltText('Cheque Illustration');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({
      width: '231.72px',
      height: '160px',
      opacity: '80%',
    });

    const typography = screen.getByText("You don't have any Cash Kick");
    expect(typography).toBeInTheDocument();
  });

  it('renders multiple typography elements', () => {
    renderWithTheme(
      <IconTypography
        iconSrc={IconPath.warningImg}
        iconAlt="Warning Image 3d"
        iconWidth="231.72px"
        iconHeight="160px"
        typo={[
          {
            variant: 'heading3',
            color: theme.palette.text.highEmphasis,
            children: 'Failed to load contracts!',
          },
          {
            variant: 'caption',
            color: theme.palette.text.lowEmphasis,
            children:
              'Please contact customer support if this problem persists',
          },
        ]}
      />
    );

    const typography1 = screen.getByText('Failed to load contracts!');
    expect(typography1).toBeInTheDocument();

    const typography2 = screen.getByText(
      'Please contact customer support if this problem persists'
    );
    expect(typography2).toBeInTheDocument();
  });

  it('renders the button and handles click events', () => {
    const handleClick = jest.fn();

    renderWithTheme(
      <IconTypography
        iconSrc={IconPath.chequeIllustration}
        iconAlt="Cheque Illustration"
        iconWidth="231.72px"
        iconHeight="160px"
        iconOpacity="80%"
        typo={[
          {
            variant: 'heading3',
            color: theme.palette.text.lowEmphasis,
            children: "You don't have any Cash Kick",
          },
        ]}
        buttonLabel="Click Me"
        onClick={handleClick}
      />
    );

    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('check default values of icon in IconTypography', () => {
    renderWithTheme(
      <IconTypography
        iconSrc={IconPath.chequeIllustration}
        iconAlt="Check Illustation Image"
        typo={[
          {
            variant: 'heading3',
            color: theme.palette.text.lowEmphasis,
            children: "You don't have any Cash Kick",
          },
        ]}
      />
    );

    const icon = screen.getByAltText('Check Illustation Image');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({
      width: '100px',
      height: '100px',
      opacity: '100%',
    });
  });
});
