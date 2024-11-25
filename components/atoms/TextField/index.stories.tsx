import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TextField, { TextFieldProps } from '.';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';

export default {
  title: 'Atoms/CustomTextField',
  component: TextField,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<TextFieldProps> = (args) => <TextField {...args} />;

export const WithStartAdornment = Template.bind({});
WithStartAdornment.args = {
  startSrc: './assets/icons/lock.svg',
  startAlt: 'Lock',
  placeholder: 'Enter your password',
};

export const WithEndAdornment = Template.bind({});
WithEndAdornment.args = {
  endSrc: './assets/icons/eye.svg',
  endAlt: 'Eye',
  placeholder: 'Enter your password',
};

export const WithBothAdornments = Template.bind({});
WithBothAdornments.args = {
  startSrc: './assets/icons/lock.svg',
  startAlt: 'Lock',
  endSrc: './assets/icons/eye.svg',
  endAlt: 'Eye',
  placeholder: 'Enter your password',
};

export const WithoutAdornments = Template.bind({});
WithoutAdornments.args = {
  placeholder: 'Enter your password',
};

export const FocusedWithBothAdornments = Template.bind({});
FocusedWithBothAdornments.args = {
  startSrc: './assets/icons/lock.svg',
  startAlt: 'Lock',
  endSrc: './assets/icons/eye.svg',
  endAlt: 'Eye',
  placeholder: 'Enter your password',
  InputProps: {
    className: 'Mui-focused',
  },
};
