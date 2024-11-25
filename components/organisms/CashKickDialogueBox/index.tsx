import React, { useState } from 'react';
import { Modal, Fade, Backdrop, Stack, styled, Box } from '@mui/material';
import Typography from '../../atoms/Typography';
import CustomButton from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import IconPath from '../../../utils/Constants';
import {
  CASH_KICK_MODAL,
  NAMECASHKICKMODAL,
} from '../../../utils/Constants/index';
import {
  ButtonWrapper,
  CustomStack,
  CustomTypography,
  CustomTextField,
  IconContainer,
  ContentWrapper,
  ButtonContainer,
  StyledContent,
  Header,
  StyledHeadingBox,
} from './styles';
import theme from '../../../theme';

export interface CashKickDialogueBoxProps {
  open: boolean;
  onClose: () => void;
  onViewCashKick: () => void;
  createCashKickHandler: (name: string) => void;
  showSuccess?: boolean;
}

const CustomModal = styled(Modal)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backdropFilter: `blur(${theme.spacing(2)})`,
    background: theme.palette.backdrop.main,
  },
}));

const useNameCashKickValidation = () => {
  const [name, setName] = useState<string>('');
  const validName = (name: string) => {
    return name.length >= 5 && name.length <= 20;
  };

  return {
    name,
    setName,
    validName,
  };
};

interface ReviewGifProps {
  width?: number;
  height?: number;
}

const ReviewGif = styled(Box)<ReviewGifProps>({
  background: `url(${IconPath.reviewIcon})`,
  width: 241,
  height: 172,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const CashKickDialogueBox: React.FC<CashKickDialogueBoxProps> = ({
  open,
  onClose,
  onViewCashKick,
  createCashKickHandler,
}) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { name, setName, validName } = useNameCashKickValidation();

  const handleCreateCashKick = () => {
    if (validName(name)) {
      createCashKickHandler(name);
      setShowSuccess(true);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setName('');
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
    >
      <Fade in={open}>
        <StyledContent showSuccess={showSuccess}>
          <Header>
            <StyledHeadingBox>
              <Typography
                variant="heading2"
                color={theme.palette.text.highEmphasis}
              >
                {showSuccess
                  ? CASH_KICK_MODAL.heading
                  : NAMECASHKICKMODAL.heading}
              </Typography>
              <Typography
                variant="heading3"
                color={theme.palette.text.lowEmphasis}
              >
                {showSuccess
                  ? CASH_KICK_MODAL.subHeading
                  : NAMECASHKICKMODAL.subHeading}
              </Typography>
            </StyledHeadingBox>
            <CustomButton onClick={handleClose}>
              <Icon src={IconPath.crossIcon} alt="close" />
            </CustomButton>
          </Header>
          {showSuccess ? (
            <>
              <IconContainer>
                <ReviewGif />
              </IconContainer>
              <ContentWrapper>
                <Typography
                  variant="heading2"
                  color={theme.palette.text.highEmphasis}
                >
                  {CASH_KICK_MODAL.review}
                </Typography>
                <Typography
                  variant="body1"
                  color={theme.palette.text.lowEmphasis}
                >
                  {CASH_KICK_MODAL.content}
                </Typography>
              </ContentWrapper>
              <ButtonContainer>
                <ButtonWrapper
                  variant="contained"
                  onClick={handleClose}
                  backgroundColor={theme.palette.background.elevation2}
                >
                  {NAMECASHKICKMODAL.cancel}
                </ButtonWrapper>
                <ButtonWrapper variant="contained" onClick={onViewCashKick}>
                  {CASH_KICK_MODAL.viewCashkicks}
                </ButtonWrapper>
              </ButtonContainer>
            </>
          ) : (
            <>
              <CustomStack>
                <CustomTypography
                  variant="body1"
                  color={
                    name
                      ? theme.palette.primary.purple['400']
                      : theme.palette.text.lowEmphasis
                  }
                >
                  {NAMECASHKICKMODAL.label}
                </CustomTypography>
                <CustomTextField
                  placeholder={NAMECASHKICKMODAL.placeholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  width="570px"
                />
              </CustomStack>
              <Stack
                direction="row"
                paddingTop="32px"
                justifyContent="flex-end"
                spacing="8px"
              >
                <ButtonWrapper
                  variant="contained"
                  onClick={handleClose}
                  backgroundColor={theme.palette.background.elevation2}
                >
                  {NAMECASHKICKMODAL.cancel}
                </ButtonWrapper>
                <ButtonWrapper
                  variant="contained"
                  onClick={handleCreateCashKick}
                  disabled={!validName(name)}
                >
                  {NAMECASHKICKMODAL.CashKickButton}
                </ButtonWrapper>
              </Stack>
            </>
          )}
        </StyledContent>
      </Fade>
    </CustomModal>
  );
};

export default CashKickDialogueBox;
