import React from "react";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SummaryCard, { CardProps } from ".";
import theme from "../../../theme";



describe('Summary card', () => {

    const defaultProps: CardProps = {
        sliderValue: 2,
        contracts: 2,
        initialIsReviewed: false,
        paybackAmount: 288003.30,
        percentage: 12,
        id: 'SummaryCard',
        onClickResetData: jest.fn(),
        reviewCredit: jest.fn(),
        handleSliderChange: jest.fn(),
    }

    it( ' should render with default props ', () => {

        render(
            <ThemeProvider theme={theme}>
                <SummaryCard {...defaultProps}/>
            </ThemeProvider>
        )

        expect(screen.getByTestId('SummaryCard')).toBeInTheDocument();
        expect(screen.getByText('Term')).toBeInTheDocument();
        expect(screen.getByText('Selected Contracts')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Pay back amount')).toBeInTheDocument();
        expect(screen.getByText('Rate %')).toBeInTheDocument();
        expect(screen.getByText('Total Payout')).toBeInTheDocument();
    });

    it('should call onClickResetData when reset button is clicked', () => {
        render(
            <ThemeProvider theme={theme}>
                <SummaryCard {...defaultProps} />
            </ThemeProvider>
        )

        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        expect(defaultProps.onClickResetData).toHaveBeenCalledTimes(1);
    });


    it('should handle review button click', () => {
        render(
            <ThemeProvider theme={theme}>
                <SummaryCard {...defaultProps} />
            </ThemeProvider>
        );
    
        const reviewButton = screen.getByText('Review Your Credit');
        fireEvent.click(reviewButton);
    
        expect(defaultProps.reviewCredit).toHaveBeenCalledTimes(1);
    });


    it('should handle slider value change', () => {
        render(
            <ThemeProvider theme={theme}>
                <SummaryCard {...defaultProps} />
            </ThemeProvider>
        );
    
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: 3 } });
    
        expect(defaultProps.handleSliderChange).toHaveBeenCalledWith(3);
    });

    
    it('should render with reviewed state', () => {
        const reviewedProps: CardProps = {
            ...defaultProps,
            initialIsReviewed: true,
            variedCashkick: 1000,
            finalCashkick: 2000,
            percentage: 15,
            percetageAmount: 150,
            totalPayout: 5000,
        };
    
        render(
            <ThemeProvider theme={theme}>
                <SummaryCard {...reviewedProps} />
            </ThemeProvider>
        );
    
        expect(screen.getByText('Submit Your Credit')).toBeInTheDocument();
    });
    
    it('should render with undefined props', () => {
        const props: CardProps = {
            sliderValue: undefined,
            contracts: undefined,
            variedCashkick: undefined,
            finalCashkick: undefined,
            paybackAmount: undefined,
            percentage: undefined,
            percetageAmount: undefined,
            totalPayout: undefined,
            initialIsReviewed: undefined,
            onClickResetData: undefined,
            reviewCredit: undefined,
            handleSliderChange: undefined,
        };
    
        render(
            <ThemeProvider theme={theme}>
                <SummaryCard {...props} id="SummaryCard" />
            </ThemeProvider>
        );
    
        expect(screen.getByTestId('SummaryCard')).toBeInTheDocument();
    });

    
    
})