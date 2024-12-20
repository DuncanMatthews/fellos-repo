import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  UserCheck,
  AlertCircle,
  Star,
  Target,
  Activity
} from 'lucide-react';
import { Finder } from '../data/schema';

interface FinderStatsCardsProps {
  finders: Finder[];
}

const FinderStatsCards = ({ finders }: FinderStatsCardsProps) => {
  const stats = useMemo(() => {
    return {
      totalFinders: finders.length,
      activeFinders: finders.filter((f) => f.status === 'active').length,
      pendingDeletion: finders.filter((f) => f.status === 'pending_deletion')
        .length,
      averageRating:
        finders.reduce((acc, finder) => {
          if (finder.rating && finder.rating !== 'new') {
            const rating = parseFloat(finder.rating);
            return isNaN(rating) ? acc : acc + rating;
          }
          return acc;
        }, 0) /
          finders.filter(
            (f) =>
              f.rating && f.rating !== 'new' && !isNaN(parseFloat(f.rating))
          ).length || 0,
      challengeBreakdown: finders.reduce<Record<string, number>>(
        (acc, finder) => {
          finder.challenges.forEach((challenge) => {
            acc[challenge] = (acc[challenge] || 0) + 1;
          });
          return acc;
        },
        {}
      ),
      completeProfiles: finders.filter(
        (f) =>
          f.name !== 'N/A' &&
          f.gender !== null &&
          f.age !== null &&
          f.age > 0 &&
          f.challenges.length > 0 &&
          f.photo_url !== null
      ).length
    };
  }, [finders]);

  const mostCommonChallenge = useMemo(() => {
    if (
      !stats.challengeBreakdown ||
      Object.keys(stats.challengeBreakdown).length === 0
    ) {
      return { challenge: 'None', count: 0 };
    }

    const sortedChallenges = Object.entries(stats.challengeBreakdown).sort(
      ([, a], [, b]) => b - a
    );

    return {
      challenge: sortedChallenges[0][0].split('_').join(' '),
      count: sortedChallenges[0][1]
    };
  }, [stats.challengeBreakdown]);

  const formatPercentage = (value: number, total: number): string => {
    if (total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  };

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Finders</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalFinders}</div>
          <p className="text-xs text-muted-foreground">
            Registered finders in the system
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Finders</CardTitle>
          <UserCheck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.activeFinders}
            <span className="ml-2 text-sm text-muted-foreground">
              ({formatPercentage(stats.activeFinders, stats.totalFinders)})
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Currently active finders
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Deletion
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.pendingDeletion}
            <span className="ml-2 text-sm text-muted-foreground">
              ({formatPercentage(stats.pendingDeletion, stats.totalFinders)})
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Accounts marked for deletion
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageRating.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Average finder rating (excluding new)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Top Challenge</CardTitle>
          <Target className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">
            {mostCommonChallenge.challenge}
          </div>
          <p className="text-xs text-muted-foreground">
            {mostCommonChallenge.count} finders seeking help
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Complete Profiles
          </CardTitle>
          <Activity className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPercentage(stats.completeProfiles, stats.totalFinders)}
          </div>
          <p className="text-xs text-muted-foreground">
            Profiles with all required info
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinderStatsCards;
