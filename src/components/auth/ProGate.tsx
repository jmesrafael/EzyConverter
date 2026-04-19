import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from './LoginModal';

interface ProGateProps {
  children: ReactNode;
  featureName?: string;
}

export const ProGate = ({
  children,
  featureName = 'This feature',
}: ProGateProps) => {
  const { isPro, user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  if (isPro) {
    return <>{children}</>;
  }

  return (
    <>
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <Zap className="h-12 w-12 text-amber-500" />
          <div>
            <h3 className="font-semibold text-lg">{featureName} is Pro only</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Upgrade to Pro to unlock this feature for just $4.99/month
            </p>
          </div>

          {user ? (
            <Button
              className="gap-2 gradient-bg text-black font-semibold hover:opacity-90"
              size="lg"
            >
              <Zap className="h-4 w-4" />
              Upgrade to Pro
            </Button>
          ) : (
            <Button
              onClick={() => setLoginOpen(true)}
              className="gap-2 gradient-bg text-black font-semibold hover:opacity-90"
              size="lg"
            >
              <Zap className="h-4 w-4" />
              Sign In to Upgrade
            </Button>
          )}
        </div>
      </Card>
      <LoginModal isOpen={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
};
