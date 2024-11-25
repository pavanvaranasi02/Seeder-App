import React from 'react';
import { Card, Stack, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '../../atoms/Typography';

export interface LoginProps {
  src: string;
  alt: string;
  variant: TypographyProps['variant'];
  children: string;
  id?: string;
  onClick?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '130px',
  height: '96px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.elevation1,
  cursor: 'pointer',
}));

const StyledImgDiv = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '20px',
  height: 'auto',
}));

export const SocialLogin: React.FC<LoginProps> = ({
  src,
  alt,
  variant,
  id,
  children,
  onClick,
}) => {
  return (
    <StyledCard data-testid={id} onClick={onClick}>
      <Stack spacing={2}>
        <StyledImgDiv>
          <StyledImage src={src} alt={alt} />
        </StyledImgDiv>
        <Typography variant={variant}>{children}</Typography>
      </Stack>
    </StyledCard>
  );
};
