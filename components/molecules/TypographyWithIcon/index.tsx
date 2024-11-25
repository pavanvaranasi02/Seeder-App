import React from 'react';
import { Box, styled } from '@mui/material';
import Typography from '../../atoms/Typography';
import Icon from '../../atoms/Icon';

export interface TypographyIconProps {
  label?: string;
  src?: string;
  alt?: string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  height?: string | number;
  width?: string | number;
  variant?:
    | 'title'
    | 'heading2'
    | 'heading3'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button';
  backgroundColor?: string;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  gap?: string;
}

const OuterBox = styled(Box)<{ backgroundColor?: string }>(
  ({ backgroundColor }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  })
);

const StyledTypographyAtom = styled(Typography)<{
  variant?: TypographyIconProps['variant'];
}>(({ theme, variant }) => ({
  ...(variant && theme.typography[variant]),
}));

export const TypographyIconMolecule: React.FC<TypographyIconProps> = ({
  label,
  src,
  alt,
  flexDirection,
  height,
  width,
  variant,
  justifyContent,
  gap,
  backgroundColor,
}) => {
  return (
    <OuterBox
      flexDirection={flexDirection}
      height={height}
      width={width}
      justifyContent={justifyContent}
      gap={gap}
      backgroundColor={backgroundColor}
    >
      <StyledTypographyAtom variant={variant}>{label}</StyledTypographyAtom>
      <Icon src={src} alt={alt} />
    </OuterBox>
  );
};
