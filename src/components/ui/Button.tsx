
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  baseUI?: string;
  light?: string;
  dark?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = 
({ onClick, baseUI = 'py-2 px-4 rounded-md', light = 'bg-gray-600 text-gray-300 hover:bg-gray-800', dark = 'dark:bg-gray-500', children }) => {
  return (
    <button onClick={onClick} className={`cursor-pointer ${baseUI} ${light} ${dark}`}>
      {children}
    </button>
  );
};

export default Button;
