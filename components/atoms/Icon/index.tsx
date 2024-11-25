import React from 'react';

export interface IconProps {
  src: string | undefined;
  alt?: string;
  className?: string;
  id?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt, className, id }) => (
  <img src={src} alt={alt} className={className} id={id} />
);

export default Icon;
