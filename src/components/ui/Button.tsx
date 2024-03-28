
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  baseUI?: string;
  light?: string;
  dark?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = 
({ onClick, baseUI = 'py-2 px-4 rounded-md', light = 'bg-gray-400', dark = 'dark:bg-gray-800', children }) => {
  return (
    <button onClick={onClick} className={`${baseUI} ${light} ${dark}`}>
      {children}
    </button>
  );
};

export default Button;
