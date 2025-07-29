import { ReactNode } from 'react';
import clsx from 'clsx';

type TransitionProps = {
  show: boolean;
  children: ReactNode;
  className?: string;
};

export const Transition = ({ show, children, className = '' }: TransitionProps) => {
  return (
    <div
      className={clsx(
        'transition-opacity duration-300 ease-in-out',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
      aria-hidden={!show}
    >
      {children}
    </div>
  );
};
