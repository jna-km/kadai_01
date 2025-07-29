import { ReactNode } from 'react';
import clsx from 'clsx';

type TransitionProps = {
  show: boolean;
  children: ReactNode;
  className?: string;
};

export const Transition = ({ show, children, className = '' }: TransitionProps) => {
  if (!show) return null; 
  return (
    <div
      className={clsx(
        'transition-opacity duration-300 ease-in-out',
        'opacity-0',
        className
      )}
      aria-hidden={!show}
    >
      {children}
    </div>
  );
};
