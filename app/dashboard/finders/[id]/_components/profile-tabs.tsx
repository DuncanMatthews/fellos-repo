import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralInfoTab from './tabs/general-info-tab';
import VerticalsTab from './tabs/verticals-tab';
import HistoryTab from './tabs/history-tab';
import InteractionsTab from './tabs/interactions-tab';
import type {
  AdminFinderDetailsGeneralResponse,
  AdminFinderVerticalsResponse,
  AdminFinderHistoryEntry,
  AdminFinderInteractionEntry
} from '../types';

interface ProfileTabsProps {
  general: AdminFinderDetailsGeneralResponse;
  verticals: AdminFinderVerticalsResponse;
  history: AdminFinderHistoryEntry[];
  interactions: AdminFinderInteractionEntry[];
}

export default function ProfileTabs({
  general,
  verticals,
  history,
  interactions
}: ProfileTabsProps) {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="verticals">Verticals</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="interactions">Interactions</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <GeneralInfoTab data={general} />
      </TabsContent>
      <TabsContent value="verticals">
        <VerticalsTab verticals={verticals} finderId={general.id.toString()} />
      </TabsContent>
      <TabsContent value="history">
        <HistoryTab data={history} />
      </TabsContent>
      <TabsContent value="interactions">
        <InteractionsTab data={interactions} />
      </TabsContent>
    </Tabs>
  );
}
