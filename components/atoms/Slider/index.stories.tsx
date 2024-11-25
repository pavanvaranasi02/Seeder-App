import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CustomSliderComponent, { SliderProps } from './index';
import theme from '../../../theme';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Atoms/CustomSliderComponent',
  component: CustomSliderComponent,
  argTypes: {
    width: { control: 'text' },
    maxValue: { control: 'number' },
    value: { control: 'number' },
    onSliderChange: { action: 'changed' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<SliderProps> = (args) => {

  return (
    <CustomSliderComponent 
      {...args}
      onSliderChange={action('changed')}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  maxValue: 100,
  value: 0,
  width: '100%',
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  maxValue: 100,
  value: 0,
  width: '300px',
};

export const MaxValue200 = Template.bind({});
MaxValue200.args = {
  maxValue: 200,
  value: 100,
  width: '300px',
};

export const InitialValue75 = Template.bind({});
InitialValue75.args = {
  maxValue: 100,
  value: 75,
  width: '300px',
};
