import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpDown, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TRANSACTION_HISTORY = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼250.00',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Online Store',
    description: 'Electronics purchase'
  },
  {
    id: '2',
    timestamp: '2024-01-15 12:15:10',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼75.50',
    type: 'Transfer',
    status: 'Completed',
    merchant: 'Bank Transfer',
    description: 'Transfer to friend'
  },
  {
    id: '3',
    timestamp: '2024-01-14 18:45:33',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼120.00',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Gas Station',
    description: 'Fuel payment'
  },
  {
    id: '4',
    timestamp: '2024-01-14 16:22:18',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼35.75',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Coffee Shop',
    description: 'Coffee & snacks'
  },
  {
    id: '5',
    timestamp: '2024-01-13 20:10:45',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼500.00',
    type: 'Top-up',
    status: 'Completed',
    merchant: 'Wallet Reload',
    description: 'Account top-up'
  },
  {
    id: '6',
    timestamp: '2024-01-13 14:32:12',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼89.25',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Supermarket',
    description: 'Grocery shopping'
  },
  {
    id: '7',
    timestamp: '2024-01-12 19:55:30',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼45.00',
    type: 'Payment',
    status: 'Completed',
    merchant: 'Restaurant',
    description: 'Dinner payment'
  },
  {
    id: '8',
    timestamp: '2024-01-12 11:20:05',
    cardNumber: '4169 7388 2345 6723',
    amount: '₼200.00',
    type: 'Transfer',
    status: 'Completed',
    merchant: 'Utility Bill',
    description: 'Electricity bill'
  }
];

export default function History() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Payment':
        return 'text-red-600';
      case 'Transfer':
        return 'text-blue-600';
      case 'Top-up':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={handleGoBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Transaction History</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-primary to-primary-foreground">
            <CardContent className="p-4 text-center">
              <p className="text-white/80 text-sm">Total Spent</p>
              <p className="text-white text-xl font-bold">₼1,315.50</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600">
            <CardContent className="p-4 text-center">
              <p className="text-white/80 text-sm">Total Received</p>
              <p className="text-white text-xl font-bold">₼575.50</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
          {TRANSACTION_HISTORY.map((transaction) => (
            <Card key={transaction.id} className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ArrowUpDown className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{transaction.merchant}</h3>
                      <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${getTypeColor(transaction.type)}`}>
                      {transaction.type === 'Top-up' ? '+' : '-'}{transaction.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-border/30 pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-foreground">{transaction.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Card:</span>
                    <span className="text-foreground font-mono">{transaction.cardNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="text-foreground">{transaction.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="text-foreground font-mono">#{transaction.id.padStart(8, '0')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center pt-4 pb-20">
          <Button variant="outline" className="w-full">
            Load More Transactions
          </Button>
        </div>
      </div>
    </div>
  );
}