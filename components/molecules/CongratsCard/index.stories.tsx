import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../../../theme';
import CongratsCard, { CongratsCardProps, StyledSpan } from '.';

export default {
  title: 'Molecules/CongratsCard',
  component: CongratsCard,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    heading: { control: 'text' },
    body: { control: 'text' },
    buttonLabel: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<CongratsCardProps> = (args) => (
  <CongratsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  heading: 'Congratulations! You are ready to start!',
  body: (
    <>
      You are approved for funding. We are ready to advance you up to
      <StyledSpan> $8.8M</StyledSpan>
    </>
  ),
  buttonLabel: 'Learn More',
};
