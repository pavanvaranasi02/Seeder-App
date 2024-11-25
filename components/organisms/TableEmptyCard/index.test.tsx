import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import TableEmptyCard,{TableEmptyCardProps} from './index';
import '@testing-library/jest-dom';  
import { GridColDef } from '@mui/x-data-grid';


  describe('TableEmptyCard Component', () => {
    const columns: GridColDef[] = []; 
    const rows: any[] = []; 
    
    const defaultProps: TableEmptyCardProps = {
      columns: columns,
      rows: rows,
      isSuccessful: false,
      isInitial: false,
      cashKickPressed: false,
      onLaunch: jest.fn(),
      onFailure: jest.fn(),
      onConnect: jest.fn(),
    };
  
    it('renders without crashing', () => {
      render(<TableEmptyCard {...defaultProps} />);
    });
  
   
    it('renders cash kick pressed state correctly', () => {
      const { getByText } = render(<TableEmptyCard {...defaultProps} cashKickPressed={true} />);
      expect(getByText('You don’t have any Cash Kick')).toBeInTheDocument();
    });
  
    it('renders successful state correctly', () => {
      const { getByText } = render(<TableEmptyCard {...defaultProps} isSuccessful={true} />);
      expect(getByText('Connected Successfully')).toBeInTheDocument();
    });
  
    it('renders failure state correctly', () => {
      const { getByText } = render(<TableEmptyCard {...defaultProps} />);
      expect(getByText('Failed to load contracts!')).toBeInTheDocument();
      expect(getByText('Please contact customer support if this problem persists')).toBeInTheDocument();
    });
  
    it('calls onLaunch when "Launch A new cash kick" button is clicked', () => {
      const { getByText } = render(<TableEmptyCard {...defaultProps} cashKickPressed={true} />);
      fireEvent.click(getByText('Launch A new cash kick'));
      expect(defaultProps.onLaunch).toHaveBeenCalled();
    });
  
    it('calls onConnect when "Connect Now" button is clicked', () => {
      const { getByText } = render(<TableEmptyCard {...defaultProps} isInitial={true} />);
      fireEvent.click(getByText('Connect Now'));
      expect(defaultProps.onConnect).toHaveBeenCalled();
    });
  
    it('calls onFailure when "Retry" button is clicked', () => {
      const { getByText } = render(<TableEmptyCard {...defaultProps} />);
      fireEvent.click(getByText('Retry'));
      expect(defaultProps.onFailure).toHaveBeenCalled();
    });
  })