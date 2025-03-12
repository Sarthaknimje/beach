import React from 'react';

export interface IconType extends React.FC<{ 
  className?: string;
  style?: React.CSSProperties;
  size?: string | number;
  color?: string;
  title?: string;
  [key: string]: any;
}> {}

declare module 'react-icons/fa' {
  export const FaWater: IconType;
  export const FaSwimmer: IconType;
  export const FaSun: IconType;
  export const FaFirstAid: IconType;
  export const FaExclamationTriangle: IconType;
  export const FaChild: IconType;
  export const FaArrowRight: IconType;
  export const FaCloudSun: IconType;
  export const FaInfoCircle: IconType;
  export const FaMapMarkedAlt: IconType;
  export const FaLifeRing: IconType;
  export const FaHome: IconType;
  export const FaFilter: IconType;
  export const FaTimes: IconType;
  export const FaLocationArrow: IconType;
  export const FaCalendarAlt: IconType;
  export const FaSearch: IconType;
  export const FaArrowLeft: IconType;
  export const FaWind: IconType;
  export const FaThermometerHalf: IconType;
  export const FaBan: IconType;
  export const FaFacebook: IconType;
  export const FaTwitter: IconType;
  export const FaInstagram: IconType;
  export const FaHeart: IconType;
  export const FaBars: IconType;
  export const FaMapMarkerAlt: IconType;
}

declare module 'react-icons' {
  export interface IconType extends React.FC<{ 
    className?: string;
    style?: React.CSSProperties;
    size?: string | number;
    color?: string;
    title?: string;
    [key: string]: any;
  }> {}
} 