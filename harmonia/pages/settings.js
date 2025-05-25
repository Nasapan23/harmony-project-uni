import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  Key,
  Mail,
  Phone,
  Save,
  Eye,
  EyeOff,
  Camera,
  Settings as SettingsIcon
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [profile, setProfile] = useState({
    firstName: 'Nisipeanu',
    lastName: 'Ionut',
    email: 'nisipeanu.ionut@harmonia.ro',
    phone: '+40 123 456 789',
    company: 'Harmonia SRL',
    role: 'Administrator',
    timezone: 'Europe/Bucharest',
    language: 'en'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                <p className="text-sm text-gray-600">Update your profile photo</p>
              </Card.Header>
              <Card.Content>
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <Button variant="secondary">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Personal Information */}
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-600">Update your personal details</p>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => handleProfileChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={profile.role}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="Administrator">Administrator</option>
                      <option value="Manager">Manager</option>
                      <option value="Accountant">Accountant</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Preferences */}
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                <p className="text-sm text-gray-600">Customize your experience</p>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => handleProfileChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="Europe/Bucharest">Europe/Bucharest</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={profile.language}
                      onChange={(e) => handleProfileChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="ro">Română</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                <p className="text-sm text-gray-600">Choose how you want to be notified</p>
              </Card.Header>
              <Card.Content>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('email')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.email ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.email ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('push')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.push ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.push ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive important alerts via SMS</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('sms')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.sms ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.sms ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Marketing Communications</p>
                        <p className="text-sm text-gray-600">Receive updates about new features</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange('marketing')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.marketing ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </Card.Header>
              <Card.Content>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Enable 2FA</p>
                    <p className="text-sm text-gray-600">Secure your account with two-factor authentication</p>
                  </div>
                  <Badge variant="secondary">Not Enabled</Badge>
                </div>
                <Button variant="secondary" className="mt-4">
                  <Key className="w-4 h-4 mr-2" />
                  Enable 2FA
                </Button>
              </Card.Content>
            </Card>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Theme</h3>
                <p className="text-sm text-gray-600">Choose your preferred theme</p>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-primary-500 rounded-lg p-4 cursor-pointer">
                    <div className="w-full h-20 bg-white border rounded mb-3"></div>
                    <p className="font-medium text-center">Light</p>
                  </div>
                  <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                    <div className="w-full h-20 bg-gray-900 rounded mb-3"></div>
                    <p className="font-medium text-center">Dark</p>
                  </div>
                  <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                    <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 rounded mb-3"></div>
                    <p className="font-medium text-center">System</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <p className="text-sm text-gray-600">Manage your subscription</p>
              </Card.Header>
              <Card.Content>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Professional Plan</h4>
                    <p className="text-gray-600">$99/month • Billed monthly</p>
                    <p className="text-sm text-gray-500 mt-1">Next billing date: January 15, 2024</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="mt-6 flex space-x-3">
                  <Button variant="secondary">Change Plan</Button>
                  <Button variant="ghost">Cancel Subscription</Button>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                <p className="text-sm text-gray-600">Manage your payment information</p>
              </Card.Header>
              <Card.Content>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="secondary" className="mt-4">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment Method
                </Button>
              </Card.Content>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <Card.Content>
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </Card.Content>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 