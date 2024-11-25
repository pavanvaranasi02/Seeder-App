import React from "react";
import { Meta, StoryFn } from "@storybook/react/*";
import SideNavBar, { SideNavprops } from ".";


export default {
    title: 'Organisms/SideNavBar',
    Component: SideNavBar,
    argTypes: {
        activeIndex: { control: 'number' },
    },
    parameters: {
      actions: {
        handles: ['click .ButtonStack']
      }
    }
} as Meta;

const Template: StoryFn<SideNavprops> = (args) => <SideNavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  activeIndex: null, 
};

export const ActiveHomeButton = Template.bind({});
ActiveHomeButton.args = {
  activeIndex: 1, 
};

export const ActiveCashButton = Template.bind({});
ActiveCashButton.args = {
  activeIndex: 2, 
};

