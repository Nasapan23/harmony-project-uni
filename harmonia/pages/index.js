import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  DollarSign,
  Star,
  TrendingUp,
  Award,
  Clock,
  Target
} from 'lucide-react';
import Button from '../components/ui/Button';

export default function Home() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Error Detection",
      description: "Advanced algorithms automatically detect and flag potential accounting errors before they become problems.",
      color: "text-orange-600 bg-orange-100"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Process transactions and generate reports instantly with our lightning-fast cloud infrastructure.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive business insights with interactive dashboards and predictive analytics.",
      color: "text-orange-600 bg-orange-100"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Streamlined client onboarding and management with automated workflows and communication.",
      color: "text-blue-600 bg-blue-100"
    }
  ];

  const pillars = [
    {
      icon: Target,
      title: "PRECISION",
      description: "Every calculation, every report, every insight delivered with mathematical precision and attention to detail.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "GROWTH",
      description: "Empowering businesses to scale efficiently with intelligent automation and strategic insights.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Award,
      title: "EXCELLENCE",
      description: "Setting the gold standard in accounting services through innovation and unwavering quality.",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Accuracy Rate", icon: Target },
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "24/7", label: "Support Available", icon: Clock },
    { number: "50%", label: "Time Saved", icon: Zap }
  ];

  const testimonials = [
    {
      name: "Smart Topics SRL",
      role: "Technology Company",
      content: "Harmonia transformed our accounting processes. The AI error detection saved us countless hours and prevented costly mistakes.",
      rating: 5
    },
    {
      name: "Creative Agency Pro",
      role: "Marketing Agency",
      content: "The real-time analytics and reporting features have given us unprecedented visibility into our financial performance.",
      rating: 5
    },
    {
      name: "Business Consulting Group",
      role: "Consulting Firm",
      content: "Outstanding service and support. The automated workflows have streamlined our entire accounting department.",
      rating: 5
    }
  ];

  // Floating icons animation
  const floatingIcons = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    icon: [DollarSign, BarChart3, Shield, Zap][i % 4],
    delay: i * 0.5,
    duration: 3 + (i % 3),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Floating Background Icons */}
        {floatingIcons.map((item) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              className="absolute text-blue-200 opacity-30"
              style={{
                left: `${10 + (item.id * 12)}%`,
                top: `${20 + (item.id * 8)}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
              }}
            >
              <IconComponent className="w-8 h-8" />
            </motion.div>
          );
        })}

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                HARMONIA
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium">
              Precision in Accounting
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Revolutionary AI-powered accounting platform that transforms how businesses manage their finances. 
              Experience the future of accounting with intelligent automation, real-time insights, and unmatched precision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={handleGoToDashboard}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="secondary"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-4 text-orange-100" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-orange-100 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our cutting-edge technology revolutionizes accounting processes and drives business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
              3 Pillars of <span className="text-orange-600">SUCCESS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our foundation is built on three core principles that drive exceptional results for every client.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:transform group-hover:scale-105">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 mx-auto`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{pillar.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed text-center">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. See how Harmonia has transformed businesses across industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-orange-600 font-medium">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
              Ready to Transform Your Accounting?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that have revolutionized their financial processes with Harmonia's AI-powered platform.
            </p>
            <Button 
              onClick={handleGoToDashboard}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              HARMONIA
            </h3>
            <p className="text-gray-400 mb-6">Precision in Accounting</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Harmonia SRL. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
