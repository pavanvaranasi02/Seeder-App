import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TableEmptyCard, { TableEmptyCardProps } from './index';
import { GridColDef } from '@mui/x-data-grid';
import { ThemeProvider,CssBaseline } from '@mui/material';
import theme from '../../../theme';
import { action } from '@storybook/addon-actions';


  const meta: Meta = {
    title: 'Organisms/TableEmptyCard',
    component: TableEmptyCard,
  };

  
  export default meta;
  
  const mockColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'perPayment', headerName: 'Per Payment', width: 150 },
    { field: 'termLength', headerName: 'Term Length', width: 150 },
    { field: 'paymentAmount', headerName: 'Payment Amount', width: 150 },
  ];
  
  const Template: StoryFn<TableEmptyCardProps> = (args) => (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <TableEmptyCard {...args} />
      
    </ThemeProvider>
  );
  
  export const InitialState = Template.bind({});
  InitialState.args = {
    columns: mockColumns,
    isInitial: true,
    onConnect: action('Connect button clicked!'),
  };
  
  export const CashKickPressed = Template.bind({});
  CashKickPressed.args = {
    columns: mockColumns,
    cashKickPressed: true,
    onLaunch: action('Launch button clicked!'),
  };
  
  export const SuccessfulConnection = Template.bind({});
  SuccessfulConnection.args = {
    columns: mockColumns,
    isSuccessful: true,
  };
  
  export const LoadFailure = Template.bind({});
  LoadFailure.args = {
    columns: mockColumns,
    onFailure: action('Retry button clicked!'),
  };