import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

export interface AvatarProps {
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
  variant?: 'circular' | 'rounded' | 'square';
}

const Avatar: React.FC<AvatarProps> = ({ alt, src, style, variant }) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      style={style}
      variant={variant}
    />
  );
};

export default Avatar;