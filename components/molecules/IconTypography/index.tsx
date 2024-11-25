import React from 'react';
import { Box, styled } from '@mui/material';
import Icon from '../../atoms/Icon';
import Typography, { TypoProps } from '../../atoms/Typography';
import Button from '../../atoms/Button';

interface TypographyConfig extends TypoProps {
  children: React.ReactNode;
}

export interface IconTypographyProps {
  iconSrc: string;
  iconAlt?: string;
  iconClassName?: string;
  iconId?: string;
  iconWidth?: string;
  iconHeight?: string;
  iconOpacity?: string;
  typo: TypographyConfig[];
  buttonLabel?: string;
  onClick?: () => void;
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledIcon = styled(Icon)(
  ({
    iconOpacity,
    iconWidth,
    iconHeight,
  }: {
    iconOpacity: string;
    iconWidth: string;
    iconHeight: string;
  }) => ({
    width: iconWidth,
    height: iconHeight,
    opacity: iconOpacity,
  })
);

const StyledTypoButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

const IconTypography: React.FC<IconTypographyProps> = ({
  iconSrc,
  iconAlt,
  iconClassName,
  iconId,
  iconWidth = '100px',
  iconHeight = '100px',
  iconOpacity = '100%',
  typo,
  buttonLabel,
  onClick,
}) => {
  return (
    <StyledBox>
      <StyledIcon
        src={iconSrc}
        alt={iconAlt}
        className={iconClassName}
        id={iconId}
        iconWidth={iconWidth}
        iconHeight={iconHeight}
        iconOpacity={iconOpacity}
      />
      <StyledTypoButtonBox>
        {typo.map((typography, index) => (
          <Typography
            key={index + 1}
            variant={typography.variant}
            color={typography.color}
          >
            {typography.children}
          </Typography>
        ))}
        {buttonLabel && <Button onClick={onClick}>{buttonLabel}</Button>}
      </StyledTypoButtonBox>
    </StyledBox>
  );
};

export default IconTypography;
