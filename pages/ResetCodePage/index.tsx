import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../components/templates/Authentication';
import ResetPassword from '../../components/organisms/ResetPassword';
import IconPath, { ResetCodeValidation } from '../../utils/Constants';

const ResetCodePage = () => {
  const navigate = useNavigate();

  const handleResetCode = () => {
    navigate('/change-password-page');
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <Box>
      <Authentication
        OrganismComponent={
          <ResetPassword
            description="Please enter the reset code sent to your email to proceed further"
            placeholder="Enter reset code"
            startSrc={IconPath.MoreImg}
            onButtonClick={handleResetCode}
            buttonLabel="Reset Password"
            validateInput={ResetCodeValidation}
            title="Enter Reset Code"
            onLoginButtonClick={handleLoginClick}
          />
        }
        imageSrc={IconPath.Password}
        imageAlt="Password"
      />
    </Box>
  );
};

export default ResetCodePage;
