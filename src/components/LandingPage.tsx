import { ArrowRight, Zap, Users, TrendingUp, MessageCircle, Calendar, ShoppingCart, Star, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WhatsAppConversation, WhatsAppConversation2 } from '@/components/WhatsAppConversation';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

 
export function LandingPage() {
    const [isLoading, setIsLoading] = useState(false);   
    const { isSignedIn, isLoaded, getToken } = useAuth();

  // ─── Loading state ────────────────────────────────────────────────────────
  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading Home Page...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-orange-50 to-white -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-4 py-1">
              🚀 AI-Powered Restaurant Assistant
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Manage Your Restaurant Orders{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                10x Faster
              </span>{' '}
              with RestoBot
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Automate orders, reservations, and customer service via WhatsApp. 
              No coding required. Setup in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 transition-all group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 hover:border-primary hover:text-primary"
              >
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-white font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">Trusted by 500+ restaurants</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - WhatsApp Mockup */}
          <div className="animate-in fade-in slide-in-from-right duration-700 delay-300">
            <WhatsAppConversation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Why Choose RestoBot
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Scale Your Restaurant
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful automation tools designed specifically for restaurants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageCircle className="h-7 w-7 text-white" />}
              title="WhatsApp Integration"
              description="Take orders directly through WhatsApp. Customers order in their favorite app."
              gradient="from-green-500 to-green-600"
            />
            <FeatureCard
              icon={<ShoppingCart className="h-7 w-7 text-white" />}
              title="Smart Order Management"
              description="AI automatically processes orders, updates inventory, and notifies kitchen staff."
              gradient="from-orange-500 to-orange-600"
            />
            <FeatureCard
              icon={<Calendar className="h-7 w-7 text-white" />}
              title="Table Reservations"
              description="Customers can book tables 24/7 without calling. Auto-confirmation via SMS."
              gradient="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={<Zap className="h-7 w-7 text-white" />}
              title="Instant Setup"
              description="Go live in under 5 minutes. No technical knowledge required."
              gradient="from-purple-500 to-purple-600"
            />
            <FeatureCard
              icon={<TrendingUp className="h-7 w-7 text-white" />}
              title="Analytics Dashboard"
              description="Track sales, popular items, peak hours, and customer insights in real-time."
              gradient="from-pink-500 to-pink-600"
            />
            <FeatureCard
              icon={<Users className="h-7 w-7 text-white" />}
              title="Customer Loyalty"
              description="Built-in rewards program to keep customers coming back."
              gradient="from-indigo-500 to-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              See RestoBot in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch how customers interact with your restaurant via WhatsApp
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Conversation 1 */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl mb-2">📱 Food Ordering</h3>
                <p className="text-muted-foreground">
                  Customers browse menu, place orders, and get instant confirmation
                </p>
              </div>
              <WhatsAppConversation />
            </div>

            {/* Conversation 2 */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl mb-2">🍽️ Table Reservations</h3>
                <p className="text-muted-foreground">
                  Easy booking system with real-time availability
                </p>
              </div>
              <WhatsAppConversation2 />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Active Restaurants' },
              { value: '50K+', label: 'Orders Processed' },
              { value: '95%', label: 'Customer Satisfaction' },
              { value: '24/7', label: 'AI Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Transform Your Restaurant
            </h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of restaurants already using RestoBot
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Reduce order errors by 90%',
              'Handle 10x more orders simultaneously',
              'Never miss a booking or order',
              'Free up staff for better customer service',
              'Increase revenue by 30% on average',
              'Real-time menu updates',
              'Multi-location support',
              'Detailed customer analytics',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 hover:border-primary transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Start for free. No credit card required. Setup in 5 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="mt-6 text-white/80 text-sm">
            ✨ 14-day free trial • 💳 No credit card needed • 🚀 Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
