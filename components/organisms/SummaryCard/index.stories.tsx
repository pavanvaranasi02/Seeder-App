import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SummaryCard, { CardProps } from ".";


export default {
  title: 'Organisms/SummaryCard',
  component: SummaryCard,
} as Meta;

const Template: StoryFn<CardProps> = (args) => <SummaryCard {...args} />;

export const Default = Template.bind({});
Default.args = {};


export const WithContracts = Template.bind({});
WithContracts.args = {
  sliderValue: 3,
  contracts: 3,
  initialIsReviewed: false,
  variedCashkick: 283442.64,
  finalCashkick: 880000.00,
  paybackAmount: 288003.30,
  percentage: 12.00,
  percetageAmount: 34560.56,
  totalPayout: 253442.50,
};

export const Reviewed = Template.bind({});
Reviewed.args = {
  sliderValue: 3,
  contracts: 3,
  initialIsReviewed: true,
  variedCashkick: 283442.64,
  finalCashkick: 880000.00,
  paybackAmount: 288003.30,
  percentage: 12,
  percetageAmount: 34560.56,
  totalPayout: 253442.50,
};

export const contractsSelected = Template.bind({});
contractsSelected.args = {
  sliderValue: 2,
  contracts: 2,
  initialIsReviewed: false,
  variedCashkick: 164542.45,
  finalCashkick: 880000.00,
  paybackAmount: 170454.55,
  percentage: 12,
  percetageAmount: 20454.55,
  totalPayout: 150000.00,
};
