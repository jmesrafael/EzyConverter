import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Zap, Check, X, CreditCard } from 'lucide-react';

const features = [
  { name: 'File Conversions', free: 'Limited', pro: 'Unlimited' },
  { name: 'Batch Processing', free: 'Up to 3 files', pro: 'Unlimited' },
  { name: 'File Size Limit', free: '25MB per file', pro: 'No limit' },
  { name: 'Ads', free: 'Yes', pro: 'No ads' },
  { name: 'History Sync', free: 'Local only', pro: 'Across devices' },
  { name: 'Download Speed', free: 'Standard', pro: 'Priority' },
  { name: 'Support', free: 'Community', pro: 'Email support' },
  { name: 'Advanced Features', free: false, pro: true },
];

export default function Subscription() {
  const { isPro, user } = useAuth();

  const handleUpgrade = () => {
    // TODO: Integrate with Stripe Checkout
    alert('Stripe integration coming soon! For now, contact support to upgrade.');
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Subscription</h1>
          <p className="text-muted-foreground">
            {isPro
              ? 'You are currently on the Pro plan'
              : 'Upgrade to Pro to unlock unlimited features'}
          </p>
        </div>

        {/* Current Status */}
        {isPro && (
          <Card className="mb-8 border-amber-500/20 bg-amber-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="font-semibold">Pro Member</p>
                  <p className="text-sm text-muted-foreground">Thank you for supporting EzyConverter!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>No credit card required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <Button variant="outline" className="w-full" disabled>
                Your Current Plan
              </Button>

              <div className="space-y-3">
                <p className="text-sm font-semibold">Includes:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    Basic conversions
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    Up to 3 files
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    25MB file limit
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4" />
                    Ads shown
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4" />
                    Device sync
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className={`border-amber-500/30 ${!isPro ? 'ring-2 ring-amber-500/20' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Pro
              </CardTitle>
              <CardDescription>Full access to all features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-3xl font-bold">$4.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              {isPro ? (
                <Button disabled className="w-full gradient-bg text-black font-semibold">
                  ✓ Current Plan
                </Button>
              ) : (
                <Button
                  onClick={handleUpgrade}
                  className="w-full gradient-bg text-black font-semibold hover:opacity-90 transition-opacity"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              )}

              <div className="space-y-3">
                <p className="text-sm font-semibold">Includes everything in Free, plus:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Unlimited conversions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Batch processing (unlimited)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">No file size limits</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">No ads</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Device sync</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Priority support</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold">Free</th>
                    <th className="text-center py-3 px-4 font-semibold">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.name} className="border-b border-border/50">
                      <td className="py-3 px-4 font-medium">{feature.name}</td>
                      <td className="py-3 px-4 text-center">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? (
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{feature.free}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {typeof feature.pro === 'boolean' ? (
                          <Check className="w-4 h-4 text-amber-500 mx-auto" />
                        ) : (
                          <span className="font-medium text-amber-500">{feature.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Can I cancel anytime?</p>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your Pro subscription at any time. Your access will continue until the end of the current billing period.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Is there a free trial?</p>
              <p className="text-sm text-muted-foreground">
                Contact our support team for information about trial periods and special offers.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">What payment methods do you accept?</p>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards through Stripe. Your payment information is secure and encrypted.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
