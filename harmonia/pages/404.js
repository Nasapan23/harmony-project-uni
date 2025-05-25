import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Custom404() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent leading-none">
              404
            </h1>
            
            {/* Floating elements around 404 */}
            <motion.div
              className="absolute top-4 left-4 text-orange-400"
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-8 h-8" />
            </motion.div>
            
            <motion.div
              className="absolute top-8 right-8 text-blue-400"
              animate={{ 
                y: [10, -10, 10],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Search className="w-6 h-6" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-orange-300"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            The page you're looking for seems to have vanished into the digital void.
          </p>
          <p className="text-gray-500">
            Don't worry, even the best accounting systems have missing entries sometimes!
          </p>
        </motion.div>

        {/* Harmonia Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-lg">HARMONIA</h3>
              <p className="text-sm text-gray-600">Precision in Accounting</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            onClick={handleGoHome}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Button>
          
          <Button 
            onClick={handleGoToDashboard}
            variant="secondary"
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
          >
            Go to Dashboard
          </Button>
          
          <Button 
            onClick={handleGoBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">
            Looking for something specific? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button 
              onClick={() => router.push('/dashboard')}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => router.push('/clients')}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Clients
            </button>
            <button 
              onClick={() => router.push('/invoices')}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Invoices
            </button>
            <button 
              onClick={() => router.push('/analytics')}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Analytics
            </button>
          </div>
        </motion.div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-200 to-orange-200 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-200 to-blue-200 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
        </div>
      </div>
    </div>
  );
} 