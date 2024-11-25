import React from 'react';
import { TextField as MUITextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@emotion/styled';
import { useTheme, Theme } from '@mui/material/styles';

export interface TextFieldProps {
  startSrc?: string;
  endSrc?: string;
  startAlt?: string;
  endAlt?: string;
  placeholder?: string;
  InputProps?: object;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  error?: boolean;
  helperText?: string;
}

const StyledTextField = styled(MUITextField)<{ theme: Theme; width?: string }>(
  ({ theme, width }) => ({
    '& .MuiOutlinedInput-root': {
      height: 56,
      width: width ?? '434px',
      borderRadius: 12,
      padding: '16px 15px',
      gap: 12,
      backgroundColor: theme.palette.structural.grey['100'],

      '& fieldset': {
        borderColor: theme.palette.Borders.highEmphasis,
      },

      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.purple['400'],
      },

      '& .MuiInputBase-input': {
        color: theme.palette.text.mediumEmphasis,
      },

      '& .MuiInputBase-input::placeholder': {
        color: theme.palette.text.lowEmphasis,
      },

      '& .MuiInputAdornment-root': {
        color: theme.palette.text.lowEmphasis,
      },

      '&.Mui-focused .MuiInputAdornment-root': {
        color: theme.palette.primary.purple['400'],
      },

      '&.Mui-focused .MuiInputAdornment-positionStart img': {
        filter:
          'brightness(0) saturate(100%) invert(61%) sepia(75%) saturate(314%) hue-rotate(206deg) brightness(99%) contrast(104%)',
      },
    },
  })
);

const TextField: React.FC<TextFieldProps> = ({
  startSrc,
  endSrc,
  startAlt,
  endAlt,
  placeholder,
  value,
  onChange,
  width,
  InputProps,
  error,
  helperText,
}) => {
  const theme = useTheme();

  return (
    <StyledTextField
      variant="outlined"
      placeholder={placeholder}
      value={value}
      width={width}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={{
        ...InputProps,
        startAdornment: startSrc && (
          <InputAdornment position="start">
            <img src={startSrc} alt={startAlt ?? ''} />
          </InputAdornment>
        ),
        endAdornment: endSrc && (
          <InputAdornment position="end">
            <img src={endSrc} alt={endAlt ?? ''} />
          </InputAdornment>
        ),
      }}
      theme={theme}
      autoComplete="off"
    />
  );
};

export default TextField;
