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
import { Loader2, AlertCircle } from 'lucide-react';

interface PasswordLoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PasswordLoginModal = ({ isOpen, onOpenChange }: PasswordLoginModalProps) => {
  const { signInWithPassword, checkUserExists, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
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
    } catch (err) {
      setError('Invalid email or password. Use the magic link option if you don\'t have a password.');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      const userExists = await checkUserExists(email);
      if (userExists) {
        await signInWithMagicLink(email);
        setResetSent(true);
        setTimeout(() => {
          setResetSent(false);
          setShowForgotPassword(false);
          setEmail('');
        }, 3000);
      } else {
        setError('No account found with this email. Please create an account first.');
      }
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {showForgotPassword ? 'Reset Password' : 'Login with Password'}
          </DialogTitle>
          <DialogDescription>
            {showForgotPassword ? 'Enter your email to receive a reset link' : 'Use your email and password to login'}
          </DialogDescription>
        </DialogHeader>

        {!showForgotPassword ? (
          <form onSubmit={handleSignIn} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
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
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full gradient-bg text-black font-semibold hover:opacity-90 transition-opacity">
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(true);
                setError('');
              }}
              className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4 py-4">
            {resetSent ? (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-500">
                  ✓ Check your email for a password reset link! Click it to set a new password.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-medium text-foreground">
                    Email address
                  </label>
                  <Input
                    id="reset-email"
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
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full gradient-bg text-black font-semibold hover:opacity-90 transition-opacity">
                  {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError('');
                  }}
                  className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Back to Login
                </button>
              </>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
