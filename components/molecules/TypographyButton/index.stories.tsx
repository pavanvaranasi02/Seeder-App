import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TypographyButton, { TypographyButtonProps } from '.';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/index';
import { CssBaseline } from '@mui/material';
import { action } from '@storybook/addon-actions';

export default {
  title: 'components/Molecules/TypographyButton',
  component: TypographyButton,
  decorators: [(Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )],
  parameters: {
    actions: {
      handles: ['click .typography-button']
    }
  }
} as Meta;

const Template: StoryFn<TypographyButtonProps> = (args) => (
  <TypographyButton
    {...args}
    onButtonClick={() => action('Button Clicked')(args.buttonLabel)}
  />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Already have an account? ',
  titleVariant: 'body1',
  titleColor: theme.palette.text.lowEmphasis,
  buttonLabel: 'Login',
};

export const SignupButton = Template.bind({});
SignupButton.args = {
  title: 'Don\'t have an account? ',
  titleVariant: 'body1',
  titleColor: theme.palette.text.lowEmphasis,
  buttonLabel: 'Sign up',
};

export const GobackButton = Template.bind({});
GobackButton.args = {
  title: 'Go back to ',
  titleVariant: 'body1',
  titleColor: theme.palette.text.lowEmphasis,
  buttonLabel: 'Login',
};
