import React from 'react';
import { Box, Typography, CircularProgress, styled } from '@mui/material';

interface Props {
  value: number; // Current value of the progress, from 0 to 95
  size: number; // Diameter of the circle
  strokeWidth: number; // Width of the stroke
  customcolor?: string; // For setting color of Progress Circle and Typography
  customfontsize?: number | string; // For setting font size of Typography
}

const ProgressContainer = styled(Box)(({ size }: { size: number }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: size,
  height: size,
  backgroundColor: '#201F24',
  transform: 'rotate(90deg)',
}));

const BackgroundCircle = styled(CircularProgress)(
  ({ size, thickness }: { size: number; thickness: number }) => ({
    color: '#3A3A3D',
    position: 'absolute',
    zIndex: 1,
    width: size,
    height: size,
    strokeWidth: thickness,
  })
);

const ProgressCircle = styled(CircularProgress)(
  ({
    size,
    thickness,
    customcolor = '#A0D7E7',
  }: {
    size: number;
    thickness: number;
    customcolor?: string;
  }) => ({
    color: customcolor,
    position: 'absolute',
    zIndex: 2,
    transform: 'rotate(-90deg)',
    width: size,
    height: size,
    strokeWidth: thickness,
  })
);

const StyledTypography = styled(Typography)(
  ({
    customcolor = '#A0D7E7',
    customfontsize = '14px',
  }: {
    customcolor?: string;
    customfontsize?: number | string;
  }) => ({
    position: 'absolute',
    fontSize: customfontsize,
    fontWeight: 600,
    color: customcolor,
    fontFamily: 'Gilroy, sans-serif',
    zIndex: 3,
    transform: 'rotate(-90deg)',
  })
);

const CustomCircularProgress: React.FC<Props> = ({
  value,
  size,
  strokeWidth,
  customcolor,
  customfontsize,
}) => {
  return (
    <ProgressContainer size={size}>
      <BackgroundCircle
        variant="determinate"
        value={100}
        size={size}
        thickness={strokeWidth}
      />
      <ProgressCircle
        variant="determinate"
        value={((value + 5) / 100) * 100}
        size={size}
        thickness={strokeWidth}
        customcolor={customcolor}
      />
      <StyledTypography
        customcolor={customcolor}
        customfontsize={customfontsize}
      >{`${Math.round(value)}%`}</StyledTypography>
    </ProgressContainer>
  );
};

export default CustomCircularProgress;
