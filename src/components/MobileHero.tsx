import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaymentModal } from './PaymentModal';
import { Smartphone, CreditCard, TrendingUp, Shield, Zap, Globe, User, LogOut, History, ArrowUpDown } from 'lucide-react';
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

const TRANSACTION_HISTORY = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼250.00',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Online Store'
  },
  {
    id: '2',
    timestamp: '2024-01-15 12:15:10',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼75.50',
    type: 'Transfer',
    status: 'Completed',
    merchant: 'Bank Transfer'
  },
  {
    id: '3',
    timestamp: '2024-01-14 18:45:33',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼120.00',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Gas Station'
  },
  {
    id: '4',
    timestamp: '2024-01-14 16:22:18',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼35.75',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Coffee Shop'
  },
  {
    id: '5',
    timestamp: '2024-01-13 20:10:45',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼500.00',
    type: 'Top-up',
    status: 'Completed',
    merchant: 'Wallet Reload'
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
                  <span className="block text-primary-glow">Reforger</span>
                </>
              ) : (
                <>
                  Reforger
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

      {/* Mobile Features and History Tabs */}
      {isMobile && (
        <div className="px-4 py-8 bg-background">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
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
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <h2 className="text-xl font-bold text-center mb-6 text-foreground">Transaction History</h2>
              <div className="space-y-3">
                {TRANSACTION_HISTORY.map((transaction) => (
                  <Card key={transaction.id} className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <ArrowUpDown className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm text-foreground">{transaction.type}</span>
                        </div>
                        <span className="font-bold text-sm text-foreground">{transaction.amount}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                        <p className="text-xs text-muted-foreground">Card: {transaction.cardNumber}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
