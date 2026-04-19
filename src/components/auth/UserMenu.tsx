import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Settings, Zap, LayoutDashboard, CreditCard } from 'lucide-react';
import { LoginModal } from './LoginModal';

export const UserMenu = () => {
  const { user, profile, isPro, signOut } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLoginOpen(true)}
            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setLoginOpen(true)}
            className="px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            Login
          </button>
        </div>
        <LoginModal isOpen={loginOpen} onOpenChange={setLoginOpen} />
      </>
    );
  }

  const email = user.email || 'User';
  const initials = email
    .split('@')[0]
    .split('')
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={email} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {isPro && (
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <Zap className="h-3 w-3 mr-1" />
              PRO
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{email}</DropdownMenuLabel>

        {isPro && (
          <div className="px-2 py-1.5 text-xs text-amber-500 flex items-center gap-1">
            <Zap className="w-3 h-3" /> Pro subscriber
          </div>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/my-account" className="flex cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>My Account</span>
          </Link>
        </DropdownMenuItem>

        {!isPro && (
          <DropdownMenuItem asChild>
            <Link to="/subscription" className="flex cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Upgrade to Pro</span>
            </Link>
          </DropdownMenuItem>
        )}

        {isPro && (
          <DropdownMenuItem asChild>
            <Link to="/subscription" className="flex cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Manage Plan</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
