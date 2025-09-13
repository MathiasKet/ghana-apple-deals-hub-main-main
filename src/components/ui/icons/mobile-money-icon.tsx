import React from 'react';

interface MobileMoneyIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const MobileMoneyIcon: React.FC<MobileMoneyIconProps> = ({
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
    <rect width="24" height="24" rx="4" fill="#FFCC00" />
    <path d="M17.5 7.5H6.5V16.5H17.5V7.5Z" fill="white" />
    <path 
      d="M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z" 
      fill="#000"
    />
    <path 
      d="M17.5 9V15.5H6.5V9H17.5ZM12 10.5C11.4477 10.5 11 10.0523 11 9.5C11 8.94772 11.4477 8.5 12 8.5C12.5523 8.5 13 8.94772 13 9.5C13 10.0523 12.5523 10.5 12 10.5Z" 
      fill="#000"
    />
  </svg>
);
