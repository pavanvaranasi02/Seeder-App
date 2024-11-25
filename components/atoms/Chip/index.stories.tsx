import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import StyledChip, { StyledChipProps } from './index';

export default {
  title: 'Components/StyledChip',
  component: StyledChip,
  argTypes: {
    backgroundColor: { control: 'color' },
    customcolor: { control: 'color' },
    fontSize: { control: 'number' },
    fontFamily: { control: 'text' },
    fontWeight: { control: 'number' },
    lineHeight: { control: 'text' },
    letterSpacing: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<StyledChipProps> = (args) => <StyledChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Chip',
  backgroundColor: 'lightblue',
  customcolor: 'black',
  fontSize: 16,
  fontFamily: 'Arial',
  fontWeight: 400,
  lineHeight: '1.5',
  letterSpacing: 'normal',
  width: '150px',
  height: '50px',
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  label: 'Custom Colors',
  backgroundColor: 'pink',
  customcolor: 'blue',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  label: 'Custom Size',
  width: '200px',
  height: '60px',
};

export const CustomTypography = Template.bind({});
CustomTypography.args = {
  label: 'Custom Typography',
  fontSize: 20,
  fontFamily: 'Courier New',
  fontWeight: 700,
  lineHeight: '2',
  letterSpacing: '2px',
};
