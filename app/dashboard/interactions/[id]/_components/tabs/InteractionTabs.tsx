import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  ArrowRight,
  Star,
  MessageSquare,
  PhoneCall,
  AlertCircle,
  DollarSign,
  Clock,
  Link2
} from 'lucide-react';
import type { InteractionDetailsResponse } from '../../types';

interface Props {
  details: InteractionDetailsResponse;
}

export function InteractionTabs({ details }: Props) {
  const renderTimelineEvent = (event: any) => (
    <div className="mb-4 flex items-start">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
        {event.icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium">{event.title}</p>
        <p className="text-sm text-muted-foreground">
          {format(new Date(event.time), 'HH:mm')}
        </p>
        {event.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );

  const timelineEvents = [
    {
      icon: <CalendarIcon className="h-4 w-4" />,
      title: 'Interaction Started',
      time: details.interaction_start_date,
      description: `Scheduled for ${details.duration} minutes`
    },
    details.fello_before_interaction && {
      icon: <MessageSquare className="h-4 w-4" />,
      title: 'Fello Pre-Check',
      time: details.interaction_start_date,
      description: details.fello_before_interaction
    },
    details.participant_before_interaction && {
      icon: <MessageSquare className="h-4 w-4" />,
      title: 'Participant Pre-Check',
      time: details.interaction_start_date,
      description: details.participant_before_interaction
    }
  ].filter(Boolean);

  return (
    <Tabs defaultValue="timeline" className="space-y-4">
      <TabsList>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="participants">Participants</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>

      <TabsContent value="timeline">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={index}>{renderTimelineEvent(event)}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="participants">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Fello Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Fello</h3>
                  <Button variant="outline" size="sm">
                    <Link2 className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={details.fello_photo_url || undefined} />
                    <AvatarFallback>
                      {details.fello_name?.charAt(0) || 'F'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{details.fello_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {details.fello_email}
                    </p>
                    {details.fello_rating && (
                      <div className="mt-1 flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span className="text-sm">
                          {details.fello_rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Participant Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Participant</h3>
                  <Button variant="outline" size="sm">
                    <Link2 className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={details.participant_photo_url || undefined}
                    />
                    <AvatarFallback>
                      {details.participant_name?.charAt(0) || 'P'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{details.participant_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {details.participant_email}
                    </p>
                    {details.participant_rating && (
                      <div className="mt-1 flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span className="text-sm">
                          {details.participant_rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="feedback">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fello Feedback</h3>
                {/* Fello feedback content */}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Participant Feedback</h3>
                {/* Participant feedback content */}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="details">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {/* Technical details content */}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
