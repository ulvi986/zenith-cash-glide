import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Smartphone, Fuel, Phone, Wifi, Car, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MOBILE_OPERATORS = [
  { id: 'azercell', name: 'Azercell', prefix: '50', color: 'bg-green-500' },
  { id: 'bakcell', name: 'Bakcell', prefix: '55', color: 'bg-blue-500' },
  { id: 'nar', name: 'Nar', prefix: '70', color: 'bg-red-500' },
];

const GAS_SERVICES = [
  { id: 'azergas', name: 'Azergas', icon: Fuel },
  { id: 'socar', name: 'SOCAR Gas', icon: Car },
  { id: 'azgas', name: 'AzGas', icon: Home },
];

const QUICK_AMOUNTS_MOBILE = [5, 10, 15, 20, 30, 50];
const QUICK_AMOUNTS_GAS = [20, 50, 100, 150, 200];

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ServiceCard({ title, icon, children }: ServiceCardProps) {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-foreground">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export function ServicesSection() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOperator, setMobileOperator] = useState('');
  const [mobileAmount, setMobileAmount] = useState('');
  const [gasAccount, setGasAccount] = useState('');
  const [gasService, setGasService] = useState('');
  const [gasAmount, setGasAmount] = useState('');
  const { toast } = useToast();

  const handleMobileTopup = () => {
    if (!mobileNumber || !mobileOperator || !mobileAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all mobile top-up details.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mobile Top-up Successful",
      description: `${mobileAmount} AZN added to ${mobileNumber}`,
    });
  };

  const handleGasPayment = () => {
    if (!gasAccount || !gasService || !gasAmount) {
      toast({
        title: "Missing Information", 
        description: "Please fill in all gas payment details.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gas Payment Successful",
      description: `${gasAmount} AZN paid for account ${gasAccount}`,
    });
  };

  const formatMobileNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 9) {
      const formatted = cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
      return formatted;
    }
    return value;
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMobileNumber(e.target.value);
    setMobileNumber(formatted);
    
    // Auto-detect operator by prefix
    const cleaned = formatted.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      const prefix = cleaned.substring(0, 2);
      const operator = MOBILE_OPERATORS.find(op => op.prefix === prefix);
      if (operator) {
        setMobileOperator(operator.id);
      }
    }
  };

  return (
    <div className="px-6 py-16 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">Payment Services</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Mobile top-ups, gas payments, and more
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Mobile Top-up Section */}
        <ServiceCard
          title="Mobile Top-up"
          icon={<Smartphone className="w-6 h-6 text-primary" />}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile-number">Mobile Number</Label>
              <Input
                id="mobile-number"
                placeholder="50 123 45 67"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                className="h-12 bg-muted/50 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile-operator">Operator</Label>
              <Select value={mobileOperator} onValueChange={setMobileOperator}>
                <SelectTrigger className="h-12 bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {MOBILE_OPERATORS.map((operator) => (
                    <SelectItem key={operator.id} value={operator.id}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${operator.color}`} />
                        <span>{operator.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile-amount">Amount (AZN)</Label>
              <Input
                id="mobile-amount"
                type="number"
                placeholder="Enter amount"
                value={mobileAmount}
                onChange={(e) => setMobileAmount(e.target.value)}
                className="h-12 bg-muted/50 border-border/50"
              />
              <div className="grid grid-cols-3 gap-2">
                {QUICK_AMOUNTS_MOBILE.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setMobileAmount(amount.toString())}
                    className="h-8 text-xs bg-muted/30 border-border/50 hover:bg-accent"
                  >
                    {amount} AZN
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleMobileTopup}
              className="w-full h-12 bg-payment-gradient hover:opacity-90 shadow-payment-glow"
            >
              <Phone className="w-4 h-4 mr-2" />
              Top-up Mobile
            </Button>
          </div>
        </ServiceCard>

        {/* Gas Payment Section */}
        <ServiceCard
          title="Gas Payment"
          icon={<Fuel className="w-6 h-6 text-primary" />}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gas-service">Gas Service</Label>
              <Select value={gasService} onValueChange={setGasService}>
                <SelectTrigger className="h-12 bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select gas service" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {GAS_SERVICES.map((service) => {
                    const Icon = service.icon;
                    return (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span>{service.name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gas-account">Account Number</Label>
              <Input
                id="gas-account"
                placeholder="Enter account number"
                value={gasAccount}
                onChange={(e) => setGasAccount(e.target.value)}
                className="h-12 bg-muted/50 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gas-amount">Amount (AZN)</Label>
              <Input
                id="gas-amount"
                type="number"
                placeholder="Enter amount"
                value={gasAmount}
                onChange={(e) => setGasAmount(e.target.value)}
                className="h-12 bg-muted/50 border-border/50"
              />
              <div className="grid grid-cols-3 gap-2">
                {QUICK_AMOUNTS_GAS.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setGasAmount(amount.toString())}
                    className="h-8 text-xs bg-muted/30 border-border/50 hover:bg-accent"
                  >
                    {amount} AZN
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGasPayment}
              className="w-full h-12 bg-payment-gradient hover:opacity-90 shadow-payment-glow"
            >
              <Fuel className="w-4 h-4 mr-2" />
              Pay Gas Bill
            </Button>
          </div>
        </ServiceCard>
      </div>

      {/* Additional Services Grid */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Other Services</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Internet', icon: Wifi, color: 'bg-blue-500' },
            { name: 'Electricity', icon: Home, color: 'bg-yellow-500' },
            { name: 'Water', icon: Car, color: 'bg-cyan-500' },
            { name: 'TV/Cable', icon: Phone, color: 'bg-purple-500' },
          ].map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.name} className="bg-card/30 border-border/30 hover:bg-card/50 transition-all cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{service.name}</span>
                  <span className="text-sm text-muted-foreground">Coming Soon</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}