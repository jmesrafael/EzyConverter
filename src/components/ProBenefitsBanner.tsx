import { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { LoginModal } from './auth/LoginModal';
import { useAuth } from '@/context/AuthContext';

const benefits = [
  { icon: '✓', text: 'No ads' },
  { icon: '✓', text: 'Unlimited batch conversions' },
  { icon: '✓', text: 'No file size limits' },
  { icon: '✓', text: 'Sync history across devices' },
];

export const ProBenefitsBanner = () => {
  const { user, isPro } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  if (isPro) {
    return null;
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-950/20 via-amber-900/10 to-transparent p-8 md:p-12">
        {/* Decorative glow */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-semibold text-amber-500 uppercase tracking-wide">
                Limited time offer
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              Unlock Pro Features for $4.99/month
            </h2>

            <p className="text-muted-foreground mb-4 text-lg">
              Upgrade your experience and get the most out of EzyConverter
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-green-500 font-bold text-lg">{benefit.icon}</span>
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {user ? (
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-black font-semibold hover:opacity-90 transition-opacity">
                <Zap className="h-4 w-4" />
                Upgrade to Pro
              </button>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-black font-semibold hover:opacity-90 transition-opacity"
              >
                <Zap className="h-4 w-4" />
                Sign In to Unlock
              </button>
            )}
          </div>

          {/* Decorative icon */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-8 rounded-full border border-amber-500/30">
                <Zap className="h-16 w-16 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
};
