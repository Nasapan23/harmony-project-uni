import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import Card from './Card';

const KPICard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  className,
  ...props 
}) => {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <Card className={cn('p-6', className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center space-x-1">
            <TrendIcon 
              className={cn(
                'w-4 h-4',
                isPositive ? 'text-green-600' : 'text-red-600'
              )} 
            />
            <span 
              className={cn(
                'text-sm font-medium',
                isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {change}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default KPICard; 