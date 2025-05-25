import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Mock data
import invoicesData from '../data/invoices.json';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setInvoices(invoicesData);
  }, []);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesFilter = filter === 'all' || invoice.status === filter;
    const matchesSearch = (invoice.client && invoice.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (invoice.invoiceNumber && invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      case 'draft': return 'secondary';
      default: return 'primary';
    }
  };

  const handlePreviewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPreview(true);
  };

  const InvoicePreviewModal = () => {
    if (!showPreview || !selectedInvoice) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Invoice Preview</h2>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div className="p-8 bg-white">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary-600 mb-2">HARMONIA SRL</h1>
                <p className="text-gray-600">Precision in Accounting</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Strada Exemplu Nr. 123</p>
                  <p>București, România</p>
                  <p>Tel: +40 123 456 789</p>
                  <p>Email: contact@harmonia.ro</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h2>
                <p className="text-lg font-semibold text-primary-600">{selectedInvoice.invoiceNumber}</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>Date:</strong> {selectedInvoice.date}</p>
                  <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill To:</h3>
              <div className="text-gray-600">
                <p className="font-medium">{selectedInvoice.client}</p>
                <p>Strada Client Nr. 456</p>
                <p>București, România</p>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank Details:</h3>
              <div className="text-sm text-gray-600">
                <p><strong>Bank:</strong> Banca Transilvania</p>
                <p><strong>IBAN:</strong> RO49 AAAA 1B31 0075 9384 0000</p>
                <p><strong>SWIFT:</strong> BTRLRO22</p>
              </div>
            </div>

            {/* Services Table */}
            <div className="mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">${item.rate}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">${item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b">
                  <span>Subtotal:</span>
                  <span>${selectedInvoice.subtotal}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Tax (19%):</span>
                  <span>${selectedInvoice.tax}</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold border-b-2 border-gray-900">
                  <span>Total:</span>
                  <span>${selectedInvoice.total}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600">
              <p>Thank you for your business!</p>
              <p className="mt-2">Payment is due within 30 days of invoice date.</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Invoices</h1>
            <p className="text-gray-600 mt-1">Manage and track your invoices</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <Card.Content>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {filteredInvoices.length} of {invoices.length} invoices
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Invoices List */}
        <div className="grid gap-4">
          {filteredInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <Card.Content>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-gray-600">{invoice.client}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {invoice.date}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            ${invoice.total}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handlePreviewInvoice(invoice)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvoices.length === 0 && (
          <Card>
            <Card.Content>
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first invoice'
                  }
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </Card.Content>
          </Card>
        )}
      </div>

      {/* Invoice Preview Modal */}
      <InvoicePreviewModal />
    </DashboardLayout>
  );
} 