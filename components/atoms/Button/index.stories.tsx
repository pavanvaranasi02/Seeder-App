import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import CustomButton, { ButtonProps } from '../Button/index'
import theme from '../../../theme/index'

export default {
  title: 'Atoms/CustomButton',
  component: CustomButton,
  argTypes: {
    onClick: { action: 'clicked' },
    backgroundColor: { control: 'color' },
    backgroundHoverColor: { control: 'color' },
    opacity: { control: 'number', min: 0, max: 1, step: 0.1 },
    variant: {
      control: {
        type: 'select',
        options: ['text', 'outlined', 'contained'],
      },
    },
  },
} as Meta

const Template: StoryFn<ButtonProps> = (args) => <CustomButton {...args} />

export const ForgotPassword = Template.bind({})
ForgotPassword.args = {
  children: 'Forgot Password?',
  variant: 'text',
  backgroundColor: 'transparent',
  backgroundHoverColor: theme.palette.primary.purple[400],
}

export const ContainedButton = Template.bind({})
ContainedButton.args = {
  children: 'Review your credit',
  variant: 'contained',
  backgroundColor: theme.palette.primary.purple[500],
  backgroundHoverColor: theme.palette.primary.purple[500],
}

export const DiabledButton = Template.bind({})
DiabledButton.args = {
  children: 'Review your credit',
  variant: 'contained',
  opacity: 0.56,
  backgroundColor: theme.palette.primary.purple[500],
  backgroundHoverColor: theme.palette.primary.purple[500],
}

export const CancleButton = Template.bind({})
CancleButton.args = {
  children: 'Cancel',
  variant: 'contained',
  backgroundColor: theme.palette.background.elevation2,
}
