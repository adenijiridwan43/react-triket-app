// File: src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  BarChart3, 
  Zap,
  Shield,
  Clock,
  Star,
  Quote
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Easy Ticket Creation',
      description: 'Create, assign, and track tickets with ease. Our intuitive interface makes it simple to manage your support requests.',
    },
    {
      icon: Users,
      title: 'Real-Time Collaboration',
      description: 'Work together with your team in real-time. Add notes, mention colleagues, and see updates as they happen.',
    },
    {
      icon: BarChart3,
      title: 'Powerful Reporting',
      description: 'Gain valuable insights into your support performance. Our reporting tools help you track metrics and identify areas for improvement.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah L.',
      role: 'Marketing Manager',
      avatar: '👩‍💼',
      quote: 'Triket has revolutionized our customer support. It\'s so easy to use and has saved us countless hours of work.',
    },
    {
      name: 'Michael B.',
      role: 'Lead Developer',
      avatar: '👨‍💻',
      quote: 'I love the real-time collaboration features. It\'s so much easier to work with my team on complex tickets.',
    },
    {
      name: 'Jessica T.',
      role: 'Support Specialist',
      avatar: '👩‍🎓',
      quote: 'The reporting tools are a game-changer. I can finally see how my team is performing and where we can improve.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Up to 10 users',
        'Basic reporting',
        'Email support',
        '5GB storage',
      ],
      cta: 'Get Started',
      variant: 'ghost',
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/month',
      popular: true,
      features: [
        'Unlimited users',
        'Advanced reporting',
        'Priority support',
        '100GB storage',
        'Custom branding',
      ],
      cta: 'Get Started',
      variant: 'primary',
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: [
        'Custom features',
        'Dedicated account manager',
        '24/7 support',
        'Unlimited storage',
        'Advanced security',
      ],
      cta: 'Contact Us',
      variant: 'outline',
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Wave */}
      <section className="relative bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 pt-20 pb-32 lg:pt-28 lg:pb-40">
        {/* Decorative Circles */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The Effortless Way to Manage Your Customer Support
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
              Triket is a simple, yet powerful ticket management system that helps you provide outstanding customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto border-2 border-white/30 hover:bg-white/10">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-24 md:h-32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              fill="#000000"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-black">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need, nothing you don't.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Triket is packed with features to help you streamline your customer support, without the clutter of enterprise software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-8 hover:border-blue-600 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-blue-500/20"
              >
                <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <feature.icon size={32} className="text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32 bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our customers have to say about their experience with Triket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <Quote size={32} className="text-blue-500 mb-4" />
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-20 lg:py-32 bg-black">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose the plan that's right for you
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple, transparent pricing that scales with your needs. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-gray-900 rounded-2xl p-8 relative ${
                  plan.popular
                    ? 'border-4 border-blue-600 shadow-2xl shadow-blue-500/30 scale-105'
                    : 'border-2 border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                  ))}
                </ul>

                <Button variant={plan.variant} fullWidth size="lg">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of teams who trust Triket to manage their customer support.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" variant="secondary">
                Start Free Trial
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}