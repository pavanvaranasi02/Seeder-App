import React from "react";
import { LoginProps, SocialLogin } from "./index";
import { Meta, StoryFn } from "@storybook/react/*";
import  IconPath  from "../../../utils/Constants";


const googleLogo = IconPath.google;
const stripeLogo = IconPath.stripe;
const xeroLogo = IconPath.xero;

export default {
    title: 'components/Molecules/SocialLogin',
    Component: SocialLogin,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'heading2', 'heading3', 'title', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'],
            },
        },
        color: {
            control: 'color',
        }
    },
} as Meta;

const Template: StoryFn<LoginProps> = (args) =>( 
    <SocialLogin {...args} />

);

export const GoogleLogin = Template.bind({});
    GoogleLogin.args = {
        src: googleLogo,
        alt: 'Google Logo',
        variant: 'button',
        children: 'Google Login', 
    }

export const StripeLogin = Template.bind({});
    StripeLogin.args = {
        src: stripeLogo,
        alt: 'Stripe Logo',
        variant: 'title',
        children: 'Stripe' 
    }

export const XeroLogin = Template.bind({});
    XeroLogin.args = {
        src: xeroLogo,
        alt: 'Xero Logo',
        variant: 'body2',
        children: 'Xero Login' 
    }

export const GoogleSignup = Template.bind({});
    GoogleSignup.args = {
        src: googleLogo,
        alt: 'Google Logo',
        variant: 'heading3',
        children: 'Signup', 
    }