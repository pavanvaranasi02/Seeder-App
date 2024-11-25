import React from 'react';
import { StoryFn, Meta } from '@storybook/react/types-6-0';
import CashKickCard, { CashKickCardProps } from './';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Organisms/CashKickCard',
  component: CashKickCard,
  argTypes: {
    cashKickkamount: { control: 'number' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<CashKickCardProps> = (args) => (
  <CashKickCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  cashKickkamount: 8800000,
  onClick: action('Button clicked!'),
};
