import React from 'react'
import { Chip,ChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface StyledChipProps extends ChipProps {
    backgroundColor?: string;
    label?: React.ReactNode;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number;
    lineHeight?: string|number;
    letterSpacing?: string|number;
    width?: string;
    height?: string;
    customcolor?: string;
 }
 
 const StyledChip = styled(Chip)<StyledChipProps>(({
    customcolor,
    ...props
 }) => ({
    backgroundColor: props.backgroundColor ?? 'lightblue',
    width: props.width ?? '150px',
    height: props.height ?? '50px',
    borderRadius: '4px',
    padding: '4px 8px', 
    lineHeight: props.lineHeight ?? '1.5',

    '& .MuiChip-label': {
      color: customcolor ?? 'black',
      fontSize: props.fontSize ?? 16,
      fontFamily: props.fontFamily ?? 'Gilroy, sans-serif',
      fontWeight: props.fontWeight ?? 400,
      letterSpacing: props.letterSpacing ?? 'normal',
      padding: '0',
    },
 
   
 }));
 
 export default StyledChip;

