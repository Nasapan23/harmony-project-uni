import { cn } from '../../lib/utils';
import { getStatusColor } from '../../lib/utils';

const Badge = ({ 
  children, 
  variant = 'default', 
  status,
  size = 'default',
  className, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center rounded-full text-xs font-medium';
  
  const sizeStyles = {
    sm: 'px-2 py-0.5',
    default: 'px-2.5 py-0.5',
    lg: 'px-3 py-1'
  };
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-600',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };
  
  const statusStyles = status ? getStatusColor(status) : variants[variant];
  
  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        statusStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 