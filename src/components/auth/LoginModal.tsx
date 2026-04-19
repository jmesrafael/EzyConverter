import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Mail, Loader2, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  const { signInWithMagicLink, signInWithPassword, checkUserExists } = useAuth();
  const [tab, setTab] = useState<'magiclink' | 'password'>('magiclink');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) return;

    try {
      setLoading(true);
      await signInWithMagicLink(email);
      setSent(true);
      setTimeout(() => {
        setEmail('');
        setSent(false);
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      setError('Failed to send magic link. Please try again.');
      console.error('Magic link sign in failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signInWithPassword(email, password);
      setEmail('');
      setPassword('');
      onOpenChange(false);
    } catch (error) {
      setError('Invalid email or password. Try resending a magic link instead.');
      console.error('Password login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Welcome to EzyConverter
          </DialogTitle>
          <DialogDescription>
            Sign in or login to unlock Pro features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => {
                setTab('magiclink');
                setError('');
                setSent(false);
              }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                tab === 'magiclink'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Sign In
            </button>
            <button
              onClick={() => {
                setTab('password');
                setError('');
                setSent(false);
              }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                tab === 'password'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Login
            </button>
          </div>

          <div className="rounded-lg border border-primary/20 p-4 bg-primary/5">
            <h3 className="font-semibold mb-2 text-foreground">Pro features include:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✓ No ads</li>
              <li>✓ Unlimited batch conversions</li>
              <li>✓ No file size limits</li>
              <li>✓ Sync history across devices</li>
            </ul>
          </div>

          {/* Magic Link Tab */}
          {tab === 'magiclink' && (
            <>
              {sent ? (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-500">
                    ✓ Check your email for a login link! Click it to sign in.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMagicLinkSignIn} className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="email-magic" className="text-sm font-medium text-foreground">
                      Email address
                    </label>
                    <Input
                      id="email-magic"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                      className="bg-muted/50 border-border text-foreground"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full gradient-bg text-black font-semibold hover:opacity-90 transition-opacity"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {loading ? 'Sending...' : 'Send magic link'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    We'll send you a secure login link via email. No password needed!
                  </p>
                </form>
              )}
            </>
          )}

          {/* Password Login Tab */}
          {tab === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="email-password" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <Input
                  id="email-password"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="bg-muted/50 border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="bg-muted/50 border-border text-foreground"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg text-black font-semibold hover:opacity-90 transition-opacity"
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Don't have a password? Use the Sign In tab to get a magic link.
              </p>
            </form>
          )}

          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
