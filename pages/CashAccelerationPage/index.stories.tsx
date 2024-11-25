import React from "react";
import CashAccelerationPage from ".";
import { Meta, StoryFn } from "@storybook/react/*";
import { MemoryRouter } from "react-router-dom";

export default {
    title: 'Pages/CashAccelerationPage',
    component: CashAccelerationPage,
    decorators: [(StoryFn) => <MemoryRouter><StoryFn /></MemoryRouter>],
} as Meta;

const Template: StoryFn = (args) => <CashAccelerationPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    contracts: [],
      cashkicks: [],
      availbleCredit: 0,
      isInitial: false,
      isSuccessful: false,
      hasError: false,
      cashKickPressed: false,
};