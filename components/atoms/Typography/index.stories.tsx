import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TypographyAtom, { TypoProps } from '.';
import theme from '../../../theme';

export default {
  title: 'Atoms/TypographyAtom',
  component: TypographyAtom,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'heading2', 'heading3', 'title', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'],
      },
    },
    color: {
      control: 'color',
    },
  },
} as Meta;

const Template: StoryFn<TypoProps> = (args) => <TypographyAtom {...args} />;

export const DefaultTypography = Template.bind({});
DefaultTypography.args = {
  variant: 'body1',
  children: 'Default Typography',
};

export const ColoredTypography = Template.bind({});
ColoredTypography.args = {
  variant: 'h3',
  color: theme.palette.text.mediumEmphasis,
  children: 'Colored Typography',
};

export const CustomVariantTypography = Template.bind({});
CustomVariantTypography.args = {
  variant: 'title',
  color: theme.palette.text.highEmphasis,
  children: 'Custom Variant Typography',
};

export const CaptionTypography = Template.bind({});
CaptionTypography.args = {
  variant: 'caption',
  children: 'Custom caption Typography',
};