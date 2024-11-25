import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../components/templates/Authentication';
import ForgotPassword from '../../components/organisms/ForgotPassword';
import ResetPassword from '../../components/organisms/ResetPassword';
import IconPath, {
  AUTH_ERROR,
  ERROR,
  EmailValidation,
} from '../../utils/Constants';
import { CHECK_EMAIL } from '../../services';
import { UserContext } from '../../App';

interface User {
  email: string;
  authenticated: boolean;
  errors: string;
}

const ForgotPasswordPage = () => {
  const [data, setData] = useState<User>({
    email: '',
    authenticated: false,
    errors: '',
  });

  const navigate = useNavigate();
  const { setId } = useContext(UserContext);
  const handleResetPasswordClick = (email: string) => {
    setData((prevState) => ({
      ...prevState,
      email: email,
    }));

    const fetchUser = async (email: string) => {
      try {
        const user = await CHECK_EMAIL(email);
        if (user) {
          setData((prevState) => ({
            ...prevState,
            authenticated: true,
          }));
          console.log('User Data: ', user);
          setId(user.id);
        } else {
          setData((prevState) => ({
            ...prevState,
            authenticated: false,
            errors: ERROR,
          }));
        }
      } catch (error) {
        setData((prevState) => ({
          ...prevState,
          authenticated: false,
          errors: AUTH_ERROR,
        }));
      }
    };

    fetchUser(email);
  };

  const handleContinueClick = () => {
    navigate('/reset-code-page');
  };

  const handleLoginButtonClick = () => {
    navigate('/');
  };

  return (
    <Authentication
      imageSrc={IconPath.Password}
      OrganismComponent={
        data.authenticated === false ? (
          <ResetPassword
            startSrc={IconPath.NotificationImg}
            placeholder="Enter your email id"
            buttonLabel="Reset Password"
            title="Forgot Password"
            description="No worries, we’ll send you link to your email id to reset your password"
            onButtonClick={handleResetPasswordClick}
            onLoginButtonClick={handleLoginButtonClick}
            helperText={data.errors}
            validateInput={EmailValidation}
          />
        ) : (
          <ForgotPassword
            buttonLabel="Continue"
            description="No worries, we’ll send you link to your email id to reset your password"
            resetMailHeading="Reset email sent"
            resetMailSubText1={`We have sent mail to `}
            resetMailSubText2={` with reset password instructions`}
            emailEntered={data.email}
            onButtonClick={handleContinueClick}
          />
        )
      }
    />
  );
};

export default ForgotPasswordPage;
