import React from 'react';

interface VisaIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const VisaIcon: React.FC<VisaIconProps> = ({
  size = 24,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" rx="4" fill="#1A1F71" />
    <path 
      d="M10.4 15L9 9H10.6L11.5 14.1L13.6 9H15L17 15H15.6L14.8 10.8L12.8 15H10.4Z" 
      fill="white"
    />
    <path 
      d="M8 9L6.6 12.9L6 15H4L6 9H8Z" 
      fill="white"
    />
  </svg>
);
