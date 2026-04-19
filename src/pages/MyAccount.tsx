import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PasswordSettings } from '@/components/auth/PasswordSettings';
import { useAuth } from '@/context/AuthContext';
import { Mail, Shield, Calendar } from 'lucide-react';

export default function MyAccount() {
  const { user, profile } = useAuth();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your profile and account settings</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground">Email Address</label>
                  <p className="text-lg font-semibold mt-1">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Account Type</label>
                  <p className="text-lg font-semibold mt-1">
                    {profile?.is_pro ? (
                      <span className="text-amber-500">✨ Pro</span>
                    ) : (
                      <span className="text-muted-foreground">Free</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Account Created</label>
                  <p className="text-lg font-semibold mt-1">{formatDate(profile?.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Last Updated</label>
                  <p className="text-lg font-semibold mt-1">{formatDate(profile?.updated_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          {profile?.is_pro && (
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-500">
                  <Shield className="w-5 h-5" />
                  Pro Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <p className="text-lg font-semibold mt-1 capitalize">
                      {profile?.subscription_status}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Subscribed Since</label>
                    <p className="text-lg font-semibold mt-1">{formatDate(profile?.pro_since)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Password Management */}
          <PasswordSettings />

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Data & Privacy
              </CardTitle>
              <CardDescription>Your data is secure and private</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-green-500">✓</span>
                </div>
                <div>
                  <p className="font-medium">100% Private Processing</p>
                  <p className="text-sm text-muted-foreground">All file conversions happen in your browser</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-green-500">✓</span>
                </div>
                <div>
                  <p className="font-medium">Encrypted Connection</p>
                  <p className="text-sm text-muted-foreground">All data is transmitted securely via HTTPS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-green-500">✓</span>
                </div>
                <div>
                  <p className="font-medium">No Tracking</p>
                  <p className="text-sm text-muted-foreground">We don't track your conversions or store personal data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
