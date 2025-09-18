import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServicesSection } from '@/components/ServicesSection';
import { MobileNavigation } from '@/components/MobileNavigation';
import { MobileHero } from '@/components/MobileHero';
import { PaymentModal } from '@/components/PaymentModal';
import { ArrowUpRight, ArrowDownRight, CreditCard, TrendingUp, Users, DollarSign, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';
import { AIVoiceButton } from './AIVoiceButton';
import { AIChatbot } from './AIChatbot';
import { useIsMobile } from '@/hooks/use-mobile';

const RECENT_TRANSACTIONS = [
  { id: 1, type: 'income', amount: 2400, description: 'Payment received', time: '2 hours ago' },
  { id: 2, type: 'expense', amount: 150, description: 'Service fee', time: '5 hours ago' },
  { id: 3, type: 'income', amount: 890, description: 'Payment received', time: '1 day ago' },
  { id: 4, type: 'expense', amount: 45, description: 'Transaction fee', time: '2 days ago' },
];

const STATS = [
  { title: 'Total Revenue', value: '$12,345', change: '+12.5%', icon: DollarSign },
  { title: 'Active Users', value: '1,234', change: '+5.2%', icon: Users },
  { title: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: TrendingUp },
  { title: 'Total Transactions', value: '567', change: '+8.1%', icon: CreditCard },
];

export function PaymentDashboard() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; fullName: string } | null>(null);
  const isMobile = useIsMobile();

  const handleAuthSuccess = (userData: { email: string; fullName: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'pb-20' : ''}`}>
      {/* Header with Auth */}
      {!isMobile && (
        <div className="bg-card/50 border-b border-border/50 backdrop-blur-sm">
          <div className="px-6 py-4 mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  FinPay
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLogout}
                      className="border-destructive/20 text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Mobile optimized */}
      <MobileHero user={user} onAuthClick={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />
      
      {/* Desktop Hero Section */}
      {!isMobile && (
        <div className="relative overflow-hidden bg-payment-gradient">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative px-6 py-16 mx-auto max-w-7xl sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Modern Payment
                <span className="block text-primary-glow">System</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Experience the future of payments with our secure, fast, and user-friendly platform.
                Process transactions seamlessly across all devices.
              </p>
              <div className="flex items-center justify-center mt-10">
                <PaymentModal />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <div className="mt-16">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_TRANSACTIONS.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'income' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowDownRight className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.time}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Our Platform?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built with security, speed, and user experience in mind
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-payment-gradient rounded-lg flex items-center justify-center shadow-payment-glow">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  End-to-end encryption ensures your payment data is always protected with industry-leading security standards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-payment-gradient rounded-lg flex items-center justify-center shadow-payment-glow">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground">Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor your transactions and revenue in real-time with comprehensive analytics and reporting tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-payment-gradient rounded-lg flex items-center justify-center shadow-payment-glow">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground">Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Accept payments from customers worldwide with support for multiple currencies and payment methods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services Section */}
        <ServicesSection />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* AI Features */}
      <AIVoiceButton />
      <AIChatbot />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}