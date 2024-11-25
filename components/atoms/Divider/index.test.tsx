import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { ThemeProvider } from "@mui/material";
import  Divider from "./index";
import theme from "../../../theme";

describe('<DividerAtom />', () => {


    it('should render divider with default styles and props', () => {

        render(   
            <ThemeProvider theme={theme}>
                <Divider id="divider"/>
            </ThemeProvider>
        ) ;

        const dividerElement = screen.getByTestId('divider');

        expect(dividerElement).toBeInTheDocument();
        expect(dividerElement).toHaveStyle(`borderColor: ${theme.palette.Borders.highEmphasis}`); 
        expect(dividerElement).toHaveStyle(`color: ${theme.palette.text.mediumEmphasis}`); 
        expect(dividerElement).toHaveStyle('borderBottomWidth: undefined');
        expect(dividerElement).toHaveStyle('height: undefined');
    });

    it('should render horizontal divider with full width', () => {
       render(
            <ThemeProvider theme={theme}>
                <Divider orientation="horizontal" id="divider" variant="fullWidth" />
            </ThemeProvider>
        );
        const dividerElement = screen.getByTestId('divider');
    
        expect(dividerElement).toBeInTheDocument();
        expect(dividerElement).toHaveStyle(`borderColor: ${theme.palette?.Borders.highEmphasis}`); 
        expect(dividerElement).toHaveStyle(`color: ${theme.palette.text?.mediumEmphasis}`); 
        expect(dividerElement).toHaveStyle('borderBottomWidth: undefined');
        expect(dividerElement).toHaveStyle('height: undefined');
    });

    it('render horizontal divider with inset and borderBottomWidth', () => {
        render(
            <ThemeProvider theme={theme}>
                <Divider orientation="horizontal" id="divider" variant="inset" borderBottomWidth="3px"/>
            </ThemeProvider>
        );
        const dividerElement = screen.getByTestId('divider');
    
        expect(dividerElement).toBeInTheDocument();
        expect(dividerElement).toHaveStyle(`borderColor: ${theme.palette?.Borders.highEmphasis}`); 
        expect(dividerElement).toHaveStyle(`color: ${theme.palette.text?.mediumEmphasis}`); 
        expect(dividerElement).toHaveStyle('borderBottomWidth: 3px');
        expect(dividerElement).toHaveStyle('height: undefined');
    });

    
    it('render vertical divider with height', () => {
        render(
            <ThemeProvider theme={theme}>
                <Divider orientation="horizontal" id="divider" variant="inset" height="50px"/>
            </ThemeProvider>
        );
        const dividerElement = screen.getByTestId('divider');
    
        expect(dividerElement).toBeInTheDocument();
        expect(dividerElement).toHaveStyle(`borderColor: ${theme.palette?.Borders.highEmphasis}`); 
        expect(dividerElement).toHaveStyle(`color: ${theme.palette.text?.mediumEmphasis}`); 
        expect(dividerElement).toHaveStyle('borderBottomWidth: undefined');
        expect(dividerElement).toHaveStyle('height: 50px');
    });

    it('renders with children', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <Divider id="divider">
                    <span>Test Child</span>
                </Divider>
            </ThemeProvider>
        );
    
        expect(getByText('Test Child')).toBeInTheDocument();
    });
    

});

