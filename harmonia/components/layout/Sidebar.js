import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];
  
  const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help', href: '/help', icon: HelpCircle },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-heading">HARMONIA</h2>
            <p className="text-xs text-gray-500">Precision in Accounting</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => onClose && onClose()}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => onClose && onClose()}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">NI</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Nisipeanu Ionut
            </p>
            <p className="text-xs text-gray-500 truncate">
              Administrator
            </p>
          </div>
          <LogOut className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-gray-200 z-50 lg:hidden"
          >
            <SidebarContent />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Sidebar; 