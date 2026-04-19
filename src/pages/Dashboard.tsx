import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Zap, Image, FileText, Settings, CreditCard, ArrowRight } from 'lucide-react';

const quickActions = [
  {
    icon: Image,
    title: 'Image Converter',
    description: 'Convert between PNG, JPG, and WebP formats',
    to: '/image-converter',
  },
  {
    icon: FileText,
    title: 'PDF Converter',
    description: 'Merge, split, and compress PDFs',
    to: '/pdf-converter',
  },
];

export default function Dashboard() {
  const { user, isPro, profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            {isPro
              ? "You're on the Pro plan. Enjoy unlimited conversions!"
              : 'You can upgrade to Pro to unlock unlimited features and remove ads.'}
          </p>
        </div>

        {/* Pro Status Card */}
        {!isPro && (
          <Card className="mb-8 border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Upgrade to Pro</p>
                    <p className="text-sm text-muted-foreground">Only $4.99/month for unlimited features</p>
                  </div>
                </div>
                <Link to="/subscription">
                  <Button className="gradient-bg text-black font-semibold hover:opacity-90">
                    Upgrade Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Account Type</p>
              <p className="text-2xl font-bold">{isPro ? '✨ Pro' : 'Free'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Member Since</p>
              <p className="text-2xl font-bold">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })
                  : 'Today'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="text-2xl font-bold">Active</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.to} to={action.to}>
                  <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Benefits</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xs text-green-500">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">100% Private</p>
                    <p className="text-sm text-muted-foreground">All processing happens in your browser</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xs text-green-500">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">Fast & Secure</p>
                    <p className="text-sm text-muted-foreground">No uploads, no waiting - instant results</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xs text-green-500">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">Works Offline</p>
                    <p className="text-sm text-muted-foreground">Convert files without internet connection</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Management */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/my-account">
            <Button variant="outline" className="w-full h-12">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </Link>
          {!isPro && (
            <Link to="/subscription">
              <Button className="w-full h-12 gradient-bg text-black font-semibold hover:opacity-90">
                <CreditCard className="w-4 h-4 mr-2" />
                View Plans
              </Button>
            </Link>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
