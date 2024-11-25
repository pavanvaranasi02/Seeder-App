import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../components/templates/Authentication';
import ChangePassword from '../../components/organisms/ChangePassword';
import ForgotPassword from '../../components/organisms/ForgotPassword';
import IconPath, { PasswordValidation } from '../../utils/Constants';
import {
  getUserByEmail,
  updateUserPassword,
  getUserById,
} from '../../services';
import { UserContext } from '../../App';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  availableCredit?: number;
}

const ChangePasswordPage = () => {
  const [changePassword, setChangePassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [changePasswordError, setChangePasswordError] = useState<string>('');

  const navigate = useNavigate();
  const { id, setId } = useContext(UserContext);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (id) {
        const data = await getUserById(id);
        if (data) {
          console.log('Data email:', data.email);
          setEmail(data.email);
        }
      }
    };
    fetchUserEmail();
  }, [id]);

  const handleLoginClick = () => {
    setId('');
    navigate('/');
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePassword(e.target.value);
    setChangePasswordError('');
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (
      !PasswordValidation.test(changePassword) ||
      !PasswordValidation.test(password)
    ) {
      setChangePasswordError('Passwords are not in correct format');
      hasError = true;
    } else if (password !== changePassword) {
      setChangePasswordError('Passwords do not match');
      hasError = true;
    } else {
      setChangePasswordError('');
    }

    if (hasError) {
      return;
    }

    const useAxiosResponse = await getUserByEmail(email);
    if (useAxiosResponse.data) {
      const user: User[] = useAxiosResponse.data;
      user[0].password = changePassword;
      await updateUserPassword(user[0]);
      console.log('User', user[0]);
      setIsSubmitted(true);
    }
  };

  return (
    <Box data-testid="change-password-component">
      <Authentication
        OrganismComponent={
          isSubmitted ? (
            <ForgotPassword
              resetMailHeading="Password reset successful"
              resetMailSubText1="Click on the button below to proceed to login"
              buttonLabel="Login Now"
              onButtonClick={handleLoginClick}
            />
          ) : (
            <ChangePassword
              password={password}
              changePassword={changePassword}
              handleChangePassword={handleChangePassword}
              handlePassword={handlePassword}
              handleFormSubmit={handleFormSubmit}
              changePasswordError={changePasswordError}
            />
          )
        }
        imageSrc={IconPath.Password}
        imageAlt="Password"
      />
    </Box>
  );
};

export default ChangePasswordPage;
