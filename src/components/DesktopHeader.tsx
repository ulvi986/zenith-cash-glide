import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProfileDropdown } from './ProfileDropdown';

interface DesktopHeaderProps {
  user?: { email: string; fullName: string } | null;
  onAuthClick?: () => void;
  onLogout?: () => void;
}

export function DesktopHeader({ user, onAuthClick, onLogout }: DesktopHeaderProps) {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-lg flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="h-8 w-8" />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
        </Button>

        {user ? (
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <ProfileDropdown user={user} onLogout={onLogout} />
          </div>
        ) : (
          <Button variant="outline" onClick={onAuthClick}>
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}