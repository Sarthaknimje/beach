import React from 'react';
// Import IconType from our declaration file
import type { IconType } from '../react-icons';

interface IconWrapperProps {
  icon: IconType;
  className?: string;
  size?: string | number;
  color?: string;
  title?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  [key: string]: any;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: Icon, 
  className, 
  size, 
  color, 
  title,
  style,
  onClick,
  ...rest 
}) => {
  return (
    <span className={className} style={style} onClick={onClick} {...rest}>
      <Icon size={size} color={color} title={title} />
    </span>
  );
}; 