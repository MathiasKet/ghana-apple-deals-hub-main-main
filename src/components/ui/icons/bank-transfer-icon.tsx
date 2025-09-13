import React from 'react';

interface BankTransferIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const BankTransferIcon: React.FC<BankTransferIconProps> = ({
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
    <rect width="24" height="24" rx="4" fill="#1A365D" />
    <path d="M4 8H20V18H4V8Z" fill="white" />
    <path 
      d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" 
      fill="#1A365D"
    />
    <path 
      d="M20 6H4C3.44772 6 3 6.44772 3 7V17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6ZM19 16H5V8H19V16Z" 
      fill="#1A365D"
    />
  </svg>
);
