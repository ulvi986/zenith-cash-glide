import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PaymentModal } from './PaymentModal';
import { Smartphone, CreditCard, TrendingUp, Shield, Zap, Globe, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileHeroProps {
  user?: { email: string; fullName: string } | null;
  onAuthClick?: () => void;
  onLogout?: () => void;
}

const MOBILE_FEATURES = [
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Optimized for mobile devices with touch-friendly interface',
    color: 'bg-blue-500'
  },
  {
    icon: Zap,
    title: 'Instant Payments',
    description: 'Lightning-fast transactions in seconds',
    color: 'bg-yellow-500'
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Bank-level security with end-to-end encryption',
    color: 'bg-green-500'
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Pay anywhere, anytime with international support',
    color: 'bg-purple-500'
  }
];

export function MobileHero({ user, onAuthClick, onLogout }: MobileHeroProps) {
  const isMobile = useIsMobile();

  return (
    <div className="relative overflow-hidden">
      {/* Mobile Hero Section */}
      <div className={`relative bg-payment-gradient ${isMobile ? 'px-4 py-12' : 'px-6 py-16'}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl">
          {/* Mobile Auth Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Reforger
              </h1>
              <div className="flex items-center space-x-2">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{user.fullName}</p>
                      <p className="text-xs text-white/60">{user.email}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={onLogout}
                      className="border-destructive/20 text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onAuthClick}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="text-center">
            <h1 className={`font-bold tracking-tight text-white ${
              isMobile ? 'text-3xl' : 'text-4xl sm:text-6xl'
            }`}>
              {isMobile ? (
                <>
                  Mobile Payment
                  <span className="block text-primary-glow">Made Simple</span>
                </>
              ) : (
                <>
                  Modern Payment
                  <span className="block text-primary-glow">System</span>
                </>
              )}
            </h1>
            <p className={`mx-auto mt-6 leading-8 text-white/80 ${
              isMobile ? 'max-w-md text-base' : 'max-w-2xl text-lg'
            }`}>
              {isMobile 
                ? 'Fast, secure payments on your mobile device. Top-up, pay bills, and transfer money instantly.'
                : 'Experience the future of payments with our secure, fast, and user-friendly platform. Process transactions seamlessly across all devices.'
              }
            </p>
            
            {/* Mobile-specific call to action */}
            {isMobile && (
              <div className="flex flex-col space-y-3 mt-8">
                <Button 
                  size="lg" 
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Get Mobile App
                </Button>
                <PaymentModal />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Features Grid */}
      {isMobile && (
        <div className="px-4 py-8 bg-background">
          <h2 className="text-xl font-bold text-center mb-6 text-foreground">Why Choose Our App?</h2>
          <div className="grid grid-cols-2 gap-4">
            {MOBILE_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
