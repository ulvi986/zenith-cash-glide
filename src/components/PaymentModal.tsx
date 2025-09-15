import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, DollarSign, Lock, Smartphone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const QUICK_AMOUNTS = [5, 10, 20, 50, 100];

export function PaymentModal() {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('visa');
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handlePayment = async () => {
    if (!amount || !cardNumber || !expiryDate || !cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful",
      description: `Payment of $${amount} has been processed successfully.`,
    });
    
    setIsProcessing(false);
  };

  const PaymentForm = () => (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-payment-gradient rounded-full shadow-payment-glow">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Make Payment</h2>
          <p className="text-muted-foreground">Enter your payment details securely</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="amount" className="text-sm font-medium">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-12 text-lg bg-muted/50 border-border/50"
          />
          <div className="grid grid-cols-5 gap-2">
            {QUICK_AMOUNTS.map((value) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(value)}
                className="h-8 text-xs bg-muted/30 border-border/50 hover:bg-accent hover:border-accent"
              >
                ${value}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="card-type" className="text-sm font-medium">Card Type</Label>
          <Select value={cardType} onValueChange={setCardType}>
            <SelectTrigger className="h-12 bg-muted/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="visa">Visa</SelectItem>
              <SelectItem value="mastercard">Mastercard</SelectItem>
              <SelectItem value="amex">American Express</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="card-number" className="text-sm font-medium">Card Number</Label>
          <div className="relative">
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="h-12 text-lg bg-muted/50 border-border/50 pl-12"
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryChange}
              className="h-12 bg-muted/50 border-border/50"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="cvv" className="text-sm font-medium">CVV</Label>
            <div className="relative">
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="h-12 bg-muted/50 border-border/50 pl-10"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-14 text-lg font-semibold bg-payment-gradient hover:opacity-90 shadow-payment-glow transition-all duration-300 hover:shadow-lg"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <>Pay ${amount || '0'}</>
          )}
        </Button>

        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-payment-gradient hover:opacity-90 shadow-payment-glow">
            <Smartphone className="w-4 h-4 mr-2" />
            Make Payment
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto bg-background border-border">
          <PaymentForm />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-payment-gradient hover:opacity-90 shadow-payment-glow">
          <CreditCard className="w-4 h-4 mr-2" />
          Make Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-background border-border">
        <PaymentForm />
      </DialogContent>
    </Dialog>
  );
}