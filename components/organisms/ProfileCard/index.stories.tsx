import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import HeaderCard, { HeaderCardProps } from '../../molecules/HeaderCard';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Organisms/ProfileCard',
  component: HeaderCard,
} as Meta;

const Template: StoryFn<HeaderCardProps> = (args) => {

  return (
      <HeaderCard {...args} />
  );
};

export const Default = Template.bind({});
Default.args={greeting:true,onLogout:action("Logout Clicked")};
