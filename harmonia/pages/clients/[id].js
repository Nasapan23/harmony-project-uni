import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  Edit,
  MoreHorizontal,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import LineChart from '../../components/charts/LineChart';
import { timeAgo } from '../../lib/utils';

// Mock data
import clientsData from '../../data/clients.json';
import invoicesData from '../../data/invoices.json';
import activitiesData from '../../data/activities.json';

export default function ClientDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState(null);
  const [clientInvoices, setClientInvoices] = useState([]);
  const [clientActivities, setClientActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Find client by ID
      const foundClient = clientsData.find(c => c.id === parseInt(id));
      setClient(foundClient);

      // Filter invoices for this client
      const invoices = invoicesData.filter(invoice => 
        invoice.client === foundClient?.name
      );
      setClientInvoices(invoices);

      // Filter activities for this client (mock - in real app would be client-specific)
      const activities = activitiesData.slice(0, 8);
      setClientActivities(activities);

      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!client) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Client not found</h2>
          <Button onClick={() => router.push('/clients')} className="mt-4">
            Back to Clients
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      case 'draft': return 'secondary';
      default: return 'primary';
    }
  };

  const totalRevenue = clientInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.total), 0);
  const paidInvoices = clientInvoices.filter(invoice => invoice.status === 'paid').length;
  const pendingInvoices = clientInvoices.filter(invoice => invoice.status === 'pending').length;

  // Client revenue trends chart data
  const clientRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [1200, 1800, 2200, 1900, 2500, 2800, 2100, 2600, 2400, 2900, 3200, 2800],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/clients')}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-heading">{client.name}</h1>
              <p className="text-gray-600 mt-1">Client Details & Overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="secondary">
              <Edit className="w-4 h-4 mr-2" />
              Edit Client
            </Button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Client Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Info */}
          <Card>
            <Card.Content>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <p className="text-gray-600 mb-4">{client.email}</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">+40 123 456 789</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">București, România</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Client since Jan 2023</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Health Score</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthScoreColor(client.healthScore)}`}>
                      {client.healthScore}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        client.healthScore >= 90 ? 'bg-green-500' :
                        client.healthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${client.healthScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <Card.Content>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
                    <p className="text-2xl font-bold text-gray-900">{paidInvoices}</p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">On time</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingInvoices}</p>
                    <div className="flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600">Review needed</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>

        {/* Revenue Trends Chart */}
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
            <p className="text-sm text-gray-600">Monthly revenue from {client.name} over the past year</p>
          </Card.Header>
          <Card.Content>
            <LineChart data={clientRevenueData} height={250} />
          </Card.Content>
        </Card>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Invoices */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
              <p className="text-sm text-gray-600">Latest invoices for this client</p>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {clientInvoices.slice(0, 5).map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-gray-600">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">${invoice.total}</span>
                      <Badge variant={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
              <p className="text-sm text-gray-600">Recent interactions and updates</p>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {clientActivities.slice(0, 6).map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{timeAgo(activity.timestamp)}</p>
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