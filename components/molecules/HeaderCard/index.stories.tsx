import React from 'react';
import {Meta,StoryFn } from '@storybook/react';
import HeaderCard from '.';
import { action } from '@storybook/addon-actions';
import IconPath from '../../../utils/Constants';

export default {
  title: 'Molecules/HeaderCard',
  component: HeaderCard,
  argTypes: {
    greeting: { control: 'boolean' },
    heading: { control: 'text' },
    content: { control: 'text' },
    profileAvatar: { control: 'text' },
    iconSrc: { control: 'text' },
    currentHour: { control: 'number' },
    onLogout: { action: 'Logged out' },
  },
} as Meta<typeof HeaderCard>;

const Template: StoryFn<typeof HeaderCard> = (args) => (
  <HeaderCard {...args} />
);

export const Greeting = Template.bind({});
Greeting.args = {
  greeting: true,
  profileAvatar: IconPath.avatarImg,
  iconSrc: IconPath.arrowDropDownIcon,
  onLogout: action('onLogout'),
};

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  greeting: false,
  heading: 'Custom Heading',
  content: 'This is custom content',
  profileAvatar: IconPath.avatarImg,
  iconSrc: IconPath.arrowDropDownIcon,
  onLogout: action('onLogout'),
};

export const AfternoonGreeting = Template.bind({});
AfternoonGreeting.args = {
  greeting: true,
  currentHour: 14,
  profileAvatar: IconPath.avatarImg,
  iconSrc: IconPath.arrowDropDownIcon,
  onLogout: action('onLogout'),
};

export const EveningGreeting = Template.bind({});
EveningGreeting.args = {
  greeting: true,
  currentHour: 19,
  profileAvatar: IconPath.avatarImg,
  iconSrc: IconPath.arrowDropDownIcon,
  onLogout: action('onLogout'),
};
