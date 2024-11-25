import React from 'react';
import { Box, ThemeProvider, styled, useTheme } from '@mui/material';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import { TypographyBox } from '../ResetPassword';
import IconPath from '../../../utils/Constants';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.elevation0,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'start',
  gap: theme.spacing(1),
  overflow: 'auto',
  width: '100%',
  maxWidth: '454px',
  height: 'auto',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    gap: theme.spacing(2),
    maxWidth: '100%',
  },
}));

const StyledButtonForForgotPassword = styled(Button)(
  ({ theme }: { theme: any }) => ({
    width: '100%',
    height: '60px',
    backgroundColor: theme.palette.primary.purple[500],
    [theme.breakpoints.down('sm')]: {
      height: '50px',
    },
  })
);

const MessageBox = styled(Box)(
  ({
    theme,
    description,
  }: {
    theme: any;
    description: string | undefined;
  }) => ({
    width: '100%',
    borderRadius: '12px',
    display: 'flex',
    border: `1px solid ${theme.palette.Borders.lowEmphasis}`,
    backgroundColor: theme.palette.background.elevation1,
    gap: theme.spacing(3),
    marginTop: description ? '12px' : '35px',
    marginBottom: '20px',
    padding: '24px',
  })
);

const InnerMessageBox = styled(Box)(({ theme }: { theme: any }) => ({
  float: 'left',
  gap: theme.spacing(1),
}));

export interface ForgotPasswordProps {
  description?: string;
  buttonLabel: string;
  resetMailHeading: string;
  resetMailSubText1: string;
  resetMailSubText2?: string;
  emailEntered?:string;
  onButtonClick?: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  description,
  buttonLabel,
  resetMailHeading,
  resetMailSubText1,
  resetMailSubText2,
  emailEntered,
  onButtonClick,
}) => {
  const theme = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Typography variant="title" color={theme.palette.text.highEmphasis}>
          Forgot Password
        </Typography>
        {description && (
          <TypographyBox>
            <Typography
              variant="heading3"
              color={theme.palette.text.lowEmphasis}
            >
              {description}
            </Typography>
          </TypographyBox>
        )}

        <MessageBox theme={theme} description={description}>
          <Box>
            <Icon src={IconPath.Tick} />
          </Box>
          <InnerMessageBox>
            <Box>
              <Typography
                variant="heading3"
                color={theme.palette.text.highEmphasis}
              >
                {resetMailHeading}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                color={theme.palette.text.lowEmphasis}
              >
                {resetMailSubText1}
                  <Typography
                    variant="body2"
                    component="span"
                    color={theme.palette.primary.purple['400']}
                  >
                    {emailEntered}
                  </Typography>
                  {resetMailSubText2}
              </Typography>
            </Box>
          </InnerMessageBox>
        </MessageBox>

        <StyledButtonForForgotPassword
          variant="contained"
          onClick={onButtonClick}
          disableRipple
        >
          {buttonLabel}
        </StyledButtonForForgotPassword>
      </StyledBox>
    </ThemeProvider>
  );
};

export default ForgotPassword;
