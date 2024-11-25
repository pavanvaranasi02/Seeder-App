import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomCircularProgress from '.';
import { Box } from '@mui/material';

export default {
  title: 'Components/CustomCircularProgress',
  component: CustomCircularProgress,
  argTypes: {
    value: { control: 'number' },
    size: { control: 'number' },
    strokeWidth: { control: 'number' },
    customcolor: { control: 'color' },
    customfontsize: { control: 'text' },
  },
} as ComponentMeta<typeof CustomCircularProgress>;

const Template: ComponentStory<typeof CustomCircularProgress> = (args) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CustomCircularProgress {...args} />
  </Box>
);

export const Primary = Template.bind({});

Primary.args = {
  value: 45,
  size: 100,
  strokeWidth: 4,
  customcolor: '#FF6347',
  customfontsize: '16px',
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: 70,
  size: 150,
  strokeWidth: 6,
  customcolor: '#4682B4',
  customfontsize: '20px',
};

export const LargeProgress = Template.bind({});
LargeProgress.args = {
  value: 90,
  size: 200,
  strokeWidth: 8,
  customcolor: '#32CD32',
  customfontsize: '24px',
};
