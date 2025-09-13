import React from 'react';

interface MastercardIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const MastercardIcon: React.FC<MastercardIconProps> = ({
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
    <rect width="24" height="24" rx="4" fill="#000000" />
    <path 
      d="M12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9Z" 
      fill="#FF5F00"
    />
    <path 
      d="M16 9C14.8 9 13.7 9.6 13 10.5C13.5 11.4 13.7 12.4 13.5 13.5C13.9 13.2 14.4 13 15 13C16.1 13 17 13.9 17 15C17 16.1 16.1 17 15 17C13.9 17 13 16.1 13 15C13 15.1 13 15.3 13 15.5C13 14.1 13.5 12.9 14.3 12C14.7 11.5 15.3 11.1 16 11C15.7 10.4 15.4 10 15 9.5C14.7 9.2 14.4 9 14 9H16Z" 
      fill="#F79E1B"
    />
    <path 
      d="M11 10.5C10.3 9.6 9.2 9 8 9H6C5.4 9 5 9.4 5 10V14C5 14.6 5.4 15 6 15H8C9.2 15 10.3 14.4 11 13.5C10.9 12.6 10.9 11.4 11 10.5Z" 
      fill="#EB001B"
    />
  </svg>
);
