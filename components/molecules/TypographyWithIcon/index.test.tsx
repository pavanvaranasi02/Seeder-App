import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { TypographyIconMolecule, TypographyIconProps } from './index';
import '@testing-library/jest-dom';  
import theme from '../../../theme/index'
import { render} from '@testing-library/react';

const mockProps: TypographyIconProps = {
    label: 'Example Label',
    src: 'example.png',
    alt: 'Example Alt Text',
    flexDirection: 'row',
    height: 100,
    width: 200,
    variant: 'body1',
    justifyContent: 'center',
    gap: '1rem',
  };
  
  describe('TypographyIconMolecule', () => {
    it('should render provided props', () => {
      const { getByText, getByAltText } = render(
        <ThemeProvider theme={theme}>
          <TypographyIconMolecule {...mockProps} />
        </ThemeProvider>
      );
  
      const labelElement = getByText(mockProps.label!);
      const imageElement = getByAltText(mockProps.alt!);
  
      expect(labelElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
    });
  
    it('should render default props when optional props are not provided', () => {
      const { getByText, getByAltText } = render(
        <ThemeProvider theme={theme}>
          <TypographyIconMolecule label="Default Label" src="default.png" alt="Default Alt Text" />
        </ThemeProvider>
      );
  
      const labelElement = getByText('Default Label');
      const imageElement = getByAltText('Default Alt Text');
  
      expect(labelElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
    });
  
    it('should render correctly with different flexDirection prop', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <TypographyIconMolecule {...mockProps} flexDirection="column" />
        </ThemeProvider>
      );
  
      const outerBox = container.firstChild as HTMLElement;
      expect(outerBox).toHaveStyle('flex-direction: column');
    });
  
    it('should render a specific backgroundColor prop', () => {
        const { container } = render(
          <ThemeProvider theme={theme}>
            <TypographyIconMolecule {...mockProps} backgroundColor="rgb(204, 204, 204)" />
          </ThemeProvider>
        );
      
        const outerBox = container.firstChild as HTMLElement;
        expect(outerBox).toHaveStyle('background-color:   rgb(204, 204, 204)');
      });
  });