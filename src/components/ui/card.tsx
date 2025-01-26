import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export const CardContent: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export const CardFooter: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export {}; 