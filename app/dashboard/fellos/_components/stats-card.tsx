import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, Clock, Shield, Award } from 'lucide-react';

const StatsCards = ({ fellows }: { fellows: any[] }) => {
  const stats = useMemo(() => {
    return {
      totalFellows: fellows.length,
      activeFellows: fellows.filter((f) => f.status === 'active').length,
      pendingVerification: fellows.filter(
        (f) =>
          f.status === 'background_check_required' ||
          f.verticals_for_approval.length > 0
      ).length,
      deactivatedFellows: fellows.filter(
        (f) => f.status === 'deactivated' || f.status === 'pending_deletion'
      ).length,
      averageRating:
        fellows.reduce((acc, fellow) => {
          const rating = parseFloat(fellow.rating);
          return isNaN(rating) ? acc : acc + rating;
        }, 0) / fellows.filter((f) => !isNaN(parseFloat(f.rating))).length || 0,
      pendingStripeSetup: fellows.filter(
        (f) =>
          f.is_stripe_onboarding_complete === false ||
          f.is_stripe_onboarding_complete === null
      ).length
    };
  }, [fellows]);

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Fellows</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalFellows}</div>
          <p className="text-xs text-muted-foreground">
            Registered fellows in the system
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Fellows</CardTitle>
          <UserCheck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeFellows}</div>
          <p className="text-xs text-muted-foreground">
            Currently active fellows
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Verification
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingVerification}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting background checks or vertical approvals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Deactivated Fellows
          </CardTitle>
          <UserX className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.deactivatedFellows}</div>
          <p className="text-xs text-muted-foreground">
            Deactivated or pending deletion
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Award className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageRating.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Average fellow rating</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Setup</CardTitle>
          <Shield className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingStripeSetup}</div>
          <p className="text-xs text-muted-foreground">
            Pending Stripe onboarding
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
