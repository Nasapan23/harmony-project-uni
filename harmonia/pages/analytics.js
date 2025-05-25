import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Download, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  PieChart
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import DoughnutChart from '../components/charts/DoughnutChart';

// Mock data
import analyticsData from '../data/analytics.json';

export default function Analytics() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    setAnalytics(analyticsData);
  }, []);

  // Revenue Trends Chart Data
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [8500, 9200, 10100, 11500, 12800, 13200, 14100, 15300, 14800, 16200, 17500, 18900],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: [6200, 6800, 7100, 7900, 8200, 8500, 8900, 9200, 9100, 9800, 10200, 10800],
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        fill: true,
      },
    ],
  };

  // Client Growth Chart Data
  const clientGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Clients',
        data: [3, 5, 4, 6, 8, 7, 9, 6, 8, 10, 7, 12],
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
        borderWidth: 1,
      },
      {
        label: 'Lost Clients',
        data: [1, 2, 1, 1, 3, 2, 1, 2, 1, 2, 1, 1],
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
        borderWidth: 1,
      },
    ],
  };

  // Revenue Breakdown Chart Data
  const revenueBreakdownData = {
    labels: ['Accounting Services', 'Tax Consulting', 'Financial Audits', 'Business Intelligence', 'Other Services'],
    datasets: [
      {
        data: [45000, 28000, 18000, 12000, 8000],
        backgroundColor: [
          '#4F46E5',
          '#FF6B35',
          '#6366F1',
          '#10B981',
          '#F59E0B',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Performance Metrics Chart Data
  const performanceData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue Growth %',
        data: [12, 18, 15, 22],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: '#4F46E5',
        borderWidth: 1,
      },
      {
        label: 'Client Satisfaction %',
        data: [85, 88, 92, 95],
        backgroundColor: 'rgba(255, 107, 53, 0.8)',
        borderColor: '#FF6B35',
        borderWidth: 1,
      },
    ],
  };

  const topClients = [
    { name: 'Business Consulting Group', revenue: '$32,500', growth: '+15%', trend: 'up' },
    { name: 'Smart Topics SRL', revenue: '$28,200', growth: '+8%', trend: 'up' },
    { name: 'Tech Innovations Ltd', revenue: '$24,800', growth: '-2%', trend: 'down' },
    { name: 'Creative Agency Pro', revenue: '$22,100', growth: '+12%', trend: 'up' },
    { name: 'Digital Solutions Inc', revenue: '$19,500', growth: '+5%', trend: 'up' },
  ];

  const kpiMetrics = [
    {
      title: 'Total Revenue',
      value: '$185,430',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Active Clients',
      value: '48',
      change: '+6',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Avg. Revenue/Client',
      value: '$3,863',
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Growth Rate',
      value: '18.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive business insights and performance metrics</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <Card.Content>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                        <div className="flex items-center mt-2">
                          {metric.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ml-1 ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trends */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Revenue vs Expenses</h3>
              <p className="text-sm text-gray-600">Monthly comparison over the past year</p>
            </Card.Header>
            <Card.Content>
              <LineChart data={revenueChartData} height={300} />
            </Card.Content>
          </Card>

          {/* Client Growth */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Client Growth</h3>
              <p className="text-sm text-gray-600">New vs lost clients by month</p>
            </Card.Header>
            <Card.Content>
              <BarChart data={clientGrowthData} height={300} />
            </Card.Content>
          </Card>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Breakdown */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
              <p className="text-sm text-gray-600">By service category</p>
            </Card.Header>
            <Card.Content>
              <DoughnutChart data={revenueBreakdownData} height={280} />
            </Card.Content>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Quarterly Performance</h3>
              <p className="text-sm text-gray-600">Growth and satisfaction metrics</p>
            </Card.Header>
            <Card.Content>
              <BarChart data={performanceData} height={280} />
            </Card.Content>
          </Card>

          {/* Top Clients */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Top Clients</h3>
              <p className="text-sm text-gray-600">By revenue contribution</p>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{client.name}</p>
                      <p className="text-lg font-bold text-gray-900">{client.revenue}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {client.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        client.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {client.growth}
                      </span>
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