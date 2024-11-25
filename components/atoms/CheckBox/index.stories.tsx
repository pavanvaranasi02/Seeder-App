import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CheckBox, { StyledCheckboxProps } from '.';

export default {
  title: 'Atoms/CheckBox',
  component: CheckBox,
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    id: { control: 'text' },
    className: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<StyledCheckboxProps> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  indeterminate: false,
  id: 'default-checkbox',
  className: '',
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  indeterminate: false,
  id: 'checked-checkbox',
  className: '',
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  checked: false,
  indeterminate: true,
  id: 'indeterminate-checkbox',
  className: '',
};
