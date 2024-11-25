import React from 'react';
import { styled } from '@mui/material';
import Slider from '@mui/material/Slider';

const StyledSlider = styled(Slider)(({ theme }) => ({
  borderRadius: 0,
  '& .MuiSlider-rail': {
    borderRadius: '8px',
    height: '8px',
    backgroundColor: theme.palette.customColors.railTrack,
  },
  '& .MuiSlider-track': {
    borderRadius: '8px',
    height: '8px',
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSlider-thumb': {
    width: '23px',
    height: '23px',
    borderRadius: '8px',
    border: '3px solid',
    borderColor: theme.palette.primary.purple['400'],
    '&:before': {
      boxShadow: 'none',
      borderRadius: '8px',
      backgroundColor: 'inherit',
    },
    '&:hover, &.Mui-focusVisible': {
      boxShadow: 'none',
    },
  },
}));

export interface SliderProps {
  width: string;
  maxValue: number;
  onSliderChange: (value: number) => void;
  value: number;
}
const CustomSliderComponent: React.FC<SliderProps> = ({
  maxValue,
  value,
  onSliderChange,
  width,
}) => {
  return (
    <StyledSlider
      max={maxValue}
      value={value}
      onChange={(event, value) => onSliderChange(value as number)}
      sx={{ width: width }}
    />
  );
};

export default CustomSliderComponent;
