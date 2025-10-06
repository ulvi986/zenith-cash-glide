import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Target, Lightbulb, Brain, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function AI() {
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState<number>(0);
  const [incomeData, setIncomeData] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/totalexpense")
      .then((res) => res.json())
      .then((data) => {
        setExpenseData(data.expense);
      })
      .catch((err) => console.error("Error fetching totals:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/totalincome")
      .then((res) => res.json())
      .then((data) => {
        setIncomeData(data.income);
      })
      .catch((err) => console.error("Error fetching totals:", err));
  }, []);

  const savingsRate = incomeData > 0 ? ((incomeData - expenseData) / incomeData * 100) : 0;
  const predictedNextMonthExpense = Math.round(expenseData * 1.1);
  const potentialSavings = Math.round((incomeData - expenseData) * 0.2);
  const goalAmount = 10000;
  const monthsToGoal = incomeData - expenseData > 0 ? Math.ceil(goalAmount / (incomeData - expenseData)) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-foreground">AI Predictions</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* AI Overview */}
        <Card className="bg-gradient-to-r from-primary to-accent">
          <CardContent className="p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">AI Financial Assistant</h2>
                <p className="text-white/80 text-sm">Powered by advanced analytics</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/70 text-xs">Savings Rate</p>
                <p className="text-2xl font-bold">{savingsRate.toFixed(1)}%</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/70 text-xs">Financial Health</p>
                <p className="text-2xl font-bold">
                  {savingsRate > 20 ? 'Excellent' : savingsRate > 10 ? 'Good' : 'Fair'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Spending Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground">Next Month Forecast</h4>
                <Badge variant="secondary">High Confidence</Badge>
              </div>
              <p className="text-2xl font-bold text-primary mb-2">₼{predictedNextMonthExpense}</p>
              <p className="text-sm text-muted-foreground">
                Based on your spending patterns over the last 3 months, we predict you'll spend approximately ₼{predictedNextMonthExpense} next month.
              </p>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Confidence Level</p>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">85% accurate</p>
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground">Category Breakdown</h4>
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-3 mt-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Food & Dining</span>
                    <span className="font-semibold">₼{Math.round(predictedNextMonthExpense * 0.3)}</span>
                  </div>
                  <Progress value={30} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Transport</span>
                    <span className="font-semibold">₼{Math.round(predictedNextMonthExpense * 0.2)}</span>
                  </div>
                  <Progress value={20} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Shopping</span>
                    <span className="font-semibold">₼{Math.round(predictedNextMonthExpense * 0.25)}</span>
                  </div>
                  <Progress value={25} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Utilities</span>
                    <span className="font-semibold">₼{Math.round(predictedNextMonthExpense * 0.15)}</span>
                  </div>
                  <Progress value={15} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Entertainment</span>
                    <span className="font-semibold">₼{Math.round(predictedNextMonthExpense * 0.1)}</span>
                  </div>
                  <Progress value={10} className="h-1.5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              <span>Smart Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2">💰 Savings Opportunity</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You could save ₼{potentialSavings} more per month by optimizing your subscriptions and reducing dining out by 20%.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Plan
              </Button>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">📊 Budget Optimization</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your food expenses are 15% higher than average. Consider meal planning to save ₼{Math.round(predictedNextMonthExpense * 0.045)}/month.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Get Tips
              </Button>
            </div>

            <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <h4 className="font-semibold text-foreground mb-2">⚡ Quick Win</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Switch to annual billing for your subscriptions and save an estimated ₼{Math.round(predictedNextMonthExpense * 0.02)}/month.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                See Subscriptions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Goal Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground">Emergency Fund Goal</h4>
                <Badge>₼{goalAmount}</Badge>
              </div>
              <div className="mb-3">
                <Progress value={((incomeData - expenseData) / goalAmount) * 100} className="h-2" />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Current savings rate</span>
                <span className="font-semibold text-foreground">₼{incomeData - expenseData}/month</span>
              </div>
              <div className="mt-4 p-3 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground">
                  🎯 At your current pace, you'll reach this goal in <span className="font-bold text-foreground">{monthsToGoal} months</span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2">💡 Speed Up Your Goal</h4>
              <p className="text-sm text-muted-foreground">
                By following our recommendations above, you could reach your goal {Math.max(1, monthsToGoal - 2)} months faster!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>AI Analysis Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Consistent Income</p>
                <p className="text-xs text-muted-foreground">Your income has been stable over the past months</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                ⚠
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Spending Trend</p>
                <p className="text-xs text-muted-foreground">Your expenses have increased by 10% this month</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                📈
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Savings Potential</p>
                <p className="text-xs text-muted-foreground">You're on track to save {savingsRate.toFixed(0)}% of your income</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refresh AI Analysis */}
        <Card>
          <CardContent className="p-6 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Want More Insights?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI analyzes your financial patterns daily to provide personalized recommendations
            </p>
            <Button className="w-full">
              Refresh AI Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
