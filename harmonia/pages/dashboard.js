import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  FileText, 
  Shield, 
  Plus, 
  AlertTriangle,
  UserPlus,
  BarChart3,
  Send,
  Settings
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import KPICard from '../components/ui/KPICard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LineChart from '../components/charts/LineChart';
import { timeAgo } from '../lib/utils';

// Mock data imports
import kpisData from '../data/kpis.json';
import activitiesData from '../data/activities.json';

const iconMap = {
  DollarSign,
  Users,
  FileText,
  Shield,
  AlertTriangle,
  Plus,
  UserPlus,
  BarChart3,
  Send,
  Settings
};

export default function Dashboard() {
  const [kpis, setKpis] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setKpis(kpisData);
    setActivities(activitiesData);
  }, []);

  const quickActions = [
    { title: 'Create Invoice', icon: 'FileText', color: 'bg-blue-500' },
    { title: 'Add Client', icon: 'Users', color: 'bg-green-500' },
    { title: 'Generate Report', icon: 'Shield', color: 'bg-purple-500' },
    { title: 'View Analytics', icon: 'DollarSign', color: 'bg-orange-500' }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Invoice Overdue',
      message: 'Invoice INV-0034 from Digital Solutions Inc is 3 days overdue',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Payment Received',
      message: 'Payment of $3,200 received from Business Consulting Group',
      time: '4 hours ago'
    }
  ];

  // Revenue chart data
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [8500, 9200, 10100, 11500, 12800, 13200, 14100, 15300, 14800, 16200, 17500, 18900],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target',
        data: [10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500],
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, Nisipeanu Ionut. Here's what's happening with your business today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Quick Action
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(kpis).map(([key, kpi], index) => {
            const IconComponent = iconMap[kpi.icon];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <KPICard
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={kpi.value}
                  change={kpi.change}
                  trend={kpi.trend}
                  icon={IconComponent}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
                <p className="text-sm text-gray-600">Monthly revenue vs target over the past year</p>
              </Card.Header>
              <Card.Content>
                <LineChart data={revenueChartData} height={300} />
              </Card.Content>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const IconComponent = iconMap[action.icon];
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{action.title}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <p className="text-sm text-gray-600">Latest updates and actions</p>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {activities.slice(0, 5).map((activity) => {
                  const IconComponent = iconMap[activity.icon];
                  const colorMap = {
                    blue: 'text-blue-600 bg-blue-100',
                    green: 'text-green-600 bg-green-100',
                    purple: 'text-purple-600 bg-purple-100',
                    red: 'text-red-600 bg-red-100',
                    gray: 'text-gray-600 bg-gray-100'
                  };
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start space-x-3"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorMap[activity.color]}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{timeAgo(activity.timestamp)}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card.Content>
          </Card>

          {/* Alerts Panel */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
              <p className="text-sm text-gray-600">Important updates requiring attention</p>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'warning' 
                        ? 'bg-yellow-50 border-yellow-400' 
                        : 'bg-blue-50 border-blue-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                      </div>
                      <Badge 
                        variant={alert.type === 'warning' ? 'warning' : 'primary'}
                        className="ml-2"
                      >
                        {alert.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 