import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Plus, 
  Mail, 
  Phone,
  Building,
  Calendar,
  MapPin
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getHealthScoreColor, formatDate } from '../lib/utils';

// Mock data import
import clientsData from '../data/clients.json';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setClients(clientsData);
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getHealthScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Poor';
  };

  const ClientCard = ({ client, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300">
        <Card.Content className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {client.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.industry}</p>
              </div>
            </div>
            <Badge status={client.status}>
              {client.status}
            </Badge>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatDate(client.joinDate)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Health Score</p>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold ${getHealthScoreColor(client.healthScore)}`}>
                  {client.healthScore}%
                </span>
                <span className="text-sm text-gray-500">
                  {getHealthScoreLabel(client.healthScore)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-lg font-semibold text-gray-900">{client.revenue}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span>{client.invoices} invoices</span>
            <span>ID: {client.id}</span>
          </div>

          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" className="flex-1">
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );

  const ClientListItem = ({ client, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="mb-4">
        <Card.Content className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">
                  {client.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 truncate">{client.name}</h3>
                  <Badge status={client.status} className="flex-shrink-0">
                    {client.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{client.email}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <div className="text-center">
                <p className="text-sm text-gray-600">Industry</p>
                <p className="font-medium text-gray-900">{client.industry}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Health Score</p>
                <span className={`font-bold ${getHealthScoreColor(client.healthScore)}`}>
                  {client.healthScore}%
                </span>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="font-semibold text-gray-900">{client.revenue}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Invoices</p>
                <p className="font-medium text-gray-900">{client.invoices}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="sm">
                View
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">
              Clients
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your client relationships and track their health scores
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <Card.Content className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-4">
                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="warning">Warning</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-primary-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-primary-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredClients.length} of {clients.length} clients
          </p>
        </div>

        {/* Clients Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <ClientCard key={client.id} client={client} index={index} />
            ))}
          </div>
        ) : (
          <div>
            {filteredClients.map((client, index) => (
              <ClientListItem key={client.id} client={client} index={index} />
            ))}
          </div>
        )}

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first client'
              }
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 