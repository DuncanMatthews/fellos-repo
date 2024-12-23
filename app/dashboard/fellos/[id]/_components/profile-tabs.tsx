// ProfileTabs component
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralInfoTab from './tabs/general-info-tab';
import VerticalsTab from './tabs/verticals-tab';
import HistoryTab from './tabs/history-tab';
import InteractionsTab from './tabs/interactions-tab';
import AvailabilityTab from './tabs/availability-tab';
import type {
  FelloGeneralResponse,
  AdminUserDetailsVerticalsResponse,
  HistoryEntry,
  InteractionEntry,
  AvailabilityTimeSlot
} from '../types';

interface ProfileTabsProps {
  general: FelloGeneralResponse;
  verticals: AdminUserDetailsVerticalsResponse;
  history: HistoryEntry[];
  interactions: InteractionEntry[];
  availabilities: AvailabilityTimeSlot[][]; // This already accepts empty array as fallback
}

export default function ProfileTabs({
  general,
  verticals,
  history,
  interactions,
  availabilities
}: ProfileTabsProps) {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="verticals">Verticals</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="interactions">Interactions</TabsTrigger>
        <TabsTrigger value="availability">Availability</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <GeneralInfoTab data={general} />
      </TabsContent>
      <TabsContent value="verticals">
        <VerticalsTab verticals={verticals} fellowId={general.id.toString()} />
      </TabsContent>
      <TabsContent value="history">
        <HistoryTab data={history} />
      </TabsContent>
      <TabsContent value="interactions">
        <InteractionsTab data={interactions} />
      </TabsContent>
      <TabsContent value="availability">
        <AvailabilityTab data={availabilities || []} />{' '}
        {/* Default to empty array if null */}
      </TabsContent>
    </Tabs>
  );
}
