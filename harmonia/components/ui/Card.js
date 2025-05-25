import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Card = ({ 
  children, 
  className, 
  hover = true, 
  gradient = false,
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-xl border border-gray-200 transition-all duration-300';
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-gray-50' : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        baseStyles,
        hoverStyles,
        gradientStyles,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('p-6 pb-4', className)} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('p-6 pt-4 border-t border-gray-100', className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 