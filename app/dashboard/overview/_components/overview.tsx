import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, CalendarClock, CalendarX } from 'lucide-react';
import { Fellow } from '../../fellos/data/schema';
import { Finder } from '../../finders/data/schema';
import { Interaction } from '../../interactions/data/schema';
import { RecentInteractions } from './recent-interactions';

interface Analytics {
  totalFellos: number;
  activeFellos: number;
  totalFinders: number;
  activeFinders: number;
  totalInteractions: number;
  completedInteractions: number;
  cancellationRate: string;
  periodStart: string;
  periodEnd: string;
}

interface OverViewPageProps {
  fellos: Fellow[];
  finders: Finder[];
  interactions: Interaction[];
  analytics: Analytics;
}

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconColor?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  iconColor
}: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={iconColor || 'text-muted-foreground'}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ChartCard = ({
  title,
  description,
  children,
  className
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="h-[300px]">{children}</CardContent>
  </Card>
);

export default function OverViewPage({
  fellos,
  finders,
  interactions,
  analytics
}: OverViewPageProps) {
  const completionRate = (
    (analytics.completedInteractions / analytics.totalInteractions) *
    100
  ).toFixed(1);
  const activeUsersPercent = (
    ((analytics.activeFellos + analytics.activeFinders) /
      (analytics.totalFellos + analytics.totalFinders)) *
    100
  ).toFixed(1);

  const stats = [
    {
      title: 'Total Users',
      value: analytics.totalFellos + analytics.totalFinders,
      description: `${analytics.totalFellos} Fellos, ${analytics.totalFinders} Finders`,
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Active Users',
      value: analytics.activeFellos + analytics.activeFinders,
      description: `${activeUsersPercent}% of total users`,
      icon: <UserCheck className="h-4 w-4" />,
      iconColor: 'text-green-500'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      description: `${analytics.completedInteractions} completed interactions`,
      icon: <CalendarClock className="h-4 w-4" />,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Cancellation Rate',
      value: `${analytics.cancellationRate}%`,
      description: `From ${analytics.totalInteractions} total interactions`,
      icon: <CalendarX className="h-4 w-4" />,
      iconColor: 'text-red-500'
    }
  ];

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Platform Overview
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download Report</Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Detailed Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <ChartCard
                title="Interaction Trends"
                description="Completed vs cancelled interactions over time"
                className="col-span-4"
              >
                <AreaGraph data={interactions} />
              </ChartCard>

              <ChartCard
                title="Recent Interactions"
                description="Latest platform activity"
                className="col-span-3"
              >
                <RecentInteractions interactions={interactions.slice(0, 5)} />
              </ChartCard>

              <ChartCard
                title="Challenge Distribution"
                description="Most common challenges being addressed"
                className="col-span-4"
              >
                <BarGraph fellos={fellos} finders={finders} />
              </ChartCard>

              <ChartCard
                title="User Composition"
                description="Distribution of platform users"
                className="col-span-3"
              >
                <PieGraph fellos={fellos} finders={finders} />
              </ChartCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
