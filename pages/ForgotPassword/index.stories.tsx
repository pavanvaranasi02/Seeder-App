import React from "react";
import { StoryFn,Meta } from "@storybook/react/*";
import { BrowserRouter } from "react-router-dom";
import ForgotPasswordPage from ".";

export default{
    title:'Pages/ForgotPassword',
    component:ForgotPasswordPage,
    decorators: [
        (Story) => (
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        ),
      ],
} as Meta

const Template:StoryFn=()=><ForgotPasswordPage/>

export const Default = Template.bind({});
Default.args = {};


