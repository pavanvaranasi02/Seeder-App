import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  backgroundColor?: string;
  opacity?: number;
  backgroundHoverColor?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
  id?: string;
  className?: string;
}

const StyledButton = styled(
  ({
    backgroundColor,
    opacity,
    backgroundHoverColor,
    ...props
  }: ButtonProps) => <MuiButton {...props} />
)(({ theme, backgroundColor, opacity, backgroundHoverColor }) => ({
  opacity: opacity ?? 1,
  backgroundColor: backgroundColor,
  '&:hover': {
    backgroundColor: backgroundHoverColor,
  },
}));

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  backgroundColor,
  opacity,
  backgroundHoverColor,
  id,
  className,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      backgroundColor={backgroundColor}
      opacity={opacity}
      backgroundHoverColor={backgroundHoverColor}
      disabled={disabled}
      type="button"
      data-testid="button"
      id={id}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;
