import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings, Edit, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

// Sample data for charts
const EXPENSE_DATA = [
  { month: 'Jan', expense: 1200, income: 3500 },
  { month: 'Feb', expense: 1800, income: 3200 },
  { month: 'Mar', expense: 2200, income: 3800 },
  { month: 'Apr', expense: 1600, income: 3600 },
  { month: 'May', expense: 2000, income: 4000 },
  { month: 'Jun', expense: 1400, income: 3400 },
];

const SCATTER_DATA = [
  { x: 100, y: 200, category: 'Food' },
  { x: 150, y: 180, category: 'Transport' },
  { x: 200, y: 320, category: 'Shopping' },
  { x: 80, y: 150, category: 'Utilities' },
  { x: 300, y: 250, category: 'Entertainment' },
  { x: 120, y: 180, category: 'Healthcare' },
  { x: 180, y: 220, category: 'Education' },
  { x: 90, y: 160, category: 'Gas' },
];

const RECENT_TRANSACTIONS = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30',
    amount: '₼250.00',
    type: 'expense',
    merchant: 'Online Store',
  },
  {
    id: '2',
    timestamp: '2024-01-15 12:15',
    amount: '₼75.50',
    type: 'expense',
    merchant: 'Coffee Shop',
  },
  {
    id: '3',
    timestamp: '2024-01-14 18:45',
    amount: '₼500.00',
    type: 'income',
    merchant: 'Salary Deposit',
  },
];

const chartConfig = {
  expense: {
    label: "Expense",
    color: "hsl(var(--destructive))",
  },
  income: {
    label: "Income",
    color: "hsl(var(--accent))",
  },
} satisfies any;

export default function Profile() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--accent))',
      'hsl(var(--secondary))',
      'hsl(217 91% 60%)',
      'hsl(263 85% 70%)',
      'hsl(0 84% 60%)',
      'hsl(120 60% 50%)',
      'hsl(45 93% 47%)',
    ];
    return colors[category.length % colors.length];
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
          <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Profile Info */}
        <Card className="bg-gradient-to-r from-primary to-accent">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-background text-primary text-lg font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-white">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-white/80">john.doe@email.com</p>
                <p className="text-white/80">Member since Jan 2024</p>
              </div>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Summary */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Total Income</p>
              <p className="text-foreground text-xl font-bold">₼21,500</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Total Expenses</p>
              <p className="text-foreground text-xl font-bold">₼10,200</p>
            </CardContent>
          </Card>
        </div>

        {/* Expense vs Income Histogram */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Monthly Income vs Expenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EXPENSE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill="hsl(var(--accent))" radius={4} />
                  <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Scatter Plot for Spending Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowUpDown className="w-5 h-5" />
              <span>Spending by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={SCATTER_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    dataKey="x"
                    name="frequency"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y"
                    name="amount"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="text-foreground font-medium">{data.category}</p>
                            <p className="text-muted-foreground text-sm">
                              Frequency: {data.x} | Amount: ₼{data.y}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter dataKey="y" fill="hsl(var(--primary))">
                    {SCATTER_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.from(new Set(SCATTER_DATA.map(d => d.category))).map((category) => (
                <Badge 
                  key={category} 
                  variant="outline"
                  style={{ borderColor: getCategoryColor(category), color: getCategoryColor(category) }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/history')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_TRANSACTIONS.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowUpDown className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{transaction.merchant}</h4>
                    <p className="text-sm text-muted-foreground">{transaction.timestamp}</p>
                  </div>
                </div>
                <p className={`font-bold ${transaction.type === 'income' ? 'text-accent' : 'text-destructive'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Security Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Notification Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}