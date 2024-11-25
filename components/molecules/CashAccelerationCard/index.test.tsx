import React from 'react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import CashAccelerationCard, { CardContainer, CashAccelerationProps, TypographyStack } from './index';
import theme from '../../../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps: CashAccelerationProps = {
  width: '300px',
  height: '200px',
  padding: '20px',
  cardIconSrc: '/path/to/card-icon.svg',
  src: '/path/to/card-icon.svg',
  alt: 'Icon description',
  content: 'Some content',
  value: '123',
  cardbackground: theme.palette.background.paper,
  cardBorder: `1px solid ${theme.palette.Borders.lowEmphasis}`,
  cardBorderRadius: '10px',
};
describe('CashAccelerationCard', () => {
  it('should render without crashing', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
  });

  it('should render the card container with correct styles', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const cardContainer = screen.getByTestId('card-container');
    expect(cardContainer).toHaveStyle('width: 300px');
    expect(cardContainer).toHaveStyle('height: 200px');
    expect(cardContainer).toHaveStyle(`background-color: ${theme.palette.background.paper}`);
    expect(cardContainer).toHaveStyle(`border: 1px solid ${theme.palette.Borders.lowEmphasis}`);
    expect(cardContainer).toHaveStyle('border-radius: 10px');
  });
  

  it('should render the icon container with correct icon', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const icon = screen.getByAltText('Icon description');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/path/to/card-icon.svg');
  });

  it('should render the TypographyAtom and Icon Stack with correct props', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const typographyIconStack = screen.getByText('Some content').parentElement;
    expect(typographyIconStack).toBeInTheDocument();
  });

  it('should render the value second TypographyAtom with correct text', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const valueTypography = screen.getByText('123');
    expect(valueTypography).toBeInTheDocument();
  });

  it('should render the due date chip if content contains "due"', () => {
    const propsWithDueDate = { ...defaultProps, content: 'Due date content', label: 'Due' };
    renderWithTheme(<CashAccelerationCard {...propsWithDueDate} />);
    const dueDateChip = screen.getByText('Due');
    expect(dueDateChip).toBeInTheDocument();
  });

  it('should render the CustomCircularProgress if content contains "outstanding"', () => {
    const propsWithOutstanding = { ...defaultProps, content: 'Outstanding balance', progressValue: 70 };
    renderWithTheme(<CashAccelerationCard {...propsWithOutstanding} />);
    const customCircularProgress = screen.queryByTestId('custom-circular-progress');
    expect(customCircularProgress).toBeInTheDocument();
    expect(customCircularProgress).toHaveTextContent('70%'); 
  });

  it('should render the CustomCircularProgress with default props when no props provided', () => {
    const propsWithOutstanding = { ...defaultProps, content: 'Outstanding balance' };
    renderWithTheme(<CashAccelerationCard {...propsWithOutstanding} />);
    const customCircularProgress = screen.queryByTestId('custom-circular-progress');
    expect(customCircularProgress).toBeInTheDocument();
    expect(customCircularProgress).toHaveTextContent('0%'); 
  });

  it('should not render the due date chip if content does not contain "due"', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const dueDateChip = screen.queryByText('Due');
    expect(dueDateChip).not.toBeInTheDocument();
  });

  it('should not render the CustomCircularProgress if content does not contain "outstanding"', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const customCircularProgress = screen.queryByTestId('custom-circular-progress');
    expect(customCircularProgress).not.toBeInTheDocument();
  });

  it('should render the outer TypographyStack with correct flexDirection', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const outerTypographyStack = screen.getByTestId('typography-stack');
    expect(outerTypographyStack).toHaveStyle('flex-direction: column');
  });

  it('should render the inner TypographyStack with correct flexDirection, alignItems, and justifyContent', () => {
    renderWithTheme(<CashAccelerationCard {...defaultProps} />);
    const innerTypographyStack = screen.getByTestId('inner-typography-stack');
    expect(innerTypographyStack).toHaveStyle('flex-direction: row');
    expect(innerTypographyStack).toHaveStyle('align-items: center');
    expect(innerTypographyStack).toHaveStyle('justify-content: flex-start');
  });
  
  it('should render CustomCircularProgress with custom size and stroke width', () => {
    const propsWithCustomValues = {
      ...defaultProps,
      content: 'Outstanding balance',
      progressSize: 120,
      progressStrokeWidth: 10,
    };
    renderWithTheme(<CashAccelerationCard {...propsWithCustomValues} />);
    const customCircularProgress = screen.queryByTestId('custom-circular-progress');
    expect(customCircularProgress).toBeInTheDocument();
  });
  
  
});

describe('Styled Components', () => {
  describe('CardContainer', () => {
    it('should render with correct default styles', () => {
      renderWithTheme(
        <CardContainer
          data-testid="card-container"
          width="300px"
          height="200px"
        />
      );

      const cardContainer = screen.getByTestId('card-container');
      expect(cardContainer).toHaveStyle('background-color: #201F24');
      expect(cardContainer).toHaveStyle('border: none'); 
      expect(cardContainer).toHaveStyle('border-radius: 0'); 
    });

    it('should render with specified styles', () => {
      renderWithTheme(
        <CardContainer
          data-testid="card-container"
          width="300px"
          height="200px"
          cardBackground="#fff"
          cardBorder="1px solid #000"
          cardBorderRadius="10px"
        />
      );

      const cardContainer = screen.getByTestId('card-container');
      expect(cardContainer).toHaveStyle('background-color: #fff');
      expect(cardContainer).toHaveStyle('border: 1px solid #000');
      expect(cardContainer).toHaveStyle('border-radius: 10px');
    });
  });

  describe('TypographyStack', () => {
    it('should render with default flex-direction: column', () => {
      renderWithTheme(
        <TypographyStack data-testid="typography-stack">
          <div>Inner Content</div>
        </TypographyStack>
      );

      const typographyStack = screen.getByTestId('typography-stack');
      expect(typographyStack).toHaveStyle('flex-direction: column');
    });
  });
});
