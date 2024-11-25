import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Avatar,{AvatarProps} from './index';
import Image from '../../../../public/assets/icons/Image.svg'

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    alt: { control: 'text' },
    src: { control: 'text' },
    style: { control: 'object' },
  },
} as Meta;

const Template: StoryFn<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  alt: 'Profile Picture',
  src: `${Image}`,
  style: { backgroundColor: 'red' },
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  alt: 'Profile Picture',
  src: `${Image}`,
  style: { width: 100, height: 100 },
};

export const RoundedVariant = Template.bind({});
RoundedVariant.args = {
  alt: 'Profile Picture',
  src: `${Image}`,
  variant: 'rounded',
};