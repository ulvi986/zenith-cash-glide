import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Smartphone, 
  Fuel, 
  CreditCard, 
  Wifi, 
  Home, 
  Car,
  Phone,
  Menu,
  QrCode,
  Send,
  Receipt,
  History
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { PaymentModal } from '@/components/PaymentModal';

const MOBILE_SERVICES = [
  { id: 'mobile', name: 'Mobile Top-up', icon: Smartphone, color: 'bg-green-500' },
  { id: 'gas', name: 'Gas Payment', icon: Fuel, color: 'bg-blue-500' },
  { id: 'internet', name: 'Internet', icon: Wifi, color: 'bg-purple-500' },
  { id: 'electricity', name: 'Electricity', icon: Home, color: 'bg-yellow-500' },
  { id: 'water', name: 'Water', icon: Car, color: 'bg-cyan-500' },
  { id: 'tv', name: 'TV/Cable', icon: Phone, color: 'bg-red-500' },
];

const QUICK_ACTIONS = [
  { id: 'qr', name: 'QR Pay', icon: QrCode, color: 'bg-primary' },
  { id: 'send', name: 'Send Money', icon: Send, color: 'bg-accent' },
  { id: 'bills', name: 'Pay Bills', icon: Receipt, color: 'bg-secondary' },
  { id: 'history', name: 'History', icon: History, color: 'bg-muted' },
];

export function MobileNavigation() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Mobile Bottom Navigation */}
      <div className="bg-background/95 backdrop-blur-lg border-t border-border/50 px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center">
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 h-auto py-2">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 h-auto py-2">
                <Menu className="w-5 h-5" />
                <span className="text-xs">Services</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-center">Payment Services</SheetTitle>
              </SheetHeader>
              <MobileServicesGrid onSelectService={setSelectedService} />
            </SheetContent>
          </Sheet>

          <PaymentModal />
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center space-y-1 h-auto py-2"
            onClick={() => navigate('/history')}
          >
            <History className="w-5 h-5" />
            <span className="text-xs">History</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function MobileServicesGrid({ onSelectService }: { onSelectService: (service: string) => void }) {
  return (
    <div className="space-y-6 pt-4">
      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.id} className="bg-card/50 border-border/50 hover:bg-card/70 transition-all cursor-pointer">
                <CardContent className="flex items-center space-x-3 p-4">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{action.name}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment Services */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-foreground">Payment Services</h3>
        <div className="grid grid-cols-1 gap-3">
          {MOBILE_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                className="bg-card/50 border-border/50 hover:bg-card/70 transition-all cursor-pointer"
                onClick={() => onSelectService(service.id)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-foreground">{service.name}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full opacity-0 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}