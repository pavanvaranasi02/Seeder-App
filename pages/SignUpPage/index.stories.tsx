import React from 'react';
import { StoryFn} from '@storybook/react';
import SignUpPage from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'Pages/SignUpPage',
    component: SignUpPage,
    argTypes: {
        onSubmit: { action: 'submitted' },
        onEmailChange: { action: 'email changed' },
        onNameChange: { action: 'name changed' },
        onPasswordChange: { action: 'password changed' },
        onLoginClick: { action: 'login clicked' },
        onGoogleSignupClick: { action: 'google signup clicked' },
        onStripeSignupClick: { action: 'stripe signup clicked' },
        onXeroSignupClick: { action: 'xero signup clicked' },
    },
    decorators: [
        (Story: React.ComponentType) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
};

const Template: StoryFn = (args) => <SignUpPage {...args} />;

export const Default = Template.bind({});
Default.args = {
    email: '',
    name: '',
    password: '',
    emailError: '',
    passwordError: '',
};