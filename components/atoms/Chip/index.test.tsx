import React from 'react';
import StyledChip from './index';
import '@testing-library/jest-dom';
import { render, screen} from '@testing-library/react';

describe('StyledChip component', () => {
    it('should render with default props', () => {
        render(<StyledChip label="Test Chip" />);
        const chipElement = screen.getByText('Test Chip');
        expect(chipElement).toBeInTheDocument();

        const chipParentElement = chipElement.parentElement;
        expect(chipParentElement).toBeInTheDocument();

        if (chipParentElement) {
            const chipComputedStyle = window.getComputedStyle(chipParentElement);
            expect(chipComputedStyle.backgroundColor).toBe('lightblue');
            expect(chipComputedStyle.borderRadius).toBe('4px');
            expect(chipComputedStyle.padding).toBe('4px 8px');
        } else {
            expect(chipParentElement).toBeInTheDocument();
        }

        expect(chipElement).toHaveStyle('color: black');
    });

    it('should render with custom color', () => {
        render(<StyledChip label="Custom Chip" customcolor="red" />);
        const chipLabelElement = screen.getByText('Custom Chip');
        expect(chipLabelElement).toBeInTheDocument();
        expect(chipLabelElement).toHaveStyle('color: red');
    });

    it('should render with specified width and height', () => {
        render(<StyledChip label="Sized Chip" width="200px" height="60px" />);
        const chipElement = screen.getByText('Sized Chip');
        expect(chipElement).toBeInTheDocument();

        const chipParentElement = chipElement.parentElement;
        expect(chipParentElement).toBeInTheDocument();

        if (chipParentElement) {
            const chipComputedStyle = window.getComputedStyle(chipParentElement);
            expect(chipComputedStyle.width).toBe('200px');
            expect(chipComputedStyle.height).toBe('60px');
        } else {
            expect(chipParentElement).toBeInTheDocument();
        }
    });

    it('should render with custom font size and weight', () => {
        render(<StyledChip label="Styled Chip" fontSize={20} fontWeight={700} />);
        const chipLabelElement = screen.getByText('Styled Chip');
        expect(chipLabelElement).toBeInTheDocument();
        expect(chipLabelElement).toHaveStyle('font-size: 20px');
        expect(chipLabelElement).toHaveStyle('font-weight: 700');
    });

    it('should render with line height and letter spacing', () => {
        render(<StyledChip label="Styled Chip" lineHeight={2} letterSpacing="0.1em" />);
        const chipLabelElement = screen.getByText('Styled Chip');
        expect(chipLabelElement).toBeInTheDocument();
        expect(chipLabelElement).toHaveStyle('letter-spacing: 0.1em');
    });

    it('should render with background color', () => {
        render(<StyledChip label="Styled Chip" backgroundColor="yellow" />);
        const chipElement = screen.getByText('Styled Chip');
        expect(chipElement).toBeInTheDocument();
    });

    it('should render with custom font family', () => {
        render(<StyledChip label="Styled Chip" fontFamily="Arial, sans-serif" />);
        const chipLabelElement = screen.getByText('Styled Chip');
        expect(chipLabelElement).toBeInTheDocument();
    });
});