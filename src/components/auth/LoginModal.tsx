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
import { Mail, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.error('Magic link sign in failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Sign in to EzyConverter
          </DialogTitle>
          <DialogDescription>
            Create an account or sign in to unlock Pro features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-primary/20 p-4 bg-primary/5">
            <h3 className="font-semibold mb-2 text-foreground">Pro features include:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✓ No ads</li>
              <li>✓ Unlimited batch conversions</li>
              <li>✓ No file size limits</li>
              <li>✓ Sync history across devices</li>
            </ul>
          </div>

          {sent ? (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-500">
                ✓ Check your email for a login link! Click it to sign in.
              </p>
            </div>
          ) : (
            <form onSubmit={handleMagicLinkSignIn} className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
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

          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
