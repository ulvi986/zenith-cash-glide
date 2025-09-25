import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { DesktopHeader } from './DesktopHeader';
import { MobileNavigation } from './MobileNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  user?: { email: string; fullName: string } | null;
  onAuthClick?: () => void;
  onLogout?: () => void;
}

export function Layout({ children, user, onAuthClick, onLogout }: LayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        {children}
        <MobileNavigation />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar user={user} onLogout={onLogout} />
        
        <div className="flex-1 flex flex-col">
          <DesktopHeader user={user} onAuthClick={onAuthClick} onLogout={onLogout} />
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}