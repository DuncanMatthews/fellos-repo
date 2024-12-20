'use client';

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Fellow } from '../../fellos/data/schema';
import { Finder } from '../../finders/data/schema';

interface BarGraphProps {
  fellows: Fellow[];
  finders: Finder[];
}

export function BarGraph({ fellows, finders }: BarGraphProps) {
  const data = useMemo(() => {
    const challengeCounts = {
      alcohol_use: { fellows: 0, finders: 0 },
      drug_use: { fellows: 0, finders: 0 },
      parenting: { fellows: 0, finders: 0 },
      relationships: { fellows: 0, finders: 0 }
    };

    fellows.forEach((fellow) => {
      fellow.challenges.forEach((challenge) => {
        if (challenge in challengeCounts) {
          challengeCounts[challenge as keyof typeof challengeCounts].fellows++;
        }
      });
    });

    finders.forEach((finder) => {
      finder.challenges.forEach((challenge) => {
        if (challenge in challengeCounts) {
          challengeCounts[challenge as keyof typeof challengeCounts].finders++;
        }
      });
    });

    return Object.entries(challengeCounts).map(([challenge, counts]) => ({
      challenge: challenge
        .replace('_', ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      Fellows: counts.fellows,
      Finders: counts.finders,
      Total: counts.fellows + counts.finders
    }));
  }, [fellows, finders]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="challenge" tick={{ fontSize: 12 }} interval={0} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}
        />
        <Legend />
        <Bar dataKey="Fellows" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Finders" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
