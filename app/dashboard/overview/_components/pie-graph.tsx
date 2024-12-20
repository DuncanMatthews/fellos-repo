'use client';

import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { Fellow } from '../../fellos/data/schema';
import { Finder } from '../../finders/data/schema';

interface PieGraphProps {
  fellows: Fellow[];
  finders: Finder[];
}

const CHALLENGE_COLORS = {
  alcohol_use: '#3b82f6',
  drug_use: '#22c55e',
  parenting: '#eab308',
  relationships: '#ef4444'
};

export function PieGraph({ fellows, finders }: PieGraphProps) {
  const data = useMemo(() => {
    const allUsers = [...fellows, ...finders];
    const challengeCounts: Record<string, number> = {};
    let totalChallenges = 0;

    allUsers.forEach((user) => {
      user.challenges.forEach((challenge) => {
        challengeCounts[challenge] = (challengeCounts[challenge] || 0) + 1;
        totalChallenges++;
      });
    });

    return Object.entries(challengeCounts).map(([challenge, count]) => ({
      name: challenge
        .replace('_', ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      value: count,
      percentage: ((count / totalChallenges) * 100).toFixed(1)
    }));
  }, [fellows, finders]);

  const avgChallengesPerUser = useMemo(() => {
    const totalUsers = fellows.length + finders.length;
    const totalChallenges = data.reduce((sum, item) => sum + item.value, 0);
    return (totalChallenges / totalUsers).toFixed(1);
  }, [data, fellows.length, finders.length]);

  const mostCommonChallenge = useMemo(() => {
    return data.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    ).name;
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percentage }) => `${name} (${percentage}%)`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  CHALLENGE_COLORS[
                    entry.name
                      .toLowerCase()
                      .replace(' ', '_') as keyof typeof CHALLENGE_COLORS
                  ]
                }
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} users`, 'Count']}
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 text-center text-sm text-muted-foreground">
        <p>
          {(
            data.reduce((sum, item) => sum + Number(item.percentage), 0) / 100
          ).toFixed(1)}
          % users report multiple challenges
        </p>
        <p>
          Avg {avgChallengesPerUser} challenges per user • Most common:{' '}
          {mostCommonChallenge}
        </p>
      </div>
    </div>
  );
}
