import { Stack, Box } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../../../theme';
import CustomButton from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';

const loader = '/assets/icons/loader.gif';

export const ButtonWrapper = styled(CustomButton)({
    padding: '20px 40px',
    borderRadius: '12px',
    width: theme.spacing(49)
});

export const CustomStack = styled(Stack)({
    paddingTop: '48px',
    paddingBottom: '24px'
});

export const CustomTypography = styled(Typography)<{ color: string }>(({ color }) => ({
    paddingBottom: '8px',
    color,
}));

export const CustomTextField = styled(TextField)({
    width: '700px',
    height: '56px',
    padding: '12px 17px',
    gap: '12px',
    borderRadius: '12px 0px 0px 0px',
    border: '1px solid transparent',
    borderTopWidth: '1px',
    opacity: 1
  
});



export const IconContainer = styled(Box)({
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

export const ContentWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(14)
});

export const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    height: theme.spacing(15)
});

export const StyledContent = styled(Box)<{ showSuccess: boolean }>(({ showSuccess }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    backgroundColor: theme.palette.structural.grey["100"],
    borderRadius: theme.spacing(3),
    padding: `${theme.spacing(6)} ${theme.spacing(10)}`,
    boxShadow: '0px 11px 15px 0px rgba(0, 0, 0, 0.20), 0px 9px 46px 0px rgba(0, 0, 0, 0.12), 0px 24px 38px 0px rgba(0, 0, 0, 0.14)',
    border: `${theme.spacing(0.25)} solid ${theme.palette.Borders.lowEmphasis}`,
    width: '100%',
    maxWidth: '640px',
    height: showSuccess ? '584px' : 'auto',
    gap: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
    },
}));

export const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between'
});

export const StyledHeadingBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column'
});