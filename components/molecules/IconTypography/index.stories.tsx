import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import IconTypography, { IconTypographyProps } from '.';
import IconPath from '../../../utils/Constants';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
import { CssBaseline } from '@mui/material';

const meta: Meta = {
  title: 'Molecules/IconTypography',
  component: IconTypography,
  argTypes: {
    iconSrc: { control: 'text' },
    iconAlt: { control: 'text' },
    iconWidth: { control: 'text' },
    iconHeight: { control: 'text' },
    iconOpacity: { control: 'text' },
    buttonLabel: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<IconTypographyProps> = (args) => (
  <IconTypography {...args} />
);

export const SingleTypography = Template.bind({});
SingleTypography.args = {
  iconSrc: IconPath.chequeIllustration,
  iconAlt: 'Cheque Illustration',
  iconWidth: '231.72px',
  iconHeight: '160px',
  iconOpacity: '80%',
  typo: [
    {
      variant: 'heading3',
      color: theme.palette.text.lowEmphasis,
      children: "You don't have any Cash Kick",
    },
  ],
  buttonLabel: 'Click Me',
};

export const MultipleTypography = Template.bind({});
MultipleTypography.args = {
  iconSrc: IconPath.warningImg,
  iconAlt: 'Warning Image 3d',
  iconWidth: '231.72px',
  iconHeight: '160px',
  typo: [
    {
      variant: 'heading3',
      color: theme.palette.text.highEmphasis,
      children: 'Failed to load contracts!',
    },
    {
      variant: 'caption',
      color: theme.palette.text.lowEmphasis,
      children: 'Please contact customer support if this problem persists',
    },
  ],
  buttonLabel: 'Click Me',
};

export const OptionalButton = Template.bind({});
OptionalButton.args = {
  iconSrc: IconPath.coinsBag,
  iconAlt: 'Coins Bag',
  iconWidth: '231.72px',
  iconHeight: '160px',
  typo: [
    {
      variant: 'heading3',
      color: theme.palette.text.highEmphasis,
      children: 'Connected Succesfully!',
    },
  ],
};
