import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { LoginProps, SocialLogin } from "./index";
import  IconPath  from "../../../utils/Constants";
import theme from "../../../theme";


describe('<SocialLogin />', () => {

    const defaultProps: LoginProps = {
        src: IconPath.google,
        alt: 'Google Icon',
        variant: 'body1',
        children: 'Sign in',
        id: 'socialLogin'
    };

    it('should render with default props', () => {
        render( <SocialLogin {...defaultProps} /> );

        const socialLoginElement = screen.getByTestId('socialLogin');
        expect(socialLoginElement).toBeInTheDocument();
        const imgElement = socialLoginElement.querySelector('img');
        expect(imgElement).toHaveAttribute('src', IconPath.google);
        expect(imgElement).toHaveAttribute('alt', 'Google Icon');
        const typographyElement = screen.getByText('Sign in');
        expect(typographyElement).toBeInTheDocument();
    });

    const alternateProps: LoginProps = {
        src: IconPath.stripe,
        alt: 'Stripe Icon',
        variant: 'h4',
        children: 'Login with Stripe',
        id: 'socialLoginStr'
    }

    it('should render with alternate props', () => {
        render( <SocialLogin {...alternateProps} /> );

        const socialLoginElement = screen.getByTestId('socialLoginStr');
        expect(socialLoginElement).toBeInTheDocument();
        const imgElement = socialLoginElement.querySelector('img');
        expect(imgElement).toHaveAttribute('src', IconPath.stripe);
        expect(imgElement).toHaveAttribute('alt', 'Stripe Icon');
        const typographyElement = screen.getByText('Login with Stripe');
        expect(typographyElement).toBeInTheDocument();
        expect(typographyElement).toHaveClass('MuiTypography-h4');
    });

    const customStyleProps: LoginProps = {
        src: IconPath.xero,
        alt: 'Xero Icon',
        variant: 'subtitle1',
        children: 'Xero Login',
        id: 'customSocialLogin'
    };

    it('should render with Custom Style props', () => {
        render( <SocialLogin {...customStyleProps} /> );

        const socialLoginElement = screen.getByTestId('customSocialLogin');
        expect(socialLoginElement).toBeInTheDocument();
        expect(socialLoginElement).toHaveStyle({
            width: '100%',
            maxWidth: '130px',
            height: '96px',
            borderRadius: '12px',
        });
        const imgElement = socialLoginElement.querySelector('img');
        expect(imgElement).toHaveStyle({
            width: '100%',
            maxWidth: '20px',
            height: 'auto',
        });
        const typographyElement = screen.getByText('Xero Login');
        expect(typographyElement).toHaveStyle({
            fontSize: theme.typography.subtitle1.fontSize,
            fontWeight: theme.typography.subtitle1.fontWeight,
        });
    });
    
});