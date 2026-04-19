import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Settings, CreditCard, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { EzyLogo } from './EzyLogo';
import { ToggleSwitch } from './ToggleSwitch';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarLinks = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/my-account', icon: Settings, label: 'My Account' },
  { to: '/subscription', icon: CreditCard, label: 'Subscription' },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { isPro, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5">
            <EzyLogo size={32} />
            <span className="font-heading font-bold text-lg">EzyConverter</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Plan Indicator */}
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">Plan</span>
          <span className="text-xs font-semibold flex items-center gap-1">
            {isPro ? (
              <span className="text-amber-500 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Pro
              </span>
            ) : (
              <span className="text-muted-foreground">Free</span>
            )}
          </span>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-2">
            <ToggleSwitch />
            <button
              onClick={handleSignOut}
              className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-black/50"
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              className="fixed left-0 top-0 z-50 w-64 h-screen flex flex-col border-r border-border bg-card md:hidden"
            >
              {/* Close Button */}
              <div className="p-4 flex justify-between items-center border-b border-border">
                <Link to="/" className="flex items-center gap-2.5">
                  <EzyLogo size={32} />
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>


              {/* Navigation */}
              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Plan Indicator */}
              <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Plan</span>
                <span className="text-xs font-semibold flex items-center gap-1">
                  {isPro ? (
                    <span className="text-amber-500 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Pro
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Free</span>
                  )}
                </span>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2">
                  <ToggleSwitch />
                  <button
                    onClick={handleSignOut}
                    className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="md:hidden flex items-center justify-between px-4 h-16 border-b border-border bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <EzyLogo size={28} />
            <span className="font-heading font-bold">Ezy</span>
          </Link>
          <div className="w-9" /> {/* Spacer for alignment */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
