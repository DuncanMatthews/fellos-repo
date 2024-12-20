'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { Interaction } from '../../interactions/data/schema';

interface AreaGraphProps {
  data: Interaction[];
}

interface ChartDataPoint {
  date: string;
  completed: number;
  cancelled: number;
  total: number;
}

function processChartData(data: Interaction[]): ChartDataPoint[] {
  const groupedData: Record<string, ChartDataPoint> = {};

  data.forEach((interaction) => {
    const date = format(parseISO(interaction.interaction_start_date), 'MMM dd');

    if (!groupedData[date]) {
      groupedData[date] = {
        date,
        completed: 0,
        cancelled: 0,
        total: 0
      };
    }

    if (interaction.interaction_status === 'completed') {
      groupedData[date].completed++;
    } else if (interaction.interaction_status.startsWith('cancelled_')) {
      groupedData[date].cancelled++;
    }

    groupedData[date].total++;
  });

  return Object.values(groupedData).sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );
}

export function AreaGraph({ data }: AreaGraphProps) {
  const chartData = useMemo(() => processChartData(data), [data]);

  // Calculate trend percentage
  const getTrend = () => {
    if (chartData.length < 2) return { value: 0, isPositive: true };

    const latest = chartData[chartData.length - 1].completed;
    const previous = chartData[chartData.length - 2].completed;

    if (previous === 0) return { value: 0, isPositive: true };

    const trend = ((latest - previous) / previous) * 100;
    return {
      value: Math.abs(trend).toFixed(1),
      isPositive: trend >= 0
    };
  };

  const trend = getTrend();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="font-bold">{label}</div>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}:</span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="completed"
            stroke="#22c55e"
            fill="url(#colorCompleted)"
            name="Completed"
          />

          <Area
            type="monotone"
            dataKey="cancelled"
            stroke="#ef4444"
            fill="url(#colorCancelled)"
            name="Cancelled"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
            <span>Completed</span>
          </div>
          <div className="ml-4 flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
            <span>Cancelled</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {trend.isPositive ? (
            <>
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+{trend.value}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-red-500">-{trend.value}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
