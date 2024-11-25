import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CashAcceleration, { CashAccelerationProps } from './index';
import{ MyCashKickColumns, MyCashKickRows, MyContractsColumns, MyContractsRows } from '../../../utils/Constants';

export default {
  title: 'Organisms/CashAcceleration',
  component: CashAcceleration,
  argTypes: {
    enableSync: { control: 'boolean' },
    activeButton: { control: 'text' },

  },
} as Meta;
const Template: StoryFn<CashAccelerationProps> = (args) => <CashAcceleration {...args} />;

export const Default = Template.bind({});
Default.args = {
  enableSync: false,
  myContractsRows: MyContractsRows,
  myContractsColumns: MyContractsColumns,
  myCashKickRows:  MyCashKickRows,
  myCashKickColumns: MyCashKickColumns,
};

export const SyncEnabled = Template.bind({});
SyncEnabled.args = {
  enableSync: true,
  myContractsRows: MyContractsRows,
  myContractsColumns: MyContractsColumns,
  myCashKickRows:  MyCashKickRows,
  myCashKickColumns: MyCashKickColumns,
};

export const MyContractsActive = Template.bind({});
MyContractsActive.args = {
  enableSync: true,
  activeButton: 'myContracts', 
  myContractsRows: MyContractsRows,
  myContractsColumns: MyContractsColumns,
  myCashKickRows:  MyCashKickRows,
  myCashKickColumns: MyCashKickColumns,
};

export const MyCashKicksActive = Template.bind({});
MyCashKicksActive.args = {
  enableSync: true,
  activeButton: 'myCashKicks', 
  myContractsRows: MyContractsRows,
  myContractsColumns: MyContractsColumns,
  myCashKickRows:  MyCashKickRows,
  myCashKickColumns: MyCashKickColumns,
};


