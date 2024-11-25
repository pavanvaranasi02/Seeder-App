import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import  {customChips,customDualText,customText,customColumn} from '../../../utils/helper';
import { cashAcclerationRows, cashKickRows } from '../../../utils/Constants/index';
import theme from '../../../theme';
import ContractsTable, { ISeederDataGridProps } from '.';

export default {
  title: 'components/Molecules/ContractsTable',
  component: ContractsTable,
} as Meta;

const Template: StoryFn<ISeederDataGridProps> = (args) => (
  <ContractsTable {...args}  />
);

export const CashAcceleration = Template.bind({});
CashAcceleration.args = {
  columns: [
    customColumn({
      field: 'name',
      headerText: 'Name',
      valueColor: theme.palette.text.highEmphasis,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell',
    }),
    customColumn({
      field: 'type',
      headerText: 'Type',
      valueColor: theme.palette.text.lowEmphasis,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell',
    }),
    customColumn({
      field: 'perPayment',
      headerText: 'Per Payment',
      headerClassName: 'super-app-theme--header',
      valueColor: theme.palette.text.lowEmphasis,
      cellClassName: 'super-app-theme--cell',
    }),
    {
      field: 'termLength',
      width: 200,
      sortable: false,
      renderHeader: () => customText('Term Length', 'body2'),
      renderCell: (params: GridRenderCellParams) =>
        customDualText(params.value),
      headerClassName: 'super-app-theme--header',
    },
    customColumn({
      field: 'paymentAmount',
      headerText: 'Payment Amount',
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      valueColor: theme.palette.text.lowEmphasis,
    }),
  ],
  rows: cashAcclerationRows,
  enableRowSelection: true,
};

export const CashKick: StoryFn<ISeederDataGridProps> = Template.bind({});
CashKick.args = {
  columns: [
    customColumn({ 
      field: 'name', 
      headerText: 'Name', 
      marginTop: 15 ,
      headerClassName: 'super-app-theme--header',
    }),
    {
      field: 'status',
      width: 200,
      sortable: false,
      renderHeader: () => customText('Status', 'body2'),
      renderCell: (params: GridRenderCellParams) => customChips(params.value),
      headerClassName: 'super-app-theme--header',

    },
    customColumn({ 
      field: 'maturity', 
      headerText: 'Maturity',
       marginTop: 15 ,
       headerClassName: 'super-app-theme--header',
      }),
    {
      field: 'totalReceived',
      width: 200,
      sortable: false,
      renderHeader: () => customText('Total Received', 'body2'),
      renderCell: (params: GridRenderCellParams) =>
        customDualText(params.value),
      headerClassName: 'super-app-theme--header',
    },
    customColumn({
      field: 'totalFinanced',
      headerText: 'Total Financed',
      marginTop: 15,
      headerClassName: 'super-app-theme--header',
    }),
  ],
  rows: cashKickRows,
};